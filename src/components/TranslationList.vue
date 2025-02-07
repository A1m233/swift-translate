// TranslationList.vue
<template>
  <el-card body-style="padding: 3vh;">
    <div class="container">
      <div class="header">
        <h3>{{title}}</h3>
        <el-button
        v-if="pageType === 'history'"
        @click="store.fns['history']['clearList']"
        type="danger"
        class="delete-button">清空历史记录</el-button>
        <div class="input-wrapper">
          <el-input
          placeholder="输入以检索翻译"
          :prefix-icon="Search"
          v-model="inputContent"
          @input="handleInput"
          clearable/>
        </div>
      </div>
      <div class="body">
        <Translate
        componentType="listItem"
        :item-type="pageType"
        v-for="item in pagedList"
        :key="item.id" 
        :item="item"/>
      </div>
      <div class="footer">
        <el-pagination
        :page-size="20"
        layout="total, prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange"/>
      </div>
    </div>
  </el-card>
</template>

<script setup>
  import {Search} from '@element-plus/icons-vue';
  import Translate from './Translate.vue';
  import {useStore} from '@/stores/store';
  import {computed, ref, watch} from 'vue';

  import { debounce } from '@/utils/utils';

  const store = useStore();
  
  const {title, pageType} = defineProps(['title', 'page-type']);

  const currentPage = ref(1);
  const inputContent = ref("");
  const filteredList = ref(store.lists[pageType]);

  const total = computed(() =>
  {
    if (!filteredList.value)return 0;
    return filteredList.value.length;
  });
  const pagedList = computed(() =>
  {
    return filteredList.value.filter((_, index) => index >= (currentPage.value - 1) * 20 && index < currentPage.value * 20);
  });

  watch(() => store.lists[pageType], () => handleFilter(inputContent.value), {deep: true});
  function handleCurrentChange(newPage)
  {
    currentPage.value = newPage;
  }
  function handleFilter(value)
  {
    console.log(value);
    if (value === '')
    {
      filteredList.value = store.lists[pageType];
    }
    else
    {
      filteredList.value = store.lists[pageType].filter(item =>
      {
        return item.leftTextareaContent.includes(inputContent.value) || item.rightTextareaContent.includes(inputContent.value)
      });
    }
  }
  const handleInput = debounce(handleFilter, 800);
</script>

<style scoped>
.el-card {
  width: 100%;
}
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 3vh;
}
.header {
  width: 100%;
  height: 5vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
h3 {
  text-align: center;
}
.body {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1vh;
}
.footer {
  padding-top: 4vh;
}
.input-wrapper {
  display: flex;
  align-items: center;
}
.el-input {
  width: 200px;
  height: 40px;
}
.delete-button {
  margin-right: auto;
  margin-left: 1vh;
}
</style>