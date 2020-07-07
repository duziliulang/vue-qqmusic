<template>
	<div class="singer"  ref="singer">
     <singerView
       :LetterList="LetterList"
       :singerList="singerList"
       @select="selectItem"
     ></singerView>
		 <router-view></router-view>
	</div>
</template>
<script>
	const singerLen = 10;
	const siggerHot = "热门";
	import { getSingerList } from "../../api/singer";
	import { ERROK } from "../../api/api";
	import Singer from "../../common/js/sigger";
	import singerView from "../singerView/singerView";
	import {mapMutations} from 'vuex'
  import {miniPlayerShow} from '../../common/js/mixin';

	export default {
    mixins: [miniPlayerShow],
		data() {
			return {
				singerList: [],
				LetterList: []
			}
		},
		mounted() {
			this._getSingerList()
		},
    components: {
      singerView
    },
		methods: {
      handlePlaylist(fullScreen){
        const bottomX=!this.fullScreen?"60px":"0px";
        this.$refs.singer.style.bottom = bottomX;
        // console.log("list重新计算")
        // this.$refs.listview.refresh()
      },
			selectItem(item){
				this.$router.push({
				      path: "/singer/"+item.id
				})
				this.setSinger(item)
			},
			_getSingerList() {
				getSingerList().then((res) => {
					if(res.code == ERROK) {
						this.singerList = this.classification(res.data.list);
					}
				})
			},
			classification(list) {
				let map = {
					hot: {
						tittle: siggerHot,
						items: []
					}
				}
				list.forEach((item, index) => {
					if(index < singerLen) {
						map.hot.items.push(new Singer({
							name: item.Fsinger_name,
							id: item.Fsinger_mid
						}))
					}
					let key = item.Findex;
					if(!map[key]) {
						map[key] = {
							tittle: key,
							items: []
						}
					}
					map[key].items.push(new Singer({
						name: item.Fsinger_name,
						id: item.Fsinger_mid
					}))
				})
				let ret = [];
				let hot = [];
				for(var key in map) {
					let val = map[key];
					if(val.tittle.match(/[a-zA-Z]/)) {
						ret.push(val)
					} else {
						hot.push(val)
					}
				}
				ret.sort(function(a, b) {
					return a.tittle.charCodeAt(0) - b.tittle.charCodeAt(0);
				})
				for(var i = 0; i < hot.concat(ret).length; i++) {
					this.LetterList.push(hot.concat(ret)[i].tittle);
				}
				return hot.concat(ret)
			},
			...mapMutations({
		        setSinger: 'SET_SINGER'
		      })
		},

	}
</script>
<style>
  .singer {
    position:fixed;
    top: 80px;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    z-index: 2;
  }
</style>
