<template>
  <Header />
  <div class="container">
    <h2>SwiftTranslate</h2>
    <span>一个敏捷、小巧的在线翻译网站</span>
    <el-carousel>
      <el-carousel-item @click="() =>router.push('/translate')">
        <div class="text-wrapper">
          <h3>✅响应式翻译 —— 在你完成输入后即刻进行翻译</h3>
          <h4>✨点击以尝试</h4>
        </div>
      </el-carousel-item>
      <el-carousel-item @click="() =>router.push('/history')">
        <div class="text-wrapper">
          <h3>⏲历史翻译记录 —— 随时查看过往翻译</h3>
          <h4>✨点击以尝试</h4>
        </div>
      </el-carousel-item>
      <el-carousel-item @click="() =>router.push('/starred')">
        <div class="text-wrapper">
          <h3>⭐收藏翻译 —— 保存翻译内容方便之后查看</h3>
          <h4>✨点击以尝试</h4>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup lang="ts">
  import Header from '@/components/Header.vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();
</script>

<style scoped>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  background-color: rgb(245, 245, 245);
}
.el-carousel {
  width: 100%;
  cursor: pointer;
}
.el-carousel__item {
  display: flex;
  justify-content: center;
  align-items: end;
}
.el-carousel__item:nth-child(1) {
  background-image: linear-gradient(to right, #d4fc79 0%, #84fab0 100%);
}
.el-carousel__item:nth-child(2) {
  background-image: linear-gradient(to right, #84fab0 0%, #a1c4fd 100%);
}
.el-carousel__item:nth-child(3) {
  background-image: linear-gradient(to right, #a1c4fd 0%, #d4fc79 100%);
}
h2 {
  text-align: center;
  margin-top: 5vh;
}
h4 {
  text-align: center;
}
span {
  color:rgb(60, 62, 66);
  margin-bottom: 10vh;
}
.text-wrapper {
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: end;
  padding: 20px;
  gap: 20%;
}
</style>