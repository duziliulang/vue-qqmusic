<template>
	<ul>
		<li @click="selectItem(song,index)" class="songListLi" v-for="(song,index) in songs">
			<h5>{{song.name}}</h5>
			<p>{{songStr(song)}}</p>
		</li>
	</ul>
</template>

<script>
	export default{
		props:{
			songs:{
				type:Array,
				default:[]
			}
		},
		methods:{
			songStr(song){
				return song.singer+"/"+song.album
			},
			selectItem(item,index){
				this.$emit("select",item,index)
			}
		}
	}
</script>

<style>
	.songListLi{
		padding: 5px 0;
	}
	.songListLi p{
		text-align: left;
		padding-left: 20px;
		box-sizing: border-box;
		color: #909090;
		font-size: 14px;
		margin-top: 5px;
	}
	.songListLi h5{
			text-align: left;
		padding-left: 20px;
    box-sizing: border-box;
		color: #fff;
		font-size: 16px;
	}
</style>
