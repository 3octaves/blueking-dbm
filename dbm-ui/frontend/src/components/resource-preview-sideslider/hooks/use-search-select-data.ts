import { useI18n } from 'vue-i18n';

import { fetchResourceHostDeviceClass, getResourceOsName } from '@services/source/dbresourceResource';
import { getCommonCities, getInfrasCloudSubzones } from '@services/source/infras';

import MultipleSelect from '@components/db-table/components/MultipleSelect.vue';

export default () => {
  const { t } = useI18n();

  return {
    city: {
      component: markRaw(MultipleSelect),
      name: t('城市'),
      props: {
        remoteMethod: () => {
          return getCommonCities().then((data) =>
            data.common.map((item) => ({
              label: item.city_name,
              value: item.city_code,
            })),
          );
        },
      },
      showConfirmAndReset: true,
    },
    device_class: {
      component: markRaw(MultipleSelect),
      name: t('机型'),
      props: {
        remoteMethod: () => {
          return fetchResourceHostDeviceClass().then((data) =>
            data.map((item) => ({
              label: item,
              value: item,
            })),
          );
        },
      },
      showConfirmAndReset: true,
    },
    os_name: {
      component: markRaw(MultipleSelect),
      name: t('操作系统名称'),
      props: {
        remoteMethod: () => {
          return getResourceOsName().then((data) =>
            data.os_names.map((item) => ({
              label: item.text,
              value: item.value,
            })),
          );
        },
      },
      showConfirmAndReset: true,
    },
    zone: {
      component: markRaw(MultipleSelect),
      name: t('可用区'),
      props: {
        remoteMethod: () => {
          return getInfrasCloudSubzones().then((data) =>
            data.map((item) => ({
              label: item.zone_name,
              value: item.zone_id,
            })),
          );
        },
      },
      showConfirmAndReset: true,
    },
  };
};
