<template>
  <div id="app">
  <div class="appTopHeader">
  	<myheader></myheader>
		<tabList></tabList>
  </div>

	<keep-alive>
	<router-view ></router-view>
	</keep-alive>
	<player></player>
  </div>
</template>

<script>
	import myheader from './components/header/header'
	import tabList from './components/tablist/tablist'
	import player from './components/player/player'
	export default {
	  name: 'App',
	  components:{
		  myheader,
		  tabList,
		  player
	  }
	}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  overflow: hidden;
  /*padding-top: 80px;*/
}

.appTopHeader{
	position: relative;
	top: 0;
	width: 100%;
	z-index: 1;

}
</style>
