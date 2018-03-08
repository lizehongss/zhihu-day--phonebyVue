<template>
	<!-- <div>{{$route.params.id}}</div> -->
	<daily-article :id="articleId"></daily-article>
</template>
<script>
import dailyArticle from '../component/daily-article.vue'
	export default{
		components:{
			dailyArticle
		},
		data(){
			return{
				articleId:0
			}
		},
		mounted(){
			console.log(this.$route.params.id);
			console.log(typeof this.$route.params.id);
			console.log(this.$route);
			const Num=parseInt(this.$route.params.id);
			console.log(Num);
			console.log(typeof Num);
			this.articleId=Num;
			console.log(typeof this.articleId);
		}
	}
</script>
<style>
/*引入zhihu body 的css样式*/
	@import 'http:\/\/news-at.zhihu.com\/css\/news_qa.auto.css?v=4b3e3'
</style>