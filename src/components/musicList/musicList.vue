<template>
	<div class="musicList">
		<span @click="back" class="backSpan"></span>
		<h1 class="musicListTittle" v-html="tittle"></h1>
		<div :style="bgStyle" class="bgimage" ref="bgImage">
			<div></div>
		</div>
		<div class="layer" ref="layer"></div>
		<scroll
      :data="songs"
      :listen-scroll="listenScroll"
      :probe-type="probeType"
      @scroll="Scroll"
      class="list"
      ref="list"
    >
			<div class="songListWrapper">
				<songlist :songs="songs" @select="selectItem"></songlist>
			</div>
		</scroll>
	</div>
</template>
<script>
	import scroll from "../scroll/scroll";
	import songlist from "../songlist/songlist";
	import { mapActions,mapGetters } from 'vuex'
	import { player } from '../../api/song'
  import {miniPlayerShow} from '../../common/js/mixin'
	const topHeight = 40;
	export default {
    mixins: [miniPlayerShow],
		data() {
			return {
				scrollY: 0
			}
		},
		props: {
			songs: {
				type: Array,
				default: []
			},
			tittle: {
				type: String,
				default: ""
			},
			bgImage: {
				type: String,
				default: ""
			}
		},
		mounted() {
			this.imageHeight = this.$refs.bgImage.clientHeight;
			this.maxHeight = -this.imageHeight + topHeight;
			this.$refs.list.$el.style.top = this.imageHeight + 'px';
		},
		created() {
			this.probeType = 3
			this.listenScroll = true
		},
		computed: {
			bgStyle() {
				return "background-image:url(" + this.bgImage + ")"
			},
      ...mapGetters(
        [
          'fullScreen'
        ]
      )
		},
		methods: {
			...mapActions([
				'selectplay'
			]),
      handlePlaylist(fullScreen){
        const bottomX=!this.fullScreen?"60px":"0px";
        this.$refs.list.$el.style.bottom = bottomX
        this.$refs.list.refresh()
      },
			Scroll(pos) {
				this.scrollY = pos.y;
			},
			back() {
				this.$router.back()
			},
			selectItem(song, index) {
				let url = '';
				const that = this;
				player(song.mid).then((response) => {
						let item = response.data.items[0];
						if(!song.url) {
							url = "http://dl.stream.qqmusic.qq.com/" + item.filename + "?vkey=" + item.vkey + "&guid=7661965632&uin=0&fromtag=66";
							that.songs[index].url = url;
						}
						this.selectplay({
							list: this.songs,
							index: index
						})
				})
			}
			},
			components: {
				scroll,
				songlist
			},
			watch: {
        fullScreen(){
          const bottomX=!this.fullScreen?"60px":"0px";
          this.$refs.list.$el.style.bottom = bottomX
        },
				scrollY(newY) {
					let scale = 1;
					let zIndex = 0;
					let transfromY = Math.max(this.maxHeight, newY)
					const percent = Math.abs(newY / this.imageHeight)
					if(newY > 0) {
						scale = 1 + percent
					}
					this.$refs.layer.style["transform"] = "translate3d(0," + transfromY + "px,0)";
					if(newY < this.maxHeight) {
						zIndex = 10;
						this.$refs.bgImage.style.paddingTop = 0;
						this.$refs.bgImage.style.height = 40 + 'px';
					} else {
						zIndex = 0;
						this.$refs.bgImage.style.paddingTop = "70%";
						this.$refs.bgImage.style.height = 0 + 'px';
					}
					this.$refs.bgImage.style["transform"] = "scale(" + scale + ")";
					this.$refs.bgImage.style.zIndex = zIndex
				}
			}
		}
</script>

<style>
	.musicList {
		background: #2C3E50;
		/*position: relative;*/
		/*height: 100%;*/
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
	}
	.backSpan {
		position: absolute;
		left: 10px;
		top: 10px;
		width: 20px;
		height: 20px;
		text-align: center;
		line-height: 30px;
		color: yellow;
		z-index: 101;
    background: url("../../common/images/jiantou.png") no-repeat center;
    background-size: cover;
	}

	.musicListTittle {
		width: 100%;
		position: absolute;
		top: 10px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		font-size: 20px;
		color: yellow;
		z-index: 100;
	}

	.bgimage {
		position: relative;
		width: 100%;
		padding-top: 70%;
		height: 0;
		transform-origin: top;
		background-size: cover;
	}

	.list {
		position: fixed;
		top: 0;
		bottom: 0;
		width: 100%;
		background: #2C3E50;
		z-index: 4;
	}

	.layer {
		position: relative;
		height: 100%;
		background: #2C3E50;
		z-index: 3;
	}
</style>
