<template>
  <div class="ticket-details-info-title mt-20">{{ t('容灾要求') }}</div>
  <InfoList>
    <InfoItem :label="t('容灾级别')">
      {{ affinityText }}
    </InfoItem>
    <InfoItem :label="t('管控区域')">
      {{ details.bk_cloud_name || '--' }}
    </InfoItem>
    <InfoItem :label="t('地域')">
      {{ cityName }}
    </InfoItem>
    <InfoItem :label="t('可用区')">
      {{ zonesText }}
    </InfoItem>
  </InfoList>
</template>

<script lang="ts" setup>
  import { useI18n } from 'vue-i18n';
  import { useRequest } from 'vue-request';

  import { getInfrasCities, getInfrasCloudSubzones } from '@services/source/infras';

  import { Affinity, affinityMap } from '@common/const';

  import InfoList, { Item as InfoItem } from './info-list/Index.vue';

  interface Props {
    details: {
      bk_cloud_name: string;
      city_code: string;
      resource_spec: {
        [key: string]: {
          affinity: string;
          location_spec: {
            city: string;
            include_or_exclue?: boolean;
            sub_zone_ids?: number[];
            zone_ids?: number[];
          };
        };
      };
    };
  }

  const props = defineProps<Props>();

  const { t } = useI18n();

  const { affinity, location_spec: locationSpec } = Object.values(props.details.resource_spec)[0];
  const { zone_ids: zoneIds } = locationSpec;

  const affinityText = affinityMap[affinity as Affinity] || '--';

  const cityName = ref('--');
  const zonesText = ref('--');

  useRequest(getInfrasCities, {
    onSuccess: (cityList) => {
      const cityCode = props.details.city_code;
      const name = cityList.find((item) => item.city_code === cityCode)?.city_name;
      cityName.value = name ?? '--';
    },
  });

  // 历史单据无 zone_ids 时前端不做园区反查，保持初始值「随机」
  if (zoneIds && zoneIds.length > 0) {
    useRequest(getInfrasCloudSubzones, {
      manual: true,
      onSuccess: (cloudSubzoneList) => {
        const zoneNameMap = cloudSubzoneList.reduce<Record<number, string>>((prevMap, cloudSubzoneItem) => {
          return Object.assign(prevMap, { [cloudSubzoneItem.zone_id]: cloudSubzoneItem.zone_name });
        }, {});
        zonesText.value = zoneIds.map((zoneId) => zoneNameMap[zoneId]).join('，');
      },
    });
  }
</script>

<style lang="less" scoped>
  .ticket-details-info-title {
    font-weight: bold;
  }
</style>
