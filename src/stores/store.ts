import { defineStore } from 'pinia';
import { computed, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';

import {TranslationItem} from '../types/type';

interface Lists
{
  'starred': TranslationItem[],
  'history': TranslationItem[],
};
interface Fns
{
  'starred':
  {
    addToList: (item: TranslationItem) => void,
    deleteOnList: (id: number) => void,
  },
  'history':
  {
    addToList: (item: TranslationItem) => void;
    deleteOnList: (item: TranslationItem) => void,
    clearList: () => void,
  },
};

export const useStore = defineStore('store', () =>
{
  const route = useRoute();
  
  const lists = reactive<Lists>(
  {
    'starred': [],
    'history': [],
  });
  const fns = ref<Fns>(
  {
    'starred':
    {
      addToList: (item: TranslationItem) => lists['starred'].unshift(item),
      deleteOnList: (id: number) => lists['starred'] = lists['starred'].filter(element => element.id !== id),
    },
    'history':
    {
      addToList: (item: TranslationItem) =>
      {
        console.log('addToHistoryList');
        lists['history'].unshift(item);
      },
      deleteOnList: (item: TranslationItem) => lists['history'] = lists['history'].filter(element => element !== item),
      clearList: () => lists['history'] = [],
    },
  });
  const id = ref<number>(1);
  const currentLocation = ref<string>('/');

  const activeIndex = computed<string>(() =>
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
  function storeCurrentLocation(newLocation: string)
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
