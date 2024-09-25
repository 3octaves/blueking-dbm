<template>
  <div class="db-mult-line-text">
    <div
      ref="rootRef"
      class="db-mult-line-text-wrapper"
      :style="styles">
      <slot />
      <div
        ref="placeholderRef"
        class="placeholder">
        <slot />
      </div>
    </div>
    <div
      v-if="isShowExpand"
      style="margin-top: 8; line-height: 20px">
      <BkButton
        text
        theme="primary"
        @click="handleToggleMore">
        {{ t('更多') }}
        <DbIcon
          class="ml-4"
          :type="isMore ? 'up-big' : 'down-big'" />
      </BkButton>
    </div>
  </div>
</template>
<script setup lang="ts">
  import type { Instance, SingleTarget } from 'tippy.js';
  import { nextTick, onBeforeUpdate, onMounted, ref } from 'vue';
  import { useI18n } from 'vue-i18n';

  import { dbTippy } from '@common/tippy';

  interface Props {
    line: number;
    expandable?: boolean;
    showTooltips?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    expandable: true,
    showTooltips: false,
  });

  const { t } = useI18n();

  let tippyInst: Instance;

  const rootRef = ref<HTMLElement>();
  const placeholderRef = ref<HTMLElement>();
  const isMore = ref(false);
  const isShowExpand = ref(props.expandable);

  const styles = computed(() => ({
    '-webkit-line-clamp': isMore.value ? 'initial' : props.line,
  }));

  const calcShowExpand = () => {
    nextTick(() => {
      const { height: placeholderHeight } = placeholderRef.value!.getBoundingClientRect();

      if (props.expandable) {
        isShowExpand.value = rootHeight < placeholderHeight;
      }
    });
  };
  let rootHeight = 0;
  const handleToggleMore = () => {
    if (!isMore.value) {
      rootHeight = rootRef.value!.getBoundingClientRect().height;
    }
    isMore.value = !isMore.value;
  };

  const createTippyInst = () => {
    if (props.showTooltips) {
      const { width } = rootRef.value!.getBoundingClientRect();
      tippyInst = dbTippy(rootRef.value as SingleTarget, {
        content: placeholderRef.value,
        appendTo: () => document.body,
        maxWidth: width,
        arrow: true,
        zIndex: 999999,
      });
    }
  };

  const destroyTippyInst = () => {
    if (tippyInst) {
      tippyInst.hide();
      tippyInst.unmount();
      tippyInst.destroy();
    }
  };

  onMounted(() => {
    rootHeight = rootRef.value!.getBoundingClientRect().height;
    calcShowExpand();
    createTippyInst();
  });

  onBeforeUpdate(() => {
    calcShowExpand();
    destroyTippyInst();
  });
</script>
<style lang="less">
  .db-mult-line-text {
    .db-mult-line-text-wrapper {
      position: relative;
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: normal;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: v-bind('line');
    }

    .placeholder {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      z-index: -1;
      word-break: normal;
    }
  }
</style>
