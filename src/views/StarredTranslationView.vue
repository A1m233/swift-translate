// StarredTranslationView.vue
<template>
  <div class="container">
    <Header />
    <div class="body">
      <!--
      todo:
      看看之后要不要实现收藏夹分组的功能
      现在看起来有点难
      -->
      <!-- <div class="left-menu">
        <el-affix :offset="60">
          <el-menu
          :collapse="true"
          :ellipsis="false">
            <el-menu-item
            index="0"
            style="cursor: auto;"
            disabled>
              <el-icon><Folder /></el-icon>
            </el-menu-item>
            <el-menu-item
            index="1"
            @click="isCollapsed = !isCollapsed">
              <el-icon><DArrowRight /></el-icon>
            </el-menu-item>
          </el-menu>
        </el-affix>
      </div> -->
      <TranslationList
      title="收藏翻译列表"
      page-type="starred"/>
    </div>
  </div>
</template>

<script setup lang="ts">
  import TranslationList from '@/components/TranslationList.vue';
  import Header from '@/components/Header.vue';
</script>

<style scoped>
.container {
  width: 100%;  /* 确保容器宽度为100% */
  height: 100vh;  /* 让父容器高度为视口高度，确保页面填满 */
  display: flex;  /* 使用flex布局 */
  flex-direction: column;  /* 保证子元素竖直排列 */
}
.body {
  background-color: rgb(245, 245, 245);
  width: 100%;
  display: flex;
  flex-grow: 1;
}
/* .el-affix {
  height: 100%;
} */
.el-menu-item {
  opacity: 1;
}
</style>