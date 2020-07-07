<template>
    <div @click="hide" class="playlist" v-show="showFlag">
      <div @click.stop class="list-wrapper">
        <div class="list-header">
          <h1 class="title">
            <i class="iconMode"></i>
            <span class="text"></span>
            <span class="clear" ><i class="icon-clear"></i></span>
          </h1>
        </div>
        <!--<scroll :data='this.playlist' class="list-content-scroll" ref="contentScroll">-->
              <scroll  :playlist='playlist' class="list-content" ref="listContent">
                <ul>
                  <li :key="index" @click.stop="selectItem(index,item)" class="item" ref="listitem" v-for="(item,index) in this.playlist">
                    <i :class="{'icon-play':item.id==currentSong.id}" class="current" ></i>
                    <span class="text">{{item.name}}</span>
                    <span class="like">
                      <i ></i>
                    </span>
                    <i :class="toggleFavoriteIcon(item)" @click.stop="toggleFavorite(item)" class="Collection"></i>
                    <span  @click.stop="deleteListOne(item)"  class="delete">
                      <i class="icon-delete"></i>
                    </span>
                  </li>
                </ul>
              </scroll>
        <!--</scroll>-->
        <div class="list-operate">
          <div  class="add">
            <i class="icon-add"></i>
            <span @click="showAddSong" class="text">添加歌曲到队列</span>
          </div>
        </div>
        <div  class="list-close">
          <span @click="hide">关闭</span>
        </div>
      </div>
      <addsong ref="addsong"></addsong>
    </div>
</template>

<script >
  import  { mapGetters ,mapMutations,mapActions} from "vuex";
  import scroll from "../scroll/scroll";
  import addsong from "../addsong/addsong"
  import {playerMixin} from '../../common/js/mixin'
  export default  {
  	mixins: [playerMixin],
    data() {
      return {
        showFlag: false,
        reading:false
      }
    },
    computed:{
      ...mapGetters([
        "playlist",
        "currentSong"
      ])
    },
    methods:{
      hide(e){
        this.showFlag=false;
      },
      show(){
        this.showFlag=true;
        setTimeout(()=> {
          this.$refs.listContent.refresh();
          this.scrollToCurrent(this.currentSong)
        },100)
      },
      deleteListOne(item){
          this.deleteSong(item);
      },
      selectItem(index,item){
          this.setCurrentIndex(index)
      },
      scrollToCurrent(current){
          const index=this.playlist.findIndex(( song )=>{
            return song.id===current.id
          })
        console.log("index===="+index)
        this.$refs.listContent.scrollToElement(this.$refs.listitem[index],300)
      },
      showAddSong(){
          this.$refs.addsong.show()
      },
      ...mapMutations({
        setCurrentIndex:"SET_CURRENTINDEX"
      }),
      ...mapActions([
          "deleteSong"
      ])
    },
    watch:{
      currentSong(newsong,oldsong){
        if(!this.showFlag||newsong.id==oldsong.id){
          return
        }
        this.scrollToCurrent(newsong)
      }
    },
    components: {
      scroll,
      addsong
    }
  }
</script>

<style >
  .playlist{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 200;
    background-color: rgba(0,0,0,0.3);
  }

  .playlist.list-fade-enter-active, .playlist.list-fade-leave-active{
    transition: opacity 0.3s;
  }
    .list-wrapper{
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      background-color:#2C3E50;
    }

      .list-header{
        position: relative;
        padding: 20px 30px 10px 20px;
      }

        /*.title{*/
          /*display: flex;*/
          /*align-items: center;*/
        /*}*/

          .icon{
            margin-right: 10px;
            font-size: 30px;
            color:yellow;
          }

  .title .text{
            flex: 1;
            font-size: 14px;
            color: #fff;
          }

          .clear
            /*//extend-click()*/
            .clear .icon-clear{
              font-size: 14px;
              color:yellow;
            }

      .list-content{
        max-height: 240px;
        overflow: hidden;

      }

  .list-content .item{
          display: flex;
          align-items: center;
          height: 40px;
          padding: 0 30px 0 20px;
          border-bottom: 1px solid #cccccc;
          overflow: hidden;
        }

    .item.list-enter-active, .item.list-leave-active{
      transition: all 0.1s;
    }

    .item.list-enter, .item.list-leave-to{
      height: 0;
    }
  .list-content .current{
    flex: 0 0 20px;
    width: 20px;
    height: 20px;
    font-size:14px;
    color:yellow;
    border-radius: 50%;
    -webkit-border-radius: 50%;
  }
  .icon-play{
    background: url("../../common/images/musicIcon.png") center no-repeat;
    background-size:cover;
  }

  .like{
    margin-right: 15px;
    font-size:14px;
    color:yellow;
  }
  .icon-favorite{
    color: yellow;
  }
  .delete{
    font-size:14px;
    color: yellow;
  }
      .list-operate{
        width: 140px;
        margin: 20px auto 30px auto;
      }

        .add{
          display: flex;
          align-items: center;
          padding: 8px 16px;
          border: 1px solid yellow;
          border-radius: 100px;
          color:yellow;
        }
          .icon-add{
            margin-right: 5px;
            font-size: 14px;
          }
  .list-content .text{
            color: #fff;
            font-size: 14px;
            text-align: left;
            margin-left: 20px;
          }
      .list-close{
        text-align: center;
        line-height: 50px;
        background:rgba(255,255,255,0.5);
        font-size:14px;
        color: yellow;
      }
  .item .delete{
    display: inline-block;
    width: 20px;
    height: 20px;
    vertical-align: middle;
    background: url("../../common/images/colse.png") center no-repeat;
    background-size: cover;
    position: absolute;
    right:30px;
  }
.item .Collection {
    width: 20px;
    height: 20px;
    vertical-align: middle;
    position: absolute;
    right:70px;
}
  .add .text{
    margin-left: 0;
    font-size: 12px;
  }

</style>
