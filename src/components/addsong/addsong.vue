<template>
    <div @click.stop class="add-song" v-show="showF">
        <div class="header">
            <h1 class="tittle">添加歌曲列表</h1>
            <div @click="hide" class="close">
              <i class="icon-close"></i>
            </div>
        </div>
      <div class="search-box-wrapper">
          <seachBox :query="query" @query="onQueryChange" class="searchBox" placeholder="搜索歌曲" ref="searchBox" ></seachBox>
      </div>
      <div class="shortcut" v-show="!query">
            <switches :currentIndex="currentIndex" :switches="switches" @switch="switchItem"></switches>
            <div class="list-wrapper">
              <scroll  :data="playHistory" class="list-scroll" ref="songList" v-if="currentIndex===0">
                  <div class="list-inner">
                      <songlist :songs="playHistory" ></songlist>
                  </div>
              </scroll>
              <scroll :data="searchHistory" class="list-scroll" v-if="currentIndex===1">
                  <div class="list-inner">
                    <searchHistoryList :searchHistory="searchHistory"></searchHistoryList>
                  </div>
              </scroll>
            </div>
      </div>
      <div class="search-result" v-show="query" >
        <suggest
          :query="query"
          @listScroll="blurInput"
          @savesearch="savesearch"
          v-show="query"
        ></suggest>
      </div>
    </div>
</template>
<script>
  import  seachBox from "../seachBox/seachBox"
  import  switches from "../switches/switches"
  import  songlist from "../songlist/songlist"
  import suggest from "../suggest/suggest";
  import  searchHistoryList from "../searchHistoryList/searchHistoryList"
  import  {mapGetters,mapActions} from  "vuex"
  import scroll from "../scroll/scroll";
    export default {
        name: "addsong",
        data(){
          return {
            showF:false,
            currentIndex:0,
            query:'',
            switches:[
              {
                name:"最近播放"
              },
              {
                name:"搜索历史"
              }
            ]
          }
        },
      computed:{
        ...mapGetters([
          "playHistory",
          "searchHistory"
        ])
      },
        methods:{
          show(){
            this.showF=true;
            setTimeout(()=>{
              this.$refs.songList.refresh()
            },1000)
          },
          savesearch(item){
            this.saveSearchHistory(item)
          },
          blurInput(){
            this.$refs.searchBox.blur()
          },
          onQueryChange(Query){
            this.query=Query
          },
          switchItem(index){
            console.log("index==="+index)
              this.currentIndex=index
          },
          selectSuggest() {
            this.$refs.topTip.show()
            this.saveSearch()
          },
          hide(){
            this.showF=false;
          },
          ...mapActions([
            "saveSearchHistory"
            // "deletaHistoryOne",
            // "deleteHistoryAll"
          ])
        },
      components:{
        seachBox,
        switches,
        songlist,
        scroll,
        searchHistoryList,
        suggest
      }
    }
</script>

<style scoped>
  .add-song{
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    z-index: 200;
    background: #2C3E50;
  }

  .add-song.slide-enter-active, .add-song.slide-leave-active{
    transition: all 0.3s;
  }
  .add-song.slide-enter,.add-song.slide-leave-to{
    transform: translate3d(100%, 0, 0);
  }
  .header{
    position: relative;
    height: 44px;
    text-align: center;
  }

  .title{
    line-height: 44px;
    font-size: 16px;
    color: #fff;
  }
  .title .close{
    position: absolute;
    top: 0;
    right: 8px;
  }
  .close .icon-close{
    display: block;
    padding: 12px;
    font-size: 20px;
    color: #fff;
  }
  .search-box-wrapper{
    margin:20px 0 ;
  }

  .shortcut .list-wrapper{
    position: absolute;
    top: 165px;
    bottom: 0;
    width: 100%;
  }


  .list-scroll{
    height: 100%;
    overflow: hidden;
  }

  .list-inner{
    padding: 20px 30px;
  }

  .search-result{
    position: fixed;
    top: 124px;
    bottom: 0;
    width: 100%;
    /*z-index: 200;*/
    /*background: #2C3E50;*/
  }

  .tip-title{
    text-align: center;
    padding: 18px 0;
    font-size:14px;
  }

  .icon-ok{
    font-size:14px;
    color: #fff;
    margin-right: 4px;
  }

  .text{
    font-size:14px;
    color: #fff;
  }

</style>
