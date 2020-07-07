<template>
	<div class="disc">
		<musiclist  :bg-image="bgImage" :songs="songs" :tittle="tittle"></musiclist>
	</div>
</template>

<script>
	import musiclist from "../musicList/musicList";
	import { getSongList} from "../../api/recommend";
	import {mapGetters} from 'vuex'
	export default{
		data(){
			return{
				songs:[]
			}
		},
		created(){
			this._getSongList()
		},
		methods:{
			_getSongList(){
		        getSongList(this.disc.dissid).then((res) => {
		        	console.log("===========================")
		        	console.log(res)
		            this.songs = this._normalizeSongs(res.cdlist[0].songlist)
		        })
			},
			_normalizeSongs(list) {
		        let ret = []
		        list.forEach((musicData) => {
		          if (musicData.songid && musicData.albummid) {
		            ret.push(createSong(musicData))
		          }
		        })
		        return ret
		      }
		},
		computed:{
			tittle(){
				return this.disc.dissname
			},
			bgImage(){
				return this.disc.imgurl
			},
			...mapGetters([
				'disc'
			])
		},
		components:{
			musiclist
		}
	}
</script>
<!--https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg?
g_tk=1928093487&
inCharset=utf-8&
outCharset=utf-8&
notice=0&
format=jsonp&
disstid=4145525432&
type=1&
json=1&
utf8=1&
onlysong=0&
platform=yqq&
hostUin=0&
needNewCode=0&
jsonpCallback=__jp6-->
<style>
	.disc{
		position: fixed;
	    top: 0;
	    left: 0;
	    right: 0;
	    bottom: 0;
	    background: #2C3E50;
	    z-index: 100;
	}
</style>
