<template>
  <el-affix>
    <el-menu
    :default-active="store.activeIndex"
    mode="horizontal"
    :ellipsis="false">
      <el-menu-item
      id="logo"
      class="logo"
      @click="() => router.push('/')">
        <h4><el-icon><Stopwatch /></el-icon>SwiftTranslate</h4>
      </el-menu-item>
      <el-menu-item
      class="divider-menu-item"
      disabled>
        <el-divider
        direction="vertical"/>
      </el-menu-item>
      <el-menu-item index="0" @click="() => router.push('/translate')">
        <el-icon><ChatLineSquare /></el-icon>
        在线翻译
      </el-menu-item>
      <el-sub-menu index="1">
        <template #title>
          <el-icon><UserFilled /></el-icon>个人中心
        </template>
        <el-menu-item index="1-1" @click="() => router.push('/history')">
          <el-icon><Clock /></el-icon>
          历史翻译
        </el-menu-item>
        <el-menu-item index="1-2" @click="() => router.push('/starred')">
          <el-icon><Star /></el-icon>
          收藏翻译
        </el-menu-item>
      </el-sub-menu>
    </el-menu>  
  </el-affix>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { useStore } from '@/stores/store';

  const store = useStore();
  const router = useRouter();
</script>

<style scoped>
.el-menu--horizontal > .el-menu-item:nth-child(3) {
  margin-right: auto;
}
/* .el-menu--horizontal {
  height: 10%;
  display: flex;
  align-items: center;
} */
.divider-menu-item {
  opacity: 1;
  cursor: auto;
  padding: 0px;
  width: 0px;
}
.el-divider {
  height: 30px;
}
.logo {
  --el-menu-hover-text-color: black;
  --el-menu-hover-bg-color: white;
}
.el-menu-item {
  --el-menu-hover-bg-color: white;
}
</style>