// App.vue
<template>
  <div>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import { useStore } from '@/stores/store';
  import {onMounted} from 'vue';
  import { useRouter } from 'vue-router';

  const store = useStore();
  const router = useRouter();

  onMounted(() =>
  {
    // router.push(store.currentLocation);
    // console.log(`上次退出时所在路由：${store.currentLocation}`);
  });
</script>
