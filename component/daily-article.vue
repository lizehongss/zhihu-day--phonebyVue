<template>
	<div class="daily-article">
		<div class="header" :style="styles">
		<div class="daily-article-title">{{data.title}}</div>
		<div class="bq">{{data.image_source}}</div>

	</div>
		<div class="daily-article-content" v-html="data.body"></div>

		<!-- <div class="daily-comments" v-show="comments.length">
			<span>评论({{comments.length}})</span>
			<div class="daily-comment" v-for="comment in comments">
				<div class="daily-comment-avator">
					<img  :src="comment.avatar">
				</div>
				<div class="daily-comment-content">
					<div class="daily-comment-name">{{comment.author}}</div>
					<div class="daily-comment-time" v-Time="comment.time"></div>
					<div class="daily-comment-text">{{comment.content}}</div>
				</div>
			</div>
		</div> -->
	</div>
</template>
<script>
	import Time from '../directives/time';
	import $ from '../libs/util';
	export default{
		directives:{
			Time
		},
		props: {
			id:{
				type:Number,
				default: 0
			}
		},
		data(){
			return {
				data: {},
				comments:[],
				imgPath: $.imgPath,
			}
		},
		methods:{
			getArticle(){
				$.ajax.get('news/'+this.id).then(res=>{
					res.body=res.body.replace(/src="http/g, 'src="'+$.imgPath+'http');
					res.body=res.body.replace(/src="https/g, 'src="'+$.imgPath+'https')
					this.data=res;
					window.scrollTo(0,0);
					this.getComments();
				})
			},
			getComments(){
				this.comments=[];
				$.ajax.get('story/'+this.id+'/short-comments').then(res=>{
					this.comments=res.comments.map(comment=>{
						comment.avatar=$.imgPath + comment.avatar;
						return comment;
					})
				})
			}
		},
		watch:{
			id(val){
				if(val) this.getArticle();
			}
		},
		computed:{
			styles(){
				return {
					backgroundImage: 'url('+this.imgPath+this.data.image+')',
				};
			}
		}
	};
</script>
<style scoped>

	.header{
		background-size: 100%;
		display: flex;
		flex-direction: column;
		justify-content:flex-end;
		align-items: center;
		height: 200px;
	}
	.daily-article-title{
		width:75%;
		color: #ffe;
	}
	.bq{
		align-self: flex-end;
		font-size: 1em;
		color: #fee;
	}
	

</style>