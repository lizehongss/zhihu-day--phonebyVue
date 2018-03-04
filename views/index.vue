<template>
	<div class="content">
		<div class="title"></div>
		<div class="lb"></div>
		<div class="daily">
		</div>
	</div>
</template>
<script>
import Item from './component/item.vue';
	import $ from './libs/util';
	import dailyArticle from './component/daily-article.vue';
	export default{
		components:{Item,dailyArticle},
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
			//监听滚动事件
			const $list=this.$refs.list;//获取DOM
			$list.addEventListener('scroll',()=>{
				if(this.isLoading) return;//为主题日报或正在加载时 return
				if(
					$list.scrollTop+document.body.clientHeight>=$list.scrollHeight){
					this.dailyTime-=86400000;
				this.getRecommendList();
				}
			})

		}
	}
</script>