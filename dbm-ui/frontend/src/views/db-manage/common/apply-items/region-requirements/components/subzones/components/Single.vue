<template>
  <BkRadioGroup
    v-model="localValue"
    @change="handleChange">
    <BkRadio
      v-for="item in subzoneList"
      :key="item.bk_sub_zone_id"
      :label="item.bk_sub_zone_id">
      {{ item.bk_sub_zone }}
    </BkRadio>
  </BkRadioGroup>
</template>

<script setup lang="ts">
  import { getInfrasSubzonesByCity } from '@services/source/infras';

  interface Props {
    subzoneIds: number[];
    subzoneList?: ServiceReturnType<typeof getInfrasSubzonesByCity>;
  }

  type Emits = (e: 'change', value: number) => void;

  interface Expose {
    reset: () => void;
  }

  const props = defineProps<Props>();
  const emits = defineEmits<Emits>();

  const localValue = ref(0);

  watch(
    () => props.subzoneIds,
    () => {
      console.log('single', props.subzoneIds);
      [localValue.value] = props.subzoneIds;
    },
  );

  const handleChange = () => {
    emits('change', localValue.value);
  };

  defineExpose<Expose>({
    reset() {
      localValue.value = 0;
    },
  });
</script>
