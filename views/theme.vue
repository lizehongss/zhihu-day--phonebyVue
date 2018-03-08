<template>
	<div>
	<div class="title-f" v-Clickoutside="handleClose">
		<div class="title">
			<div class="left">
			<svg class="icon" aria-hidden="true" @click.stop="showsilbar=!showsilbar">
				<use xlink:href="#icon-category"></use>
			</svg>
			<span>{{themeList.name}}</span>
			</div>
			<div class="right"></div>
			<Sidebar :showsilbar="showsilbar"></Sidebar>
		</div>
	</div>
	<div class="content">
	<div class="header" :style="styles">
		<div class="list-title">{{themeList.description}}</div>
		<div class="bq">{{themeList.image_source}}</div>
	</div>
	<Item v-for="item in themeList.stories"
			:data="item"
			:key="item.id"
			@click.native="handleRouter(item.id)">
	</Item>
	</div>
</div>

</template>
<script>
import Item from '../component/item.vue';
import $ from '../libs/util';
import Sidebar from '../component/sidebar.vue';
import Clickoutside from '../directives/clickoutside';
	export default{
		directives:{Clickoutside},
		components:{
			Item,
			Sidebar
		},
		data(){
			return{
				themeList:[],
				showsilbar: false,
				themeId: 0,
				imgPath: $.imgPath
			}
		},
		mounted(){
			const Num=parseInt(this.$route.params.id);
		
			this.getThemesList(Num);
		},
		methods:{
			getThemesList(id){
				this.themeList=[];
				$.ajax.get('theme/'+id).then(res=>{
					this.themeList=res;
				})
			},
			handleClose(){
				this.showsilbar=false;
			},
			handleRouter(id){
				if(this.showsilbar) return;
				this.$router.push('/user/'+id+'');
			}
		},
		watch:{
			$route(){
				this.themeList=[];
				var id=parseInt(this.$route.params.id);
				this.getThemesList(id);
			}
		},
		computed:{
			styles(){
				return{
					backgroundImage: 'url('+this.imgPath+this.themeList.background+')',
				}
			}
		}
	}
</script>
<style scoped>
	.title-f{
		position: fixed;
		top: 0;
		left: 0;
		height: 40px;
		width:100%;
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
		margin-left: 1em;
		margin-right: 1em;
	}
	.content{
		margin-top: 40px;	}
	.header{
		display: flex;
		flex-direction: column;
		justify-content:flex-end;
		align-items: center;
		}
	.list-title{
		color: #ffe;
	}
	.bq{
		align-self: flex-end;
		font-size: 1em;
		color: #fee;
	}
</style>