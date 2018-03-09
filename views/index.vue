<template>
	<div>
	<div class="content">
		<div class="title-f" v-Clickoutside="handleClose">
		<div class="title">
			<div class="left">
			<svg class="icon" aria-hidden="true" @click.stop="showsilbar=!showsilbar">
				<use xlink:href="#icon-category"></use>
			</svg>
			<span>首页</span>
			</div>
			<div class="right">
			
			<svg class="icon" aria-hidden="true">
				<use xlink:href="#icon-gengduo"></use>
			</svg>
			</div>
			<Sidebar :showsilbar="showsilbar"></Sidebar>
		</div>
		</div>
		<div class="lb"></div>
		<div class="daily"  ref="list">
			<div v-for="list in recommendList">
			<div class="daily-date">{{formatDay(list.date)}}</div>
			<scroll ref="wrrapper"
			class="wrapper"
			:data="list.stories"
			:pullup="pullup"
			:pulldown="pulldown"
			@pulldown="getRecommendList"
			@scrollToEnd="moreData">
				<Item
					v-for="item in list.stories"
					:data="item"
					:key="item.id"
					@click.native="handleRouter(item.id)">
					
				</Item>
			</scroll>
			</div>
		</div>
	</div>
</div>
</template>
<script>
	import Item from '../component/item.vue';
	import $ from '../libs/util';
	import Clickoutside from '../directives/clickoutside';
	import scroll from '../component/scroll.vue';
	import BScoll from 'better-scroll';
	import Sidebar from '../component/sidebar.vue'
	export default{
		directives:{Clickoutside},
		components:{Item,scroll,Sidebar},
		data (){
			return {
				dailyTime: $.getTodayTime(), //获得时间
				isLoading: false,
				recommendList:[], //数据存储
				articleId: 0,
				showsilbar: false,  //控制侧栏开关
				themes: [], //主题数据
				themeId: 0 ,//当前点击的主题
				pulldown:true,//下拉刷新
				pullup:true//上拉加载
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
			//scroll事件
			moreData(){
				this.dailyTime-=86400000;
				this.getRecommendList();
			},
			//跳转函数
			handleRouter(id){
				if(this.showsilbar) return;//侧栏打开时无效
				this.$router.push('/user/'+id+'');
			}
		},
		mounted (){
			this.getRecommendList();
		}
	}
</script>
<style scoped>
	.title-f{
		position:fixed;
		top: 0;
		left:0;
		height: 40px;
		width: 100%;
		z-index: 999;

	}
	.title{
		background-color: #4348b7;
		height: 40px;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #fff;
	}
	
	.daily{
		margin-top:40px;
	}
	.icon{
		margin-left: 1em;
		margin-right: 1em;
	}
	
</style>