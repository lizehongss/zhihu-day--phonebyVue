<template>
<div>
	<div class="title">
	</div>
<div class="long-comments">
	<div class="long-comments-lenghth"></div>
	<div class="daily-comment" v-for="comment in longComments">
		<div class="daily-comment-avator">
			<img :src="comment.avatar">
		</div>
		<div class="daily-comment-content">
			<div class="daily-comment-name">{{comment.author}}</div>
			<div class="daily-comment-time" v-Time="comment.time">
			</div>
			<div class="daily-comment-text">{{comment.content}}</div>
		</div>
	</div>
</div>
<div class="short-comments">
	<div class="short-comments-lenghth"></div>
	<div class="daily-comment" v-for="comment in shortComments">
		<div class="daily-comment-avator">
			<img :src="comment.avatar">
		</div>
		<div class="daily-comment-content">
			<div class="daily-comment-name">{{comment.author}}</div>
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
				shortComments: []
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