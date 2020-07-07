<template>
	<div class="player" v-show="playlist.length>0">
		<div class="normal-player" v-show="fullScreen">
			<div class="background">
				<img :src="currentSong.image" height="100%" width="100%">
			</div>
			<div class="top">
				<div @click="back" class="back">
					<i class="icon-back"><</i>
				</div>
				<h1 class="title" v-html="currentSong.name"></h1>
				<h2 class="subtitle" v-html="currentSong.singer"></h2>
			</div>

			<div @touchend.prevent="middleTouchEnd"
          @touchmove.prevent="middleTouchMove"
           @touchstart.prevent="middleTouchStart"
           class="middle"
      >
				<div class="middle-l" ref="middleL">
					<div class="cd-wrapper" ref="cdWrapper">
						<div class="cd">
							<img :src="currentSong.image" class="image">
						</div>
					</div>
					<div class="playing-lyric-wrapper">
						<div class="playing-lyric">{{playingLyricTxt}}</div>
					</div>
				</div>
				<scroll :data='currentLyric.lines' class="middle-r" ref='lyricList'>
					<div class="lyric-wrapper">
						<div v-if="currentLyric">
							<p :class="{'current':currentLineNum==index}" class="text" ref='lyricLine' v-for="(line,index) in currentLyric.lines">{{line.txt}}</p>
						</div>
					</div>
				</scroll>
			</div>
			<div class="bottom">
				<div class="dot-wrapper">
					<span class="dot"></span>
					<span class="dot"></span>
				</div>
				<div class="progress-wrapper">
					<span class="time time-l">{{format(currentTime)}}</span>
					<div class="progress-bar-wrapper">
						<progressbar :percent="percent" @progressChange="onprogressChange"></progressbar>
					</div>
					<span class="time time-r">{{format(currentSong.duration)}}</span>
				</div>
				<div class="operators">
					<!--<div class=" i-left">
						<i></i>
					</div>-->
					<div @click="prev" class="mus_icon i-left">
						<i class="icon-prev"></i>
					</div>
					<div class="mus_icon i-center">
						<i :class="playIcon" @click="togglePlaying"></i>
					</div>
					<div @click="next" class="mus_icon i-right">
						<i class="icon-next"></i>
					</div>

			          <div class="mus_icon">
			              <i :class="toggleFavoriteIcon(currentSong)" @click.stop="toggleFavorite(currentSong)" class="Collection"></i>
			          </div>
				</div>
			</div>
		</div>
		<div @click="open" class="mini-player" v-show="!fullScreen">
      <div class="icon">
        <img :class="cdCls" :src="currentSong.image" height="40" width="40">
      </div>
      <div class="text">
        <h2 class="name" v-html="currentSong.name"></h2>
        <p  class="desc" v-html="currentSong.singer"></p>
      </div>
      <progressBarCircle :percent="percent" :radius="radius" class="progressBar">
          <i
            :class="miniplayIcon"
            @click.stop="togglePlaying"
            class="icon-mini miniplay"
          >
          </i>
      </progressBarCircle>
      <div @click.stop="showPlaylist" class="control">
        <i class="icon-playlist" ></i>
      </div>
		</div>
    <playlist ref="playlist"></playlist>
		<audio :src="currentSong.url" @canplay="ready"
           @ended="endFun"
           @error="error"
           @timeupdate="updateTime"
           ref="audio"></audio>
	</div>
</template>

<script>
  import Vue from "vue";
	import scroll from "../scroll/scroll";
    import { mapActions } from 'vuex'
	import progressbar from "../progressBar/progressBar";
	import playlist from "../playlist/playlist";
	import progressBarCircle from "../progressBarCircle/progressBarCircle"
	import { getLyric } from "../../api/song";
	import { mapGetters, mapMutations } from 'vuex';
	import Lyric from "lyric-parser";
    import { player } from '../../api/song';
    import {playing} from "../../store/getters";
    import {playerMixin} from '../../common/js/mixin'
  // import {Song} from "../../common/js/song.js"
	export default {
		  mixins: [playerMixin],
	  // falg标记定义当前歌曲是否加载完成,防止用户快速点击报错
		data() {
			return {
				currentTime: 0,
				currentLyric: "",
				currentLineNum:0,
        touch:{},
        currentshow:'cd',
        playingLyricTxt:"",
        falg:false,
        radius: 32,
        showFlag:false
			}
		},
		computed: {
      cdCls() {
        return this.playing ? 'play' : 'play pause'
      },
	  playIcon() {
	 	return this.playing ? "iconpause" : "iconplay"
	  },
      miniplayIcon(){
        return this.playing ? "minipause" : "miniplay"
      },
			percent() {
				return this.currentTime / this.currentSong.duration;
			},
			...mapGetters([
				'fullScreen',
				'playlist',
				'currentSong',
				"playing",
        		'currentIndex'
			])
		},
		methods: {
			back() {
				this.setFullScreen(false);

			},
      ready(){
			    if(!this.$refs.audio.src){
            this.setPlaying(false)
          }else {
            this.setPlaying(true);
            this.falg=true;
          }
          this.falg=true;
          if(this.playing){

            this.$refs.audio.play()
          }
          this.savePlayHistory(this.currentSong)
      },
      showPlaylist(){
			  this.$refs.playlist.show()
      },
			open() {
				this.setFullScreen(true)
			},
      prev(){
			  if(!this.falg){
			    return
        }
        this.currentIndex==0?this.setCurrentIndex(this.playlist.length-1):this.setCurrentIndex(this.currentIndex-1)
      },
      next(){
			  if(!this.falg){
			    return
        }
        this.currentIndex==this.playlist.length-1?this.setCurrentIndex(0):this.setCurrentIndex(this.currentIndex+1)

        this.falg=false;
      },
      endFun(){
			  this.next()
      },
      error(){
			  this.flag=true;
      },
      middleTouchStart(e){
			    this.touch.initated=true;
          this.touch.startX = e.touches[0].pageX;
			    this.touch.startY=e.touches[0].pageY;
			    this.touch.windowWidth=window.innerWidth;
      },
      middleTouchMove(e){
        const deltaX = e.touches[0].pageX - this.touch.startX;
        const deltaY = e.touches[0].pageY - this.touch.startY;
			  if(Math.abs(deltaX)<Math.abs(deltaY)){
			     return false;
        }
        const left =this.currentshow=="cd"?0:-window.innerWidth;
        const offsetWidth =  Math.min(Math.max(-this.touch.windowWidth, deltaX+left),0);
        this.touch.percent = Math.abs(offsetWidth / this.touch.windowWidth)
        this.$refs.lyricList.$el.style["transform"] = "translate3d("+offsetWidth+"px,0,0)";
			  this.$refs.middleL.style.opacity=1-this.touch.percent;
      },
      middleTouchEnd(e){
			  this.touch.initated=false;
			  let offsetWidth=0;
			  let opacity=0;
			  // 判断在cd界面还是歌词界面
			  if(this.currentshow=="cd"){
			    // 在cd界面画面不动
            if(this.touch.percent>0.1){
              offsetWidth=-window.innerWidth;
              opacity=0;
              this.currentshow = 'lyric'
            }else {
              offsetWidth=0;
              opacity=1;
            }
        }else{
          if(this.touch.percent < 0.9){
            offsetWidth = 0;
            this.currentshow = 'cd'
            opacity = 1;
          }else{
            offsetWidth = -this.touch.windowWidth;
            opacity = 0;
          }
        }
        this.$refs.lyricList.$el.style["transform"] = "translate3d("+offsetWidth+"px,0,0)";
        this.$refs.middleL.style.opacity=1-this.touch.percent;
      },
			togglePlaying() {
				  this.setPlaying(!this.playing);
          if(this.currentLyric){
            // this.currentLyric.togglePlay();
          }
			},
			updateTime(e) {
				this.currentTime = e.target.currentTime
			},
			format(interval) {
				interval = interval | 0;
				const minute = interval / 60 | 0;
				const second = this._pad(interval % 60);
				return minute + " : " + second
			},
			_pad(num, n = 2) {
				let len = num.toString().length
				while(len < n) {
					num = '0' + num
					len++
				}
				return num
			},
			onprogressChange(percent) {
				const currentTime = this.currentSong.duration * percent;
				this.$refs.audio.currentTime = currentTime;
				if(this.currentLyric){
				  this.currentLyric.seek(currentTime*1000)
        }
				this.setPlaying(true)
			},
			getLyric() {
				this.currentSong.getLyric().then((lyric) => {
					this.currentLyric = new Lyric(lyric,this.handleLyric);
					// if(this.playing&&this.falg){
            this.currentLyric.play();
          // }
				})
			},
      getCurrentSongUrl(){

            const _playList=this.playlist;
			      player(this.currentSong.mid).then((response)=>{
			        let item =response.data.items[0];
              let url="";
              if(!this.currentSong.url){
                url = "http://dl.stream.qqmusic.qq.com/" + item.filename + "?vkey=" + item.vkey + "&guid=7661965632&uin=0&fromtag=66";
                _playList[this.currentIndex].url = url;
                // console.log("获取到新歌歌词")
              }
              this.setPlayList(_playList)
              this.setPlaying(true);
            })
      },
			handleLyric({lineNum,txt}){
				this.currentLineNum=lineNum;
				if(lineNum>5){
					this.$refs.lyricList.scrollToElement(this.$refs.lyricLine[lineNum-5],1000)
				}else{
					this.$refs.lyricList.scrollTo(0,0,1000)
				}
				this.playingLyricTxt=txt;
				// console.log("歌词打印")
        // console.log(this.playingLyricTxt)
			},
      ...mapActions([
        'selectplay',
        "savePlayHistory"
      ]),
			...mapMutations({
				setFullScreen: "SET_FULLSCREEN",
				setPlaying: "SET_PLAYING",
        setCurrentIndex:"SET_CURRENTINDEX",
        setPlayList:"SET_PLAYLIST",

			})
		},
		watch: {
      currentSong() {
          if(this.currentLyric){/*处理切换歌词的时候清空记录*/
            this.currentLyric.stop();
          }
          // console.log('歌曲发生变化')
          // console.log('this.playing==='+this.playing)
          this.getCurrentSongUrl();
					this.getLyric();
					// console.log("歌曲发生变化之后falg的值==="+this.falg)
          // this.currentLyric.play()
			},
			playing(newPlay) {
        // console.log("--------监控playing变化----------");
        // console.log(newPlay)
				const audio = this.$refs.audio;
				this.$nextTick(() => {
					newPlay ? audio.play() : audio.pause();
				})
			}
		},
		components: {
			progressbar,
      progressBarCircle,
			scroll,
      playlist
		}
	}
</script>

<style>
	.player .normal-player {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 150;
		background: #2C3E50;
		color: yellow;
	}

	.background {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
		opacity: 0.6;
		filter: blur(10px);
	}

	.top {
		position: relative;
		margin-bottom: 25px;
	}

	.back {
		position: absolute;
		top: 0;
		left: 6px;
		z-index: 50;
	}

	.icon-back {
		display: block;
		/*padding: 9px;*/
    margin: 10px;
		width: 20px;
    height: 20px;
		color: #fff;
    background: url("../../common/images/jiantou.png") no-repeat center;
    background-size: cover;
		transform: rotate(-90deg);
	}

	.top>.title {
		width: 70%;
		margin: 0 auto;
		line-height: 40px;
		text-align: center;
		font-size: 14px;
		color: yellow;
	}

	.subtitle {
		line-height: 20px;
		text-align: center;
		font-size: 14px;
		color: yellow;
	}

	.middle {
		position: fixed;
		width: 100%;
		top: 80px;
		bottom: 170px;
		white-space: nowrap;
		font-size: 0;
		overflow: hidden;
	}

	.middle-l {
		display: inline-block;
		vertical-align: top;
		position: relative;
		width: 100%;
		height: 0;
		padding-top: 80%;
	}
	.middle-r{
		 	display: inline-block;
          vertical-align: top;
          width: 100%;
          height: 100%;
          overflow: hidden;
	}
	.cd-wrapper {
		position: absolute;
		left: 10%;
		top: 0;
		width: 80%;
		height: 100%;
	}

	.cd {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		border: 10px solid rgba(255, 255, 255, 0.1);
		border-radius: 50%;
	}
	.iconplay{
		background: url("../../common/images/play.png") center no-repeat;
		background-size: cover;
	}
  .miniplay{
  background: url("../../common/images/playB.png") center no-repeat;
  background-size: cover;
}
	.iconpause {
		background: url("../../common/images/pause.png") center no-repeat;
		background-size: cover;
	}
  .minipause{
    background: url("../../common/images/pauseB.png") center no-repeat;
    background-size: cover;
  }
	.cd .play {
		animation: rotate 20s linear infinite;
	}

	.cd .pause {
		animation-play-state: paused;
	}

	.image {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}

	.playing-lyric-wrapper {
		width: 80%;
		margin: 30px auto 0 auto;
		overflow: hidden;
		text-align: center;
	}

	.playing-lyric {
		height: 20px;
		line-height: 20px;
		font-size: 14px;
		color: yellow;
	}

	.bottom {
		position: absolute;
		bottom: 50px;
		width: 100%;
	}

	.dot-wrapper {
		text-align: center;
		font-size: 0;
	}

	.dot {
		display: inline-block;
		vertical-align: middle;
		margin: 0 4px;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: #2C3E50;
	}

	.dot .active {
		width: 20px;
		border-radius: 5px;
		background: #2C3E50;
	}

	.progress-wrapper {
		display: flex;
		align-items: center;
		width: 80%;
		margin: 0px auto;
		padding: 10px 0;
	}

	.time {
		color: yellow;
		font-size: 8px;
		/*flex: 0 0 30px;*/
		line-height: 30px;
		/*width: 30px;*/
	}

	.time.time-l {
		text-align: left;
		color: yellow;
	}

	.time.time-r {
		text-align: right;
	}

	.progress-bar-wrapper {
		flex: 1;
		margin: 0 20px;
	}

	.operators {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 40px;
		text-align: center;
	}

	.mus_icon {
		flex: 1;
		color: yellow;
	}

	.mus_icon .disable {
		color: yellow;
	}

	.mus_icon .disable i {
		font-size: 30px
	}
	/*.i-left {
		text-align: right;
	}

	.i-center {
		text-align: center;
	}

	.i-center i {
		font-size: 40px;
		padding: 20px;
		background: red;
	}*/

	.i-right {
		text-align: left;
	}

	.icon-favorite {
		color: yellow;
	}

	icon-favorite.normal-enter-active,
	icon-favorite.normal-leave-active {
		transition: all 0.4s;
	}

	.top,
	.bottom {
		transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
	}
	.mini-player {
		display: flex;
		align-items: center;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 180;
		width: 100%;
		height: 60px;
		background: #2C3E50;
    border-top: 1px solid #1C5E50;
	}
	.mini-player.mini-enter-active,
	.mini-player.mini-leave-active {
		transition: all 0.4s;
	}
	.mini-player.mini-enter
	&.mini-leave-to {
		opacity: 0;
	}
.mini-player .icon{
  width: 40px;
  height: 40px;
  margin-left: 20px;
}
	.mus_icon {
		flex: 0 0 40px;
		width: 40px;
		padding: 0 10px 0 20px;
	}

	img {
		border-radius: 50%;
	}

	img .play {
		animation: rotate 10s linear infinite;
	}

	img .pause {
		animation-play-state: paused;
	}

  .mini-player .text {
		display: flex;
		flex-direction: column;
		justify-content: center;
		flex: 1;
		line-height: 20px;
    text-align: left;
		overflow: hidden;
    padding-left: 20px;
    box-sizing: border-box;
	}

  .mini-player .text>.name {
		margin-bottom: 2px;
		font-size: 16px;
		color: #fff;
	}

	.desc {
		font-size: 14px;
		color:#fff;
	}

	.control {
		flex: 0 0 30px;
		width: 30px;
		padding: 0 10px;
	}

	.icon-play-mini,
	.icon-pause-mini,
	.icon-playlist {
		font-size: 30px;
		color: yellow;
	}



	.mus_icon {
		display: inline-block;
		width: 40px;
		height: 40px;
	}

	.mus_icon i {
		display: inline-block;
		width: 100%;
		height: 100%;
		/*background: red;*/
	}

	/*@keyframes rotate 0% transform: rotate(0) 100% transform: rotate(360deg) .middle-r {*/
		/*display: inline-block;*/
		/*vertical-align: top;*/
		/*width: 100%;*/
		/*height: 100%;*/
		/*overflow: hidden;*/
	/*}*/

	.lyric-wrapper {
		width: 80%;
		margin: 0 auto;
		overflow: hidden;
		text-align: center;
	}

	.lyric-wrapper .text {
		line-height: 32px;
		color: yellow;
		font-size: 16px;
    text-align: center;
	}

	.text.current {
		color: #fff;
	}
  .icon-prev{
    background: url("../../common/images/prve.png") center no-repeat;
    background-size: cover;
  }

  .icon-next{
    background: url("../../common/images/next.png") center no-repeat;
    background-size: cover;
  }
.icon-playlist {
  width: 30px;
  height: 30px;
  border-radius: 10px;
  -webkit-border-radius: 10px;
  overflow:hidden;
  display:inline-block;
  background: url("../../common/images/listIcon.png") no-repeat center;
  background-size: cover;
}
  .progressBar i{
    font-size: 32px;
    position: absolute;
    left: 50%;
    top: 50%;
    width:25px;
    height: 25px;
    border-radius: 50%;
    -webkit-border-radius: 50%;
    transform: translate(-50%,-50%);
  }
.icon-favorite{
  background: url("../../common/images/icon-favorite.png") no-repeat center;
  background-size: cover;
}
.icon-not-favorite{
  background: url("../../common/images/icon-not-favorite.png") no-repeat center;
  background-size: cover;
}

</style>
