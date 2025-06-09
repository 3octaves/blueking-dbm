<template>
  <RamdomSelectable
    ref="ramdomSelectableRef"
    :subzone-list="subzoneList"
    @change="handleRandomSeletableChange" />
  <Single
    ref="singleRef"
    :subzone-ids="modelValue"
    :subzone-list="subzoneList"
    @change="handleSingleChange" />
</template>

<script setup lang="ts">
  import { getInfrasSubzonesByCity } from '@services/source/infras';

  import RamdomSelectable from '../components/RamdomSelectable.vue';
  import Single from '../components/Single.vue';

  interface Props {
    subzoneList?: ServiceReturnType<typeof getInfrasSubzonesByCity>;
  }

  const props = defineProps<Props>();

  const modelValue = defineModel<number[]>({
    required: true,
  });

  const ramdomSelectableRef = useTemplateRef('ramdomSelectableRef');
  const singleRef = useTemplateRef('singleRef');

  watch(
    () => props.subzoneList,
    () => {
      ramdomSelectableRef.value!.reset();
      singleRef.value!.reset();
    },
  );

  const handleRandomSeletableChange = (value: boolean) => {
    if (value) {
      singleRef.value!.reset();
    }
    modelValue.value = [];
  };

  const handleSingleChange = (value: number) => {
    modelValue.value = [value];
    ramdomSelectableRef.value!.reset(value ? false : true);
  };
</script>
