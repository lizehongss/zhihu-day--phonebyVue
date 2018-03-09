<template>
  <div>

	<!-- <div>{{$route.params.id}}</div> -->
  <div class="nav-f">
    <div class="nav">
    <div class="left">
    <svg class="icon" aria-hidden="true" @click.stop="handleRouter">
        <use xlink:href="#icon-back"></use>
      </svg>
    </div>
    <div class="right">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-iconfontzhizuobiaozhun20"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-favorite"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-code"></use>
      </svg>
      <span>{{comments}}</span>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-good"></use>
      </svg>
      <span>{{popularity}}</span>
    </div>
  </div>
  </div>
	<daily-article :id="articleId"></daily-article>
</div>
</template>
<script>
import dailyArticle from '../component/daily-article.vue';
import $ from '../libs/util';
	export default{
		components:{
			dailyArticle
		},
		data(){
			return{
				articleId:0,
        comments:0,
        popularity:0
			}
		},
		mounted(){
			const Num=parseInt(this.$route.params.id);
			this.articleId=Num;
      this.getCommentNumber(Num);
		},
    methods:{
      getCommentNumber(id){
        console.log(typeof id);
        $.ajax.get('story-extra/'+id).then(res=>{
          this.comments=res.comments;
          this.popularity=res.popularity;
            })
        console.log(this.comments);
      },
      handleRouter(){
        this.$router.go(-1);
      }
    },

	}
</script>
<style scoped>
/*引入zhihu body 的css样式*/
	/*@import 'http:\/\/news-at.zhihu.com\/css\/news_qa.auto.css?v=4b3e3'
	.img-place-holder{
		display: none;
	}*/
	@import '../zhihu.css'
  .nav-f{
    position: fixed;
    top: 0;
    left: 0;
    height: 40px;
    width: 100%;
    z-index:999;
  }
  .nav{
    background-color: #4348b7;
    height: 40px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
  }
  .left{
    flex:1;
  }
  .right{
    margin-right: 1em;
  }
  .icon{
    margin-left: 1em;
  }

</style>