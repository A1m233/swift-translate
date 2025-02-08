// TranslateView.vue
<template>
  <Header />
  <div class="translate-view-container">
    <!-- <h1>这是翻译视图</h1> -->
    <el-button-group>
      <el-button
      @click="currentTab = 'TextTranslation'"
      :type="currentTab === 'TextTranslation' ? 'primary' : ''"
      round
      plain>
        <el-icon><Document /></el-icon>
        文本翻译
      </el-button>
      <el-button
      @click="currentTab = 'PictureTranslation'"
      :type="currentTab === 'PictureTranslation' ? 'primary' : ''"
      round
      plain>
        <el-icon><Picture /></el-icon>
        图片翻译
      </el-button>
    </el-button-group>
    <KeepAlive>
      <component :is="tabs[currentTab]" :item="{}"/>
    </KeepAlive>
  </div>
</template>

<script setup lang="ts">
  import TextTranslation from '@/components/TextTranslation.vue';
  import PictureTranslation from '@/components/PictureTranslation.vue';
  import Header from '@/components/Header.vue';
  import { ref } from 'vue';

  type CurrentTab = 'TextTranslation' | 'PictureTranslation';

  const tabs =
  {
    TextTranslation,
    PictureTranslation,
  };
  const currentTab = ref<CurrentTab>('TextTranslation');
</script>

<style scoped>
.translate-view-container {
  padding-top: 5vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(245, 245, 245);
  height: 90vh;
  gap: 5vh;
}
</style>