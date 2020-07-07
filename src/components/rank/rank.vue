<template>
	<div class="rank" ref="rank">
		<scroll :topList="topList" class="toplist" ref="toplist">
		<ul>
			<li @click="setItem(item)" class="item" v-for=" item in topList">
				<div class="icon">
					<img :src="item.picUrl" height="100" width="100"/>
				</div>
				<ul class="songlist">
					<li class="song" v-for=" song in item.songList">
						<span>{{song.songname}}</span>
						<span>{{song.singername}}</span>
					</li>
				</ul>
			</li>
		</ul>
		</scroll>
		<router-view></router-view>
	</div>
</template>

<script>
	import {getTopList} from "../../api/rank.js"
	import Scroll from "../scroll/scroll";
	import {mapMutations} from 'vuex'
  import {miniPlayerShow} from '../../common/js/mixin'
	export default {
    mixins: [miniPlayerShow],
		created(){
			this._getTopList();
		},
		data(){
			return {
				topList:[]
			}
		},
		methods:{
      handlePlaylist(fullScreen){

        const bottomX=!this.fullScreen?"60px":"0px";
        this.$refs.rank.style.bottom = bottomX
        this.$refs.toplist.refresh()
      },
			_getTopList(){
				getTopList().then((res)=>{
					if(res.code==0){
						this.topList=res.data.topList
					}
				})
			},
			setItem(item){
				this.$router.push({
					path:"/rank/"+item.id
				})
				this.setToplist(item)
			},
			...mapMutations({
				setToplist:"SET_TOP_LIST"
			})
		},
		components:{
			Scroll
		}
	}
</script>

<style>
	.rank {
		position: fixed;
		width: 100%;
		top: 80px;
		bottom: 0;
		background: #2C3E50;
		z-index: 1;
	}

	.toplist {
		height: 100%;
		overflow: hidden;
    /*position: absolute;*/
	}

	.item {
		display: flex;
		margin: 0 20px;
		padding-top: 20px;
		height: 100px;
	}

	.item:last-child {
		padding-bottom: 20px;
	}

	.item>.icon {
		flex: 0 0 100px;
		width: 100px;
		height: 100px;
	}
	.icon img{
		border-radius: 0;
		-webkit-border-radius: 0;
	}
	.songlist {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 0 20px;
		height: 100px;
		overflow: hidden;
		background:#333;
		color:rgba(255,255,255,0.3);
		font-size: 14px;
	}

	.song {
		line-height: 26px;
	}

	.loading-container {
		position: absolute;
		width: 100%;
		top: 50%;
		transform: translateY(-50%);
	}
</style>
