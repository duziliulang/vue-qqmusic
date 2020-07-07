<template>
	<div class="tablist">
		<router-link to="/recommend"><span>推荐</span></router-link>
		<router-link to="/singer"><span >歌手</span></router-link>
		<router-link to="/rank"><span >排行榜</span></router-link>
		<router-link to="/search"><span >搜索</span></router-link>
	</div>
</template>
<script>
	export default{

	}
</script>

<style>
	.tablist{
		display: flex;
		justify-content: space-between;
		background: #2C3E50;
		line-height: 40px;
		height: 40px;
	}

	.tablist span{
		color: #fff;
		padding: 0 10px;
	}
  /*在router-like被点击的时候，会被加上router-link-active 这个类名*/
  .router-link-active span{
   color: yellow
   }

</style>
