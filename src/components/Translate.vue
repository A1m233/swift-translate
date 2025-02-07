// Translate.vue
<template>
  <el-card class="translate-container" body-style="width: 100%; padding: 0px; padding-top: 15px;">
    <div class="card-header">
      <el-row justify="space-between">
        <el-col :span="6" class="left-dropdown-col">
          <el-dropdown
          :disabled="isUploaded || componentType === 'listItem'"
          @command="handleSourceCommand">
            <span class="el-dropdown-link">
              {{sourceLang}}
              <el-icon v-if="componentType !== 'listItem'">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                v-for="(lang) in langList"
                :key="lang"
                :command="lang">
                  {{lang}}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-col>
        <el-col :span="6" class="switch">
          <el-tooltip
          v-if="componentType !== 'listItem'"
          :content="tooltipContent"
          placement="top">
            <el-button @click="handleSwitch" link :disabled="!canClickSwitchButton"><el-icon><Switch /></el-icon></el-button>
          </el-tooltip>
          <el-button
          class="disabled-button"
          v-else
          disabled
          link>
            <el-icon><Switch /></el-icon>
          </el-button>
        </el-col>
        <el-col :span="6" class="right-dropdown-col">
          <el-dropdown
          :disabled="isUploaded || componentType === 'listItem'"
          @command="handleDestCommand">
            <span>
              {{destLang}}
              <el-icon v-if="componentType !== 'listItem'">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                v-for="(lang) in langList.filter(lang => lang !== '自动检测语言')"
                :key="lang"
                :command="lang">
                  {{lang}}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-col>
      </el-row>
      <el-row justify="center" v-if="componentType === 'pic'">
        <el-col :span="12" class="pic-buttons-wrapper">
          <el-upload
          :on-progress="handleOnProgress"
          :show-file-list="false"
          :limit="1">
            <el-button v-if="isLangsSelected" type="primary">
              <el-icon><UploadFilled /></el-icon>&nbsp;上传图片以进行翻译
            </el-button>
            <el-tooltip v-else content="请先选择源语言以及目标语言">
              <el-button type="primary" disabled>
                <el-icon><UploadFilled /></el-icon>&nbsp;上传图片以进行翻译
              </el-button>
            </el-tooltip>
          </el-upload>
          <el-button type="warning" @click="handleReset">
            <el-icon><RefreshRight /></el-icon>&nbsp;重新选择语言和图片
          </el-button>
        </el-col>
      </el-row>
    </div>
    <div class="translate-textarea">
      <el-input
      type="textarea"
      v-model="leftTextareaContent"
      :rows="textareaRows"
      :placeholder="leftPlaceHolder"
      resize="none"
      :input-style="leftTextareaStyle"
      :disabled="componentType !== 'text'"/>
      <el-input
      type="textarea"
      v-model="rightTextareaContent"
      :rows="textareaRows"
      :placeholder="rightPlaceHolder"
      resize="none"
      :input-style="rightTextareaStyle"
      disabled/>
    </div>
    <div class="card-footer">
      <span v-if="componentType === 'listItem'" class="time-display-wrapper">
        <p>{{timeDisplayContent}}</p>
      </span>
      <div class="button-group">
        <el-button-group>
          <el-tooltip :content="isStarred ? '取消收藏当前翻译' : '收藏当前翻译'" placement="top">
            <el-button @click="handleStar" :class="isStarred ? 'star-filled' : ''">
              <el-icon v-if="!isStarred"><Star /></el-icon>
              <el-icon v-else color="#ffd859" size="18"><StarFilled /></el-icon>
            </el-button>
          </el-tooltip>
          <el-tooltip content="复制翻译内容" placement="top">
            <el-button @click="handleCopy"><el-icon><CopyDocument /></el-icon></el-button>
          </el-tooltip>
          <el-tooltip v-if="itemType === 'history'" content="删除此历史翻译" placement="top">
            <el-button @click="handleDeleteHistoryItem"><el-icon><Delete /></el-icon></el-button>
          </el-tooltip>
        </el-button-group>
      </div>
    </div>
  </el-card>
</template>

<script setup>
  import { computed, onMounted, ref, watch } from "vue";
  import {useStore} from '@/stores/store';
  import { APP_KEY, APP_ID, TEXT_API, PIC_API } from "@/constants/constant";
  import { debounce } from "@/utils/utils";

  import $ from 'jquery';
  import CryptoJS from "crypto-js";

  const appID = APP_ID;
  const appKey = APP_KEY;
  const code =
  {
    '中文': 'zh-CHS',
    '日文': 'ja',
    '英文': 'en',
    '自动检测语言': 'auto',
  };

  const store = useStore();

  const {componentType, itemType, item} = defineProps(['componentType', 'item-type', 'item']);

  const sourceLang = ref('选择源语言');
  const destLang = ref('选择目标语言');
  const langList = ref(
  [
    '中文',
    '日文',
    '英文',
  ]);
  const leftTextareaStyle = ref("cursor: auto; background-color: white; padding-left: 3vh;");
  const rightTextareaStyle = ref("cursor: auto; background-color: white;");
  const isUploaded = ref(false);
  const leftTextareaContent = ref("");
  const rightTextareaContent = ref("");
  const leftPlaceHolder = ref(componentType === 'text' ? '请输入文本' : '请选择源语言以及目标语言并上传图片');
  const rightPlaceHolder = ref(componentType === 'text' ? '请选择目标语言以进行翻译' : '请选择源语言以及目标语言并上传图片');
  const textareaRows = ref(componentType === 'listItem' ? 5 : 15);
  const timeDisplayContent = ref(itemType === 'history' ? '翻译时间：' : '收藏时间：');
  const tooltipContent = ref('切换源语言与目标语言');
  const upload = ref();

  const isLangsSelected = computed(() => sourceLang.value !== '选择源语言' && destLang.value !== '选择目标语言');
  const canClickSwitchButton = computed(() =>
  {
    if (componentType === 'listItem')return false;
    if (isUploaded.value)
    {
      tooltipContent.value = '已经上传图片，无法互换语言。如要互换，则请重新上传图片';
      return false;
    }
    if (destLang.value === '选择目标语言')
    {
      tooltipContent.value = '请先选择目标语言';
      return false;
    }
    if (sourceLang.value === '自动检测语言')
    {
      tooltipContent.value = '当源语言为自动检测语言时，无法互换源语言与目标语言';
      return false;
    }
    tooltipContent.value = '切换源语言与目标语言';
    return true;
  });
  const isStarred = computed(() =>
  {
    for (let it of store.lists['starred'])
    {
      if (it.id === item.id)
      {
        return true;
      }
    }
    return false;
  });

  watch(leftTextareaContent, () =>
  {
    handleTranslate();
  });

  function handleReset()
  {
    sourceLang.value = '选择源语言';
    destLang.value = '选择目标语言';
    isUploaded.value = false;
  }
  function handleSourceCommand(command)
  {
    sourceLang.value = command;
    handleTranslate();
  }
  function handleDestCommand(command)
  {
    destLang.value = command;
    if (componentType === 'text')rightPlaceHolder.value = '请输入文本以进行翻译';
    handleTranslate();
  }
  function handleStar()
  {
    if (isStarred.value)
    {
      store.fns['starred']['deleteOnList'](item.id);
    }
    else
    {
      store.fns['starred']['addToList'](
      {
        sourceLang: sourceLang.value,
        destLang: destLang.value,
        leftTextareaContent: leftTextareaContent.value,
        rightTextareaContent: rightTextareaContent.value,
        time: Date.now(),
        id: item.id,
      });
    }
  }
  function formatTimestamp(timestamp)
  {
    const date = new Date(timestamp); // 将时间戳转换为 Date 对象

    const year = date.getFullYear();   // 获取年份
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 获取月份（注意：月份是从0开始的，所以需要加1）
    const day = String(date.getDate()).padStart(2, '0');      // 获取日期
    const hours = String(date.getHours()).padStart(2, '0');    // 获取小时
    const minutes = String(date.getMinutes()).padStart(2, '0'); // 获取分钟
    const seconds = String(date.getSeconds()).padStart(2, '0'); // 获取秒

    // 返回格式化后的日期时间字符串
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  function handleCopy()
  {
    navigator.clipboard.writeText(rightTextareaContent.value);
  }
  function truncate(q)
  {
    const len = q.length;
    if (len <= 20)return q;
    return q.substring(0, 10) + len + q.substring(len - 10, len);
  }
  function handleTranslate()
  {
    if (destLang.value === '请选择语言' || !leftTextareaContent.value || componentType !== 'text')return;
    console.log(leftTextareaContent.value);
    item.id = store.id;
    store.increaseId();
    const salt = (new Date).getTime();
    const curtime = Math.round(new Date().getTime() / 1000);
    const sign = CryptoJS.SHA256(appID + truncate(leftTextareaContent.value) + salt + curtime + appKey).toString(CryptoJS.enc.Hex);
    $.ajax(
    {
      url: TEXT_API,
      type: 'post',
      dataType: 'jsonp',
      data:
      {
        q: leftTextareaContent.value,
        appKey: appID,
        salt,
        from: code[sourceLang.value],
        to: code[destLang.value],
        sign,
        signType: 'v3',
        curtime,
      },
      success: function(data)
      {
        rightTextareaContent.value = data.translation[0];
        if (data.errorCode !== '0')
        {
          rightTextareaContent.value = '翻译出现了问题，请稍后重试。';
        }
        else if (data.errorCode === '0')
        {
          store.fns['history']['addToList'](
          {
            sourceLang: sourceLang.value,
            destLang: destLang.value,
            leftTextareaContent: leftTextareaContent.value,
            rightTextareaContent: rightTextareaContent.value,
            time: new Date(),
            id: item.id,
          });
        }
      } 
    });
  }
  function handleSwitch()
  {
    [sourceLang.value, destLang.value] = [destLang.value, sourceLang.value];
  }
  function handleDeleteHistoryItem()
  {
    store.fns['history']['deleteOnList'](item);
  }
  async function imageToBase64(imgRaw)
  {
    return new Promise((resolve, reject) =>
    {
      const fr = new FileReader();
      fr.readAsDataURL(imgRaw);
      fr.onload = () =>
      {
        fr.result.startsWith('data:image/') ? resolve(fr.result.substr(22)) : reject();
      }
      fr.onerror = reject;
    });
  }
  async function handleOnProgress(event, uploadFile)
  {
    console.log(uploadFile.raw);
    isUploaded.value = true;
    leftPlaceHolder.value = rightPlaceHolder.value = '提取文字中';
    let imgBase = await imageToBase64(uploadFile.raw);
    console.log(imgBase);
    item.id = store.id;
    store.increaseId();
    const salt = (new Date).getTime();
    const curtime = Math.round(new Date().getTime() / 1000);
    const sign = CryptoJS.SHA256(appID + truncate(imgBase) + salt + curtime + appKey).toString(CryptoJS.enc.Hex);
    $.ajax(
    {
      url: PIC_API,
      type: 'post',
      data:
      {
        type: '1',
        q: imgBase,
        appKey: appID,
        salt,
        from: code[sourceLang.value],
        to: code[destLang.value],
        sign,
        signType: 'v3',
        curtime,
      },
      success: function(data)
      {
        leftTextareaContent.value = rightTextareaContent.value = '';
        data.resRegions.forEach(item =>
        {
          leftTextareaContent.value += item.context + '\n';
          rightTextareaContent.value += item.tranContent;
        });
        if (data.errorCode !== '0')
        {
          leftTextareaContent.value = rightTextareaContent.value = '翻译出现了问题，请稍后重试。';
        }
        else if (data.errorCode === '0')
        {
          store.fns['history']['addToList'](
          {
            sourceLang: sourceLang.value,
            destLang: destLang.value,
            leftTextareaContent: leftTextareaContent.value,
            rightTextareaContent: rightTextareaContent.value,
            time: new Date(),
            id: item.id,
          });
        }
      },
      error: function(xhr, status, error)
      {
        console.log(status);
      }
    });
  }

  onMounted(() =>
  {
    if (componentType === 'text')
    {
      langList.value = ['自动检测语言', ...langList.value];
      sourceLang.value = '自动检测语言';
      handleTranslate = debounce(handleTranslate, 1000);
    }
    else if (componentType === 'listItem')
    {
      const elements = document.querySelectorAll('.el-dropdown.is-disabled');
      elements.forEach(element =>
      {
        element.style.cursor = 'auto';
      });
      sourceLang.value = item.sourceLang;
      destLang.value = item.destLang;
      leftTextareaContent.value = item.leftTextareaContent;
      rightTextareaContent.value = item.rightTextareaContent;
      timeDisplayContent.value += formatTimestamp(item.time);
    }
  });
</script>

<style scoped>
.translate-container {
  width: 95%;
  height: auto !important;
  background-color: white !important;
  padding-top: 0px;
  /* 由于父组件背景颜色继承到了子组件，所以使用!important来提升优先级 */
}
.card-header {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 0px;
  gap: 3vh;
}
.pic-buttons-wrapper {
  display: flex;
  justify-content: center;
}
.translate-textarea {
  margin-top: 15px;
  display: flex;
  flex-direction: row;
}
.left-dropdown-col {
  padding-left: 3vh;
  display: flex;
  align-items: center;
}
.switch {
  display: flex;
  align-items: center;
  justify-content: center;
}
.right-dropdown-col {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 3vh;
}
.el-dropdown {
  color:dodgerblue;
}
.button-group {
  display: flex;
  justify-content: flex-end;
  margin-left: auto;
}
.el-button.is-disabled, .el-button.is-disabled:hover {
  cursor: auto;
}
.el-button.is-link.is-disabled {
  color: --el-text-color-regular;
}
.el-button, .el-button.is-round {
  margin: 0px;
}
:deep(.el-tooltip__trigger:focus-visible) {
  outline: unset;
}
.card-footer {
  display: flex;
  justify-content: space-between;
}
p {
  margin: 0px;
  font-size: 13px;
  color:rgb(128, 130, 134);
}
.time-display-wrapper {
  display: flex;
  align-items: center;
  padding-left: 3vh;
}
.star-filled {
  padding-left: 13px;
  padding-right: 13px;
}
</style>
