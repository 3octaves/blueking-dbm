<template>
  <RamdomSelectable
    ref="ramdomSelectableRef"
    :subzone-list="subzoneList"
    @change="handleRandomSeletableChange" />
  <Multiple
    ref="multipleRef"
    :subzone-list="subzoneList"
    @change="handleMutipleChange" />
</template>

<script setup lang="ts">
  import { getInfrasSubzonesByCity } from '@services/source/infras';

  import Multiple from '../components/Multiple.vue';
  import RamdomSelectable from '../components/RamdomSelectable.vue';

  interface Props {
    subzoneList?: ServiceReturnType<typeof getInfrasSubzonesByCity>;
  }

  const props = defineProps<Props>();

  const modelValue = defineModel<number[]>({
    required: true,
  });

  const ramdomSelectableRef = useTemplateRef('ramdomSelectableRef');
  const multipleRef = useTemplateRef('multipleRef');

  watch(
    () => props.subzoneList,
    () => {
      ramdomSelectableRef.value!.reset();
      multipleRef.value!.reset();
    },
  );

  const handleRandomSeletableChange = (value: boolean) => {
    if (value) {
      multipleRef.value!.reset();
    }
    modelValue.value = [];
  };

  const handleMutipleChange = (value: number[]) => {
    modelValue.value = value;
    ramdomSelectableRef.value!.reset(value.length ? false : true);
  };
</script>
