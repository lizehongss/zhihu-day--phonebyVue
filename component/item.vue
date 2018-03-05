<template>
	<a class="daily-item">
		<div class="daily-img" v-if="data.images">
			<img :src="imgPath+data.images[0]">
		</div>
		<div class="daily-title" :class="{noImg: !data.images}">
		{{data.title}}</div>
	</a>
</template>
<script>
	import $ from '../libs/util';
	export default{
		props:{
			data:{
				type: Object
			}
		},
		data(){
			return {
				imgPath: $.imgPath
			}
		},
		
	}
</script>
<style scoped> 
	.daily-item{
		display: flex;
		/*交叉轴方式 */
		align-items:center;
		flex-direction: center;
		justify-content: flex-start;
		background-color: #ffe;
		margin-bottom: 1em;
		height: 80px;
			}
	.daily-item:hover{
		background-color:#e3e8ee;
	}
	.daily-img{
		margin-right:1em;
		
	}
	.daily-img img{
		width: 60px;
		height: 60px;
	}
	.daily-title{
		flex:1;
	}
	
</style>