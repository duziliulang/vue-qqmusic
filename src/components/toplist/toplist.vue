<template>
	<div class="topList">
		<musiclist :bg-image="bgImage" :songs="songs" :tittle="tittle"></musiclist>
	</div>
</template>

<script>
	import musiclist from "../musicList/musicList"
	import {getMusicList} from "../../api/rank.js"
	import {createSong} from "../../common/js/song.js"
	import {mapGetters} from 'vuex'
	export default{
		data(){
			return {
				songs:[]
			}
		},
		components:{
			musiclist
		},
		computed:{
			...mapGetters([
				'topList'
			]),
			tittle(){
				return this.topList.topTitle
			},
			bgImage(){
				console.log("88888888888888888888")
				console.log(this.topList)
				return this.topList.picUrl
			}
		},
		created(){
   			this._getMusicList()
		},
		methods:{
			_getMusicList(){
				getMusicList(this.topList.id).then((res)=>{
					console.log("-----------------")
					console.log(this.topList)
					console.log(res)
					this.songs=this._normalizeSongs(res.songlist)
					console.log("-----------------")
				})
			},
			_normalizeSongs(list) {
		        let ret = []
		        list.forEach((item) => {
		          const musicData = item.data
		          if (musicData.songid && musicData.albummid) {
		            ret.push(createSong(musicData))
		          }
		        })
		        return ret
		      }
		}


	}
</script>

<style>
	div{
		color: yellow;
	}
	.topList{
		position: fixed;
	    top: 0;
	    left: 0;
	    right: 0;
	    bottom: 0;
	    background: #2C3E50;
	    z-index: 100;
	}
</style>
