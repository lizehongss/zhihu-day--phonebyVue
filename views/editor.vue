<template>
	<div>
	<div class="title">
		 <svg class="icon" aria-hidden="true" @click.stop="handleRouter">
        <use xlink:href="#icon-back"></use>
      </svg>
      <span>主编</span>
	</div>
	<div class="editor">
		<div class="editor-peo" v-for="item in editorlist">
			<img :src="imgPath+item.avatar" >
			<h2>{{item.name}}</h2>
			<span>{{item.bio}}</span>

		</div>
	</div>
</div>
</template>
<script>
	import $ from '../libs/util'
	export default{
		data(){
			return{
				editorlist: [],
				imgPath: $.imgPath
			}
		},
		methods:{
			geteditorlist(id){
				this.editorlist=[];
				$.ajax.get('theme/'+id).then(res=>{
					this.editorlist=res.editors;
				})
				console.log(this.editorlist);
			},
			handleRouter(){
       			 this.$router.go(-1);
      		}
		},
		mounted(){
				const Num=parseInt(this.$route.params.id);
				this.geteditorlist(Num);
					}
	}
</script>
<style scoped>
	.title{
		background-color: #4348b7;
		height: 40px;
		width: 100%;
		display: flex;
		justify-content:flex-start;
		align-items: center;
		color:#fff;
	}
	.icon{
		margin-right: 10px;
	}
</style>