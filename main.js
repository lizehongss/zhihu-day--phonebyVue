import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app.vue';
import './style.css'
import './iconfont.js'
Vue.use(VueRouter);

const Routers =[
{
	path:'/index',
	meta:{
		title:'首页'
	},
	component: (resolve) => require(['./views/index.vue'],resolve)
},
{
	path: '/theme/:id',
	meta:{
		title: '主题页'
	},
	component:(resolve) => require(['./views/theme.vue'],resolve)
},
{
	path: '/user/:id',
	meta:{
		title: '文章页'
	},
	component: (resolve) =>require(['./views/article.vue'],resolve)
},
{
	path: '*',
	redirect:'/index'
}]
const RouterConfig={
	mode:'history',
	routes: Routers
};
const router =new VueRouter(RouterConfig);

new Vue({
	el: '#app',
	router: router,
	render: h=>h(App)
})