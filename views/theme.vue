<template>
	<div>
	<div class="title-f">
		<div class="title">
			<div class="left">
			<svg class="icon" aria-hidden="true" @click.stop="showsilbar=!showsilbar">
				<use xlink:href="#icon-category"></use>
			</svg>
			</div>
			<div class="right"></div>
			<Sidebar :showsilbar="showsilbar"></Sidebar>
		</div>
	</div>
	<div>
	<Item v-for="item in themeList.stories"
			:data="item"
			:key="item.id">
	</Item>
	</div>
</div>

</template>
<script>
import Item from '../component/item.vue';
import $ from '../libs/util';
import Sidebar from '../component/sidebar.vue';
	export default{
		components:{
			Item,
			Sidebar
		},
		data(){
			return{
				themeList:[],
				showsilbar: false,
				themeId: 0
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
				console.log(this.themeList);    
			}
		},
	}
</script>