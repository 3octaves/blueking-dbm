<template>
  <BkCheckbox
    v-model="isAllCheck"
    @change="handleCheckAllChange">
    {{ t('随机') }}
  </BkCheckbox>
  <div
    v-if="subzoneList?.length"
    class="subzone-bar" />
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';

  import { getInfrasSubzonesByCity } from '@services/source/infras';

  interface Props {
    subzoneList?: ServiceReturnType<typeof getInfrasSubzonesByCity>;
  }

  type Emits = (e: 'change', value: boolean) => void;

  interface Expose {
    reset: (value?: boolean) => void;
  }

  defineProps<Props>();
  const emits = defineEmits<Emits>();

  const { t } = useI18n();

  const isAllCheck = ref(true);

  const handleCheckAllChange = (value: boolean) => {
    emits('change', value);
  };

  defineExpose<Expose>({
    reset(value = true) {
      isAllCheck.value = value;
    },
  });
</script>
