# swift-translate

这是一个敏捷、小巧的在线翻译项目。

## 技术栈

框架方面使用了Vue3；组件库方面使用了ElementPlus；全局状态管理使用了Pinia+Pinia Plugin Persistedstate，其中后者保证了数据的持久化；路由方面使用了VueRouter。

## 项目内容

- 首页

  首页采用了轮播图的形式简单介绍了项目

  ![](E:\桌面\毕设\online-translate\pic\353e4b91b8dad747b28aedb20594bec.png)

- 在线翻译 - 文本翻译

  通过选择源语言与目标语言并输入文本，响应式地进行翻译

  ![](E:\桌面\毕设\online-translate\pic\18b4aee051071d408232ee39fa3e53c.png)

  

- 在线翻译 - 图文翻译

  通过选择源语言与目标语言并上传图片，以提取文字进行翻译

  ![](E:\桌面\毕设\online-translate\pic\9f15d99946e7ea4968e0be6349e81c9.png)

- 历史翻译

  在每次翻译后，会存储本次翻译的内容，缓存在本地，方便之后进行查看和收藏；同时还有清空记录的功能

  ![](E:\桌面\毕设\online-translate\pic\12a2e810c390e75bd2856a56fce3304.png)

- 收藏翻译

  对于翻译内容，可以加入到收藏列表中，方便之后进行查看

  ![](E:\桌面\毕设\online-translate\pic\4f07cb01818f3dc0833324ceef88dca.png)

## 开始使用

> 前置：安装node.js

首先使用终端移动到指定目录后，将项目克隆到本地

```bash
git clone https://github.com/A1m233/swift-translate.git
```

之后移动到对应目录并安装依赖

```bash
cd swift-translate
npm install
```

然后就可以启动项目了

```bash
npm run dev
o // 使用默认浏览器打开网页
```

