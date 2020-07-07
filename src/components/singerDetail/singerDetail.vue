<template>
	<div class="singerDetail" v-show="songs">
		<musiclist :bg-image="bgImage" :songs="songs" :tittle="tittle"></musiclist>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex';
	import {getSingerDetail} from "../../api/singer.js"
	import {createSong} from "../../common/js/song.js"
	import musiclist from "../musicList/musicList"
	export default{
		data(){
			return {
				songs:[]
			}
		},
		created(){
			this._getDetail();
		},
		computed:{
			tittle(){
				return this.singer.name
			},
			bgImage(){
				return this.singer.avatar
			},
			...mapGetters(
				[
					'singer'
				]
			)
		},
		methods:{
			_getDetail(){
				if(!this.singer.id){
					this.$router.push('/singer');
					return ;
				}
				getSingerDetail(this.singer.id).then((res)=>{
					this.songs=this._normalizeSongs(res.data.list);
				})
			},
				_normalizeSongs(list) {
					let arr=[];
					list.forEach((item)=>{
						let musicData=item.musicData;
						if(musicData.albummid&&musicData.songid){
							arr.push(createSong(musicData))
						}
					})
					return arr;
				}
		},
		components:{
			musiclist
		}
	}
</script>

<style>
	.singerDetail{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background:#2C3E50;
		z-index: 100;
	}
</style>
