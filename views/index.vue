<template>
	<div>
	<div class="content">
		<div class="title">
			<div class="left">
			<svg class="icon" aria-hidden="true" @click="showsilbar=!showsilbar" v-Clickoutside="handleClose">
				<use xlink:href="#icon-category"></use>
			</svg>
			<span>首页</span>
			</div>
			<div class="right">
			<svg class="icon" aria-hidden="true">
				<use xlink:href="#icon-remind"></use>
			</svg>
			<svg class="icon" aria-hidden="true">
				<use xlink:href="#icon-gengduo"></use>
			</svg>
			</div>
		</div>
		<div class="lb"></div>
		<div class="daily">
			<div v-for="list in recommendList">
				<div class="daily-date">{{formatDay(list.date)
				}}</div>
				<Item
					v-for="item in list.stories"
					:data="item"
					:key="item.id">
					>
				</Item>
			</div>
		</div>
	</div>
	 <div class="sidebar" v-show="showsilbar" >
	 	<div class="admin">
	 		<div class="top">
	 		<svg class="icon" aria-hidden="true">
				<use xlink:href="#icon-remind"></use>
			</svg>
			<span>请登陆</span>
		</div>
		<div class="bottom">
			<svg class="icon" aria-hidden="true">
				<use xlink:href="#icon-favorite"></use>
			</svg>
			<span>我的收藏</span>
			<svg class="icon" aria-hidden="true">
				<use xlink:href="#icon-icondownload"></use>
			</svg>
			<span>离线下载</span>
		</div>
	 	</div>
	 	<div class="return_deality">
	 		<svg class="icon" aria-hidden="true">
				<use xlink:href="#icon-remind"></use>
			</svg>
			<span>首页</span>
	 	</div>
	 	<div class="daily-menu">
	 	<ul>
	 	<li v-for="item in themes">
	 		<a :class="{on: item.id===themeId}" @click="handleToTheme(item.id)">{{item.name}}</a>
	 		<svg class="icon" aria-hidden="true">
				<use xlink:href="#icon-more"></use>
			</svg>
	 	</li>
	 	</ul>
	 </div>
	 </div>
</div>
</template>
<script>
	import Item from '../component/item.vue';
	import $ from '../libs/util';
	import Clickoutside from '../directives/clickoutside'
	export default{
		directives:{Clickoutside},
		components:{Item},
		data (){
			return {
				dailyTime: $.getTodayTime(), //获得时间
				isLoading: false,
				recommendList:[], //数据存储
				articleId: 0,
				showsilbar: false,  //控制侧栏开关
				themes: [], //主题数据
				themeId: 0 //当前点击的主题

			}
		},
		methods:{
			handleToRecommend(){
				this.recommendList=[];
				this.dailyTime=$.getTodayTime();
				this.getRecommendList();
				},
			getRecommendList(){
				//加载时为true,在等待更新
				this.isLoading=true;
				const prevDay=$.prevDay(this.dailyTime+86400000);
				$.ajax.get('news/before/'+prevDay).then(res=>{
				this.recommendList.push(res);
				//更新后为false	
				this.isLoading=false;
			})
			},
			formatDay(date){
				let month =date.substr(4,2);
				let day=date.substr(6,2);
				if(month.substr(0,1)==='0') month=month.substr(1,1);
				if(day.substr(0,1)==='0') day=day.substr(1,1);
				return `${month}月 ${day} 日`;
			},
			handleClick(id){
				this.articleId=id;
			},
			handleClose(){
				this.showsilbar=false;
			},
			// 获取主题数据 
			getThemes(){
				$.ajax.get('themes').then(res =>{
					this.themes=res.others;
				})
			},
			//当前点击的主题
			handleToTheme(id){
				this.themeId=id;
			}
		},
		mounted (){
			this.getRecommendList();
			this.getThemes();
			
		}
	}
</script>
<style scoped>
	.title{
		background-color: #4348b7;
		height: 40px;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #fff;
	}
	.icon{
		margin-left: 1em;
		margin-right: 1em;
	}
	.content{
	}
	.sidebar{
		width: 80%;
		background-color: #deffff;
		position: absolute;
		top:1px;
		left: 0px;
	}
	.daily-menu ul{
		list-style: none;
		
	}
	.daily-menu li{
		margin-top:20px;
		display: flex;
		justify-content: space-between;
	}
	.daily-menu ul li a{
		text-decoration: none;
		cursor: pointer;
	}
	.daily-menu ul li a:hover, .daily-menu ul li a.on{
		color: #3399ff;
	}
	.admin{
		height: 100px;
		display: flex;
		flex-direction: column;
		align-items:flex-start;
		justify-content: space-between;
		margin-top:2px;
		margin-bottom: 3px;
		background-color: #4348b7;
		color: #fff;
	}
	.bottom{
		margin-bottom: 2px;
	}
	.return_deality{
		margin-top:20px;
	}
</style>