# 前言

使用vue框架仿知乎日报移动端，本项目仅是出于学习目的。主要是学习vue构建SPA页面，以及webpack和vue-router的用法。本项目包含5个单页，使用了自定义组件和自定义指令进行构建。

# 技术栈

vue2+webpack+vue-router+axios+ES5/6+flex

# 说明 
- 图标库使用 [Iconfont-阿里巴巴矢量图标库](http://www.iconfont.cn/)
- 移动布局采用flex布局
- 使用自定义指令 **Chickoutside** 完成侧栏显示和隐藏
- 使用自定义指令 **Time** 完成时间转换
- 使用[better-scroll](https://github.com/ustbhuangyi/better-scroll)实现上拉加载和下拉刷新

# 运行
## 运行时需要本地支持node和npm，相关步骤如下：
- 安装依赖
```
npm install
```
- 运行
```
npm run start
```
- 打包
```
npm build
```


# API
- 使用了[izzyleung](https://github.com/izzyleung/ZhihuDailyPurify/wiki/%E7%9F%A5%E4%B9%8E%E6%97%A5%E6%8A%A5-API-%E5%88%86%E6%9E%90)提供的知乎日报-API-分析文档
- 使用了node的request做代理,监听的本地端口如下：
```
const hostname='127.0.0.1';
const port=8010;//信息代理
const imgPort=8011;//图片代理
```
若需要更改，可在proxy.js做更改

# 基本功能
- [x] 首页导航 -- 完成
- [x] 首页侧栏 -- 完成
- [x] 文章详情页 -- 完成
- [x] 主题列表页 -- 完成
- [x] 评论页 -- 完成
- [x] 主编信息页 -- 完成

# 总结和后续
- 在开发过程中踩了不少坑，明白了vue的基本开发流程和主要思想，估计会做一个详细笔记(挖坑。。。)
- 在这过程中也明白了还是做一个实际的东西比较适合自己去学习，估计以后学习也会尽量做一个实际的东西出来
- 由于在开发过程中使用了代理,无法在githubpage中展示出来(搜索无果),所以应该会搭在服务器里(继续挖坑。。。)
- 本项目也有一些细节代完善，应该会继续更新
- 由于数据来源问题，登陆的相关页面并没有开发，在思考要不要做个架子




# 参考资料
- [Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
- [Flex 布局教程：实例篇](http://www.ruanyifeng.com/blog/2015/07/flex-examples.html)
- [Vue.js实战](https://book.douban.com/subject/27178802/)
- [当 better-scroll 遇见 Vue](https://zhuanlan.zhihu.com/p/27407024)

