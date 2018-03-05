<template>
	<div class="content">
		<div class="title">
			<div class="left">
			<svg class="icon" aria-hidden="true">
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
</template>
<script>
import Item from '../component/item.vue';
	import $ from '../libs/util';
	export default{
		components:{Item},
		data (){
			return {
				themeId: 0,
				dailyTime: $.getTodayTime(),
				isLoading: false,
				recommendList:[],
				articleId: 0
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
			}
		},
		mounted (){
			this.getRecommendList();
			
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
</style>