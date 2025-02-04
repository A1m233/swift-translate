import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

export const useStore = defineStore('store', () =>
{
  const route = useRoute();
  
  const lists = ref(
  {
    'starred': [],
    'history': [],
  });
  /*
  对于一个收藏的翻译，应该包含：
  两侧选择的语言
  两侧的内容
  收藏的时间
  */
  const fns = ref(
  {
    'starred':
    {
      addToList: item => lists.value['starred'].unshift(item),
      deleteOnList: id => lists.value['starred'] = lists.value['starred'].filter(element => element.id !== id),
    },
    'history':
    {
      addToList: item =>
      {
        console.log('addToHistoryList');
        lists.value['history'].unshift(item);
      },
      deleteOnList: item => lists.value['history'] = lists.value['history'].filter(element => element !== item),
      clearList: () => lists.value['history'] = [],
    },
  });
  const id = ref(1);
  const currentLocation = ref('/');

  const activeIndex = computed(() =>
  {
    console.log(route.path);
    if (route.path === '/translate') return '0';
    else if (route.path === '/history') return '1-1';
    else if (route.path === '/starred') return '1-2';
    return '-1';
  });

  function increaseId()
  {
    id.value++;
  }
  function storeCurrentLocation(newLocation)
  {
    currentLocation.value = newLocation;
  }
  return {
    activeIndex,
    lists,
    fns,
    id,
    increaseId,
    currentLocation,
    storeCurrentLocation,
  };
}, {persist: true});
