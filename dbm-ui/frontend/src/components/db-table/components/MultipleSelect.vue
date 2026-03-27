<template>
  <div :style="{ width: contentMinWidth > 0 ? `${contentMinWidth}px` : '' }">
    <div
      ref="searchBox"
      class="t-table__filter-pop-search">
      <Input
        v-model="filterKey"
        borderless
        clearable
        placeholder="请输入关键字">
        <template #prefix-icon> <SearchIcon /></template>
      </Input>
    </div>
    <BkLoading :loading="isRemoteListLoading">
      <div
        ref="wrapper"
        class="t-table__filter-pop-wrapper">
        <CheckboxGroup
          v-model="localValue"
          @change="handleChange">
          <template v-if="isTwoDimensionalArray">
            <template
              v-for="(item, index) in renderList as { label: string; value: number | string }[][]"
              :key="index">
              <div
                v-if="item.length > 0"
                class="table-filter-pop-item-box">
                <div
                  v-for="innerItem in item"
                  :key="innerItem.label"
                  class="t-table__filter-pop-item">
                  <Checkbox
                    :label="innerItem.label"
                    style="display: flex; flex: 1; flex-wrap: nowrap; white-space: nowrap"
                    :value="innerItem.value" />
                </div>
              </div>
            </template>
          </template>
          <template v-else>
            <div
              v-for="item in renderList as { label: string; value: number | string }[]"
              :key="item.label"
              class="t-table__filter-pop-item">
              <Checkbox
                :label="item.label"
                style="display: flex; flex: 1; flex-wrap: nowrap; white-space: nowrap"
                :value="item.value" />
            </div>
          </template>
        </CheckboxGroup>
      </div>
    </BkLoading>
    <div
      v-if="filterKey && renderList.length < 1 && !isRemoteListLoading"
      class="t-table-filter-empty">
      <BkException
        :description="t('搜索为空')"
        scene="part"
        type="search-empty" />
    </div>
  </div>
</template>
<script setup lang="ts">
  import _ from 'lodash';
  import { SearchIcon } from 'tdesign-icons-vue-next';
  import { Checkbox, CheckboxGroup, type CheckboxGroupValue, Input } from 'tdesign-vue-next';
  import { nextTick, ref, shallowRef, type UnwrapRef, useTemplateRef, watch } from 'vue';
  import { useI18n } from 'vue-i18n';

  import { makeMap } from '@utils';

  import useMenuList from './hooks/useMenuList';

  export interface Props {
    // eslint-disable-next-line vue/no-unused-properties
    list?: UnwrapRef<typeof defaultValue>;
    remoteMethod?: (params: { defaultValue?: string; keyword?: string }) => Promise<UnwrapRef<typeof defaultValue>>;
    remoteSearch?: boolean;
    value?: string;
  }

  type Emits = (e: 'change', value: string) => void;

  defineOptions({
    inheritAttrs: false,
  });

  const props = withDefaults(defineProps<Props>(), {
    list: () => [],
    remoteMethod: undefined,
    remoteSearch: false,
    value: '',
  });
  const emits = defineEmits<Emits>();

  const { t } = useI18n();
  const { filterKey, list, loading: isRemoteListLoading } = useMenuList<UnwrapRef<typeof defaultValue>[number]>(props);

  const defaultValue = shallowRef<
    { label: string; value: number | string }[] | { label: string; value: number | string }[][]
  >([]);

  const wrapperRef = useTemplateRef('wrapper');
  const localValue = shallowRef(props.value ? props.value.split(',') : []);
  const searchBoxRef = useTemplateRef('searchBox');
  const contentMinWidth = ref(0);

  const isTwoDimensionalArray = computed(
    () =>
      (defaultValue.value.length > 0 && _.isArray(defaultValue.value[0])) ||
      (list.value.length > 0 && _.isArray(list.value[0])),
  );

  const renderList = computed(() => {
    if (props.remoteSearch) {
      return list.value;
    }

    const keyword = `${filterKey.value || ''}`.trim().toLowerCase();
    if (!keyword) {
      const modelValueMap = makeMap(
        defaultValue.value.flatMap((item) => (_.isArray(item) ? item.map((innerItem) => innerItem.value) : item.value)),
      );
      if (isTwoDimensionalArray.value) {
        if (defaultValue.value.length > 0) {
          return (defaultValue.value as { label: string; value: number | string }[][]).map((item, index) => {
            return [
              ...item,
              ..._.filter(
                list.value[index] as { label: string; value: number | string }[],
                (innerItem) => !modelValueMap[innerItem.value],
              ),
            ];
          });
        }
        return list.value as { label: string; value: number | string }[][];
      }
      return [
        ...defaultValue.value,
        ..._.filter(list.value as { label: string; value: number | string }[], (item) => !modelValueMap[item.value]),
      ];
    }

    if (isTwoDimensionalArray.value) {
      return (list.value as { label: string; value: number | string }[][]).map((item) =>
        _.filter(item, (innerItem) => innerItem.label.toLowerCase().includes(keyword)),
      );
    }
    return _.filter(list.value as { label: string; value: number | string }[], (item) =>
      item.label.toLowerCase().includes(keyword),
    );
  });

  watch(filterKey, () => {
    nextTick(() => {
      contentMinWidth.value = Math.max(wrapperRef.value!.getBoundingClientRect().width, contentMinWidth.value);
    });
  });

  watch(
    () => props.value,
    () => {
      if (defaultValue.value.length > 0) {
        return;
      }
      if (props.value && _.isFunction(props.remoteMethod)) {
        props.remoteMethod!({
          defaultValue: props.value,
        }).then((data) => {
          defaultValue.value = data;
        });
      }
    },
    {
      immediate: true,
    },
  );

  const handleChange = (value: CheckboxGroupValue) => {
    emits('change', value.join(','));
  };

  onMounted(() => {
    setTimeout(() => {
      searchBoxRef.value!.querySelector('input')?.focus();
    }, 100);
  });
</script>

<style lang="less">
  .table-filter-pop-item-box {
    position: relative;

    &:not(:first-child) {
      &::before {
        position: absolute;
        top: 0;
        right: 16px;
        left: 16px;
        height: 0;
        border-top: 1px solid #e5e5e5;
        content: '';
      }
    }
  }
</style>
