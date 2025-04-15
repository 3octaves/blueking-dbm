<template>
  <Single
    ref="singleRef"
    :subzone-list="subzoneList"
    @change="handleSingleChange" />
</template>

<script setup lang="ts">
  import { getInfrasSubzonesByCity } from '@services/source/infras';

  import Single from '../components/Single.vue';

  interface Props {
    subzoneList?: ServiceReturnType<typeof getInfrasSubzonesByCity>;
  }

  defineProps<Props>();

  const modelValue = defineModel<number[]>({
    required: true,
  });

  const handleSingleChange = (value: number) => {
    modelValue.value = [value];
  };
</script>
