<template>
  <Header />
  <div class="container">
    <TranslationList title="历史翻译列表" page-type="history"/>
  </div>
</template>

<script setup>
  import TranslationList from '@/components/TranslationList.vue';
  import Header from '@/components/Header.vue';
</script>

<style scoped>
.container {
  background-color: rgb(245, 245, 245);
  height: 100vh;
  width: 100%;
}
</style>