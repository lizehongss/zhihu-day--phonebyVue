<template>
<div>
	<div class="title-f">
		<div class="title">
			<div class="left">
				<svg class="icon" aria-hidden="true"
				@click="handleback">
					<use xlink:href="#icon-back"></use>
				</svg>
				<span>{{longComments.length+shortComments.length}} 条点评</span>
			</div>
		</div>
	</div>
	<div class="ch"></div>
<div class="long-comments">
	<div class="comments-lenghth">
	{{longComments.length}} 条长评</div>
	<div class="daily-comment" v-for="comment in longComments">
		<div class="daily-comment-avator">
			<img :src="comment.avatar">
		</div>
		<div class="daily-comment-content">
			<div class="daily-comment-top">
			<div class="daily-comment-name">{{comment.author}}</div>
			<div class="daily-comment-like">赞 {{comment.likes}}</div>
			</div>
			<div class="daily-comment-time" v-Time="comment.time">
			</div>
			<div class="daily-comment-text">{{comment.content}}</div>
		</div>
	</div>
</div>
<div class="short-comments">
	<div class="comments-lenghth"
	 @click="showshort=!showshort">
	{{shortComments.length}} 条短评</div>
	<div class="daily-comment" v-for="comment in shortComments" v-show="showshort">
		<div class="daily-comment-avator">
			<img :src="comment.avatar">
		</div>
		<div class="daily-comment-content">
			<div class="daily-comment-top">
			<div class="daily-comment-name">{{comment.author}}</div>
			<div class="daily-comment-like">赞 {{comment.likes}}</div>
			</div>
			<div class="daily-comment-time" v-Time="comment.time">
			</div>
			<div class="daily-comment-text">{{comment.content}}</div>
		</div>
	</div>
	
</div>
</div>
</template>
<script>
	import Time from '../directives/time';
	import $ from '../libs/util';
	export default{
		directives:{
			Time
		},
		data(){
			return{
				longComments: [],
				shortComments: [],
				showshort: false
			}
		},
		methods:{
			gets(id){
				this.shortComments=[];
				$.ajax.get('story/'+id+'/short-comments').then(res=>{
					this.shortComments=res.comments.map(comment=>{
						comment.avatar=$.imgPath+comment.avatar;
						return comment;
					})
				})
			},
			getl(id){
				this.longComments=[];
				$.ajax.get('story/'+id+'/long-comments').then(res=>{
					this.longComments=res.comments.map(comment=>{
						comment.avatar=$.imgPath+comment.avatar;
						return comment;
					})
				})
			},
			handleback(){
				this.$router.go(-1);
			}
		},
		mounted(){
			var Num=parseInt(this.$route.params.id);
			console.log(Num);
			this.gets(Num);
			this.getl(Num);
		},
	}
</script>
<style scoped>
	.daily-comment{
	border-bottom: 1px dashed #e3e8ee;
	display: flex;
	justify-content: flex-start;
	margin-top: 10px;
	width: 100%;

	}
	.daily-comment-avator img{
		border-radius: 50%;
		width: 40px;
		height: 40px;
	}
	.daily-comment-content{
		margin-left: 1em;
		width: 100%;
	}
	.daily-comment-time{
		color:#9ea7b4;
		font-size: 14px;
		margin-top: 4px;
	}
	.daily-comment-text{
		margin-top: 10px;
	}
	.daily-comment-top{
		display: flex;
		justify-content: space-between;
		width: 100%;
	}
	.daily-comment-like{
		margin-right: 1em;
		font-size: 14px;
	}
	.comments-lenghth{
		border-bottom: 1px dashed #e3e8ee;
		font-size: 15px;
		width: 100%;
		margin-top:10px;
	}
	.title-f{
		position: fixed;
		top:0;
		left: 0;
		height:40px;
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
	.icon{
		margin-right: 1em;
	}
	.ch{
		width: 100%;
		height: 40px;
		display: block;
	}
</style>