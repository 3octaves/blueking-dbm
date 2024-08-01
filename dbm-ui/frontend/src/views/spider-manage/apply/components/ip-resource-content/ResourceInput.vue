<template>
  <BkFormItem
    :label="t('接入层Master')"
    required>
    <div class="resource-pool-item">
      <BkFormItem
        :label="t('规格')"
        property="details.resource_spec.spider.spec_id"
        required>
        <SpecSelector
          ref="specProxyRef"
          v-model="formdata.details.resource_spec.spider.spec_id"
          :biz-id="formdata.bk_biz_id"
          :cloud-id="formdata.details.bk_cloud_id"
          cluster-type="tendbcluster"
          machine-type="spider" />
      </BkFormItem>
      <BkFormItem
        :label="t('数量')"
        property="details.resource_spec.spider.count"
        required>
        <BkInput
          v-model="formdata.details.resource_spec.spider.count"
          :min="2"
          type="number" />
        <span class="input-desc">{{ t('至少n台', { n: 2 }) }}</span>
      </BkFormItem>
    </div>
  </BkFormItem>
  <BkFormItem
    :label="t('后端存储规格')"
    required>
    <BackendQPSSpec
      ref="specBackendRef"
      v-model="formdata.details.resource_spec.backend_group"
      :biz-id="formdata.bk_biz_id"
      :cloud-id="formdata.details.bk_cloud_id"
      cluster-type="tendbcluster"
      machine-type="remote" />
  </BkFormItem>
</template>

<script setup lang="tsx">
  import { useI18n } from 'vue-i18n';

  import BackendQPSSpec from '@components/apply-items/BackendQPSSpec.vue';
  import SpecSelector from '@components/apply-items/SpecSelector.vue';

  // interface Props {
  //   formdata: Record<string, any>
  // }

  // defineProps<Props>()

  const { t } = useI18n();

  const formdata = reactive({
    bk_biz_id: 0,
    details: {
      bk_cloud_id: 0,
      resource_spec: {
        spider: {
          spec_id: 0,
          count: 0,
        },
        backend_group: {
          spec_id: 0,
          capacity: 0,
          count: 0,
          future_capacity: 0,
        },
      },
    },
  });
</script>
