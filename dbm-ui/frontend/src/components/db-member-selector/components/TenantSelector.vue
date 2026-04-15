<template>
  <BkUserSelector
    v-model="modelValue"
    :api-base-url="apiBaseUrl"
    draggable
    multiple
    :tenant-id="tenantId"
    @change="handleUsersChange" />
</template>

<script setup lang="ts">
  import urlJoin from 'url-join';
  import { ref } from 'vue';

  import BkUserSelector from '@blueking/bk-user-selector';

  import { useUserProfile } from '@stores';

  import '@blueking/bk-user-selector/vue3/vue3.css';

  const modelValue = defineModel<string[]>({
    required: true,
  });

  const { tenantId } = useUserProfile();

  const apiBaseUrl = urlJoin(window.PROJECT_ENV.VITE_AJAX_URL_PREFIX, '');

  const handleUsersChange = (users) => {
    console.log('Selected users:', users);
  };
</script>
