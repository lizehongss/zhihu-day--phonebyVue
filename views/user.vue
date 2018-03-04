<template>
	<div>{{$route.params.id}}</div>
</template>
<script>
	export default{
		mounted(){
			console.log(this.$route.params.id);
			console.log(this.$route);
		}
	}
</script>