<template>
  <BkCheckboxGroup
    v-model="localValue"
    v-bk-tooltips="t('至少选择n个区', { n: 2 })"
    @change="handleChange">
    <BkCheckbox
      v-for="item in subzoneList"
      :key="item.bk_sub_zone_id"
      :label="item.bk_sub_zone_id">
      {{ item.bk_sub_zone }}
    </BkCheckbox>
  </BkCheckboxGroup>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';

  import { getInfrasSubzonesByCity } from '@services/source/infras';

  interface Props {
    subzoneIds: number[];
    subzoneList?: ServiceReturnType<typeof getInfrasSubzonesByCity>;
  }

  type Emits = (e: 'change', value: number[]) => void;

  interface Expose {
    reset: () => void;
  }

  const props = defineProps<Props>();
  const emits = defineEmits<Emits>();

  const { t } = useI18n();

  const localValue = ref<number[]>([]);

  watch(
    () => props.subzoneIds,
    () => {
      console.log('multiple', props.subzoneIds);
      localValue.value = props.subzoneIds;
    },
  );

  const handleChange = () => {
    emits('change', localValue.value);
  };

  defineExpose<Expose>({
    reset() {
      localValue.value = [];
    },
  });
</script>
