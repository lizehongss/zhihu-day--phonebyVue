<template>
	 <div class="sidebar" v-show="showsilbar">
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
</template>
<script>
	import $ from '../libs/util'
	export default{
		props:{
			showsilbar:{
				type:Boolean,
				default: false
			}
		},
		data(){
			return{
				themes:[],
				themeId: 0
			}
		},
		methods:{
			getThemes(){
				$.ajax.get('themes').then(res=>{
					this.themes=res.others;
				})
			},
			handleToTheme(id){
				this.themeId=id;
				this.$router.push('/theme/'+id+'');
			}
		},
		mounted(){
			this.getThemes();
		}
	}
</script>
<style scoped>
.sidebar{
		width: 80%;
		background-color: #deffff;
		position: absolute;
		top:1px;
		left: 0px;
		color:#513c3c;
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