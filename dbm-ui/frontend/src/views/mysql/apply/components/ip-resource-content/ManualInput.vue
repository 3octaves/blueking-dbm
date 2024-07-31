<template>
  <!-- <DbFormItem
    v-if="!isSingleType"
    ref="proxyRef"
    label="Proxy"
    property="details.nodes.proxy"
    required>
    <IpSelector
      :biz-id="formdata.bk_biz_id"
      :cloud-info="cloudInfo"
      :data="formdata.details.nodes.proxy"
      :disable-dialog-submit-method="disableHostSubmitMethods.proxy"
      :disable-host-method="proxyDisableHostMethod"
      :os-types="[OSTypes.Linux]"
      @change="handleProxyIpChange">
      <template #desc>
        {{ t('需n台', { n: hostNums }) }}
      </template>
      <template #submitTips="{ hostList }">
        <I18nT
          keypath="需n台_已选n台"
          style="font-size: 14px; color: #63656e"
          tag="span">
          <span style="font-weight: bold; color: #2dcb56"> {{ hostNums }} </span>
          <span style="font-weight: bold; color: #3a84ff"> {{ hostList.length }} </span>
        </I18nT>
      </template>
    </IpSelector>
  </DbFormItem>
  <DbFormItem
    ref="backendRef"
    :label="formItemLabels.backend"
    property="details.nodes.backend"
    required>
    <IpSelector
      :biz-id="formdata.bk_biz_id"
      :cloud-info="cloudInfo"
      :data="formdata.details.nodes.backend"
      :disable-dialog-submit-method="disableHostSubmitMethods.backend"
      :disable-host-method="backendDisableHostMethod"
      :os-types="[OSTypes.Linux]"
      @change="handleBackendIpChange">
      <template #desc>
        {{ t('需n台', { n: hostNums }) }}
      </template>
      <template #submitTips="{ hostList }">
        <I18nT
          keypath="需n台_已选n台"
          style="font-size: 14px; color: #63656e"
          tag="span">
          <span style="font-weight: bold; color: #2dcb56"> {{ hostNums }} </span>
          <span style="font-weight: bold; color: #3a84ff"> {{ hostList.length }} </span>
        </I18nT>
      </template>
    </IpSelector>
  </DbFormItem> -->
  <div></div>
</template>

<script setup lang="tsx">
  // import { useI18n } from 'vue-i18n';

  // import type { HostDetails } from '@services/types';

  // import { OSTypes } from '@common/const';

  // import IpSelector from '@components/ip-selector/IpSelector.vue';

  // interface Props {
  //   formdata: Record<string, any>;
  //   isSingleType: boolean;
  //   cloudInfo: {
  //     id: number | string;
  //     name: string;
  //   };
  //   hostNums: number;
  // }

  // const props = defineProps<Props>();

  // const { t } = useI18n();

  // const disableHostSubmitMethods = {
  //   proxy: (hostList: Array<any>) =>
  //     hostList.length !== props.hostNums
  //       ? t('xx共需n台', {
  //           title: 'Proxy',
  //           n: props.hostNums,
  //         })
  //       : false,
  //   backend: (hostList: Array<any>) =>
  //     hostList.length !== props.hostNums
  //       ? t('xx共需n台', {
  //           title: 'Master / Slave',
  //           n: props.hostNums,
  //         })
  //       : false,
  // };

  // const makeMapByHostId = (hostList: HostDetails[]) =>
  //   hostList.reduce(
  //     (result, item) => ({
  //       ...result,
  //       [item.host_id]: true,
  //     }),
  //     {} as Record<number, boolean>,
  //   );

  // // proxy、backend 节点互斥
  // function proxyDisableHostMethod(data: any, list: any[]) {
  //   const masterHostMap = makeMapByHostId(formdata.details.nodes.backend);
  //   if (masterHostMap[data.host_id]) {
  //     return t('主机已被Master_Slave使用');
  //   }

  //   if (list.length >= props.hostNums && !list.find((item) => item.host_id === data.host_id)) {
  //     return t('需n台_已选n台', [props.hostNums, list.length]);
  //   }

  //   return false;
  // }

  // /**
  //  * 更新 Proxy IP
  //  */
  // function handleProxyIpChange(data: HostDetails[]) {
  //   props.formdata.details.nodes.proxy = [...data];
  //   if (props.formdata.details.nodes.proxy.length > 0) {
  //     proxyRef.value.clearValidate();
  //   }
  // }
</script>
