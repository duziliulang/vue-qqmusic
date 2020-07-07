<template>
    <div class="userCenter">
      <div class="backDiv">
        <span @click="back" class="backSpan"></span>
      </div>

      <switches :currentIndex="currentIndex" :switches="switches" @switch="switchItem"></switches>
      <div class="list-wrapper-user" ref="wrapperUser">
        <scroll
          :data="favoriteList"
          class="list-scroll"
          ref="songList"  v-if="currentIndex===0" >
          <div class="list-inner">
            <songlist :songs="favoriteList" @select="selectItem"></songlist>
          </div>
        </scroll>
        <scroll
          :data="playHistory"
          class="list-scroll"
          ref="songList"  v-if="currentIndex===1" >
          <div class="list-inner">
            <songlist :songs="playHistory" @select="selectItem"></songlist>
          </div>
        </scroll>
      </div>
    </div>
</template>

<script>
  import switches from "../switches/switches";
  import  songlist from "../songlist/songlist"
  import  {mapGetters,mapActions} from  "vuex";
  import { player } from '../../api/song'
  import scroll from "../scroll/scroll";
  import Song from '../../common/js/song'
  import {miniPlayerShow} from '../../common/js/mixin'
  // import  searchHistoryList from "../searchHistoryList/searchHistoryList"
    export default {
      name: "userCenter",
      mixins: [miniPlayerShow],
      data(){
        return{
          switches:[
            {
              name:"我喜欢的",
            },{
              name:"播放过的"
            }
          ],
          currentIndex:0
        }
      },
      computed:{
        ...mapGetters([
          "playHistory",
          'favoriteList'
        ])
      },
      methods:{
        ...mapActions([
          'selectplay',
          'insertSong'
        ]),
        handlePlaylist(fullScreen){
          console.log("排行榜  页面")
          const bottomX=!this.fullScreen?"60px":"0px";
          this.$refs.wrapperUser.style.bottom = bottomX
          this.$refs.songList.refresh()
        },
        back() {
          this.$router.back()
        },
        switchItem(index){
          this.currentIndex=index;
        },
        selectItem(song, index) {
          this.insertSong(new Song(song))
        }
      },
      components:{
        switches,
        songlist,
        scroll
      }
    }
</script>

<style scoped>
.userCenter{
  position: fixed;
  width: 100%;
  top: 0;
  bottom: 0;
  background: #2C3E50;
  z-index: 100;
}

.backDiv{
  width: 100%;
  height: 40px;
  position: relative;
}
.backSpan {
  position: absolute;
  left: 10px;
  top: 10px;
  width: 20px;
  height: 20px;
  text-align: center;
  /*line-height: 30px;*/
  color: yellow;
  z-index: 101;
  background: url("../../common/images/jiantou.png") no-repeat center;
  background-size: cover;
}
.list-wrapper-user{
  /*margin-top: 20px;*/
  position: absolute;
  top: 80px;
  bottom: 0;
  width: 100%;
}


.list-wrapper-user .list-scroll{
  height: 100%;
  overflow: hidden;
}

.list-wrapper-user .list-inner{
  padding: 20px 30px;
}
</style>
