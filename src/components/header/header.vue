<template>
	<div class="appHeader">
		<div class="headerTittle">
			<span class="icon"></span>
			<span class="headerTittleText">{{tittle}}</span>
		</div>
    <router-link class="mine" tag="div" to="/user"><span></span></router-link>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				'tittle':'音乐播放器'
			}
		}
	}
</script>

<style>
	.headerTittle{
		width:100%;
		height: 40px;
		line-height: 40px;
		background: #2C3E50;
		overflow: hidden;
	}
	.headerTittle>span{
		display: inline-block;
		text-align: center;
		vertical-align: middle;
	}
	.headerTittleText{
		font-size: 14px;
		color: #fff;
	}
	.icon{
		width:30px;
		height: 30px;
		border-radius: 50%;
    -webkit-border-radius:50%;
		background: url(../../common/images/musicIcon.png) center no-repeat;
		background-size: cover;
	}


  .appHeader{
    position: relative;
  }
  .mine{
    position: absolute;
    width:25px;
    height: 25px;
    background: url(../../common/images/mine.png) center no-repeat;
    background-size: cover;
    top: 50%;
    right: 30px;
    transform: translateY(-50%);
  }
</style>
