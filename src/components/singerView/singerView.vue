<template>
  <scroll
    :listenScroll="listenScroll"
    :probeType="probeType"
    :singerList="singerList"
    @scroll=scroll
    class="singerCon"
    ref="listview">
    <!--<listview :singerList="singerList" ></listview>-->
    <ul :singerList="singerList" class="singerUl">
      <li
        class="singerLi"
        ref="listGroup"
        v-for="groups in singerList">
        <h2 class="singerListTittle">{{groups.tittle}}</h2>
        <ul>
          <li @click="selectItem(item)"
              class="musicList_LI clearfix"
              v-for="item in groups.items">
            <img class="musicListImg fl" v-lazy=item.avatar>
            <span class="musicListSpan fl">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div
      @touchmove.stop.prevent="onShortcutTouchMove"
      @touchstart="onShortcutTouchStart"
      class="LetterListDiv">
      <ul>
        <li :class="{'current':currentIndex===index}" :data-index="index" class="LetterListLi" v-for="(item,index) in LetterList">
          {{item}}
        </li>
      </ul>
    </div>
    <div class="fixedTop" ref="fixed" v-show="fixedP">
      <p class="fixedP">{{fixedP}}</p>
    </div>
  </scroll>
</template>

<script>
  import { getData } from "../../common/js/dom";
  import listview from "../listview/listview";
  import Scroll from "../scroll/scroll";
  import {miniPlayerShow} from '../../common/js/mixin';
  import {mapGetters} from 'vuex';
  const ANCHOR_HEIGHT = 16;
  const FIXEDTOP=36;
    export default {
      mixins: [miniPlayerShow],
      name: "singerView",
      data(){
        return{
          scrollY: -1,
          currentIndex: 0,
          diff:-1
        }
      },
      created() {
        this.touch = {};
        this.probeType = 3;
        this.listHeight = [];
        this.listenScroll = true;;
        setTimeout(() => {
          this._calculateHeight()
        }, 2000)
      },
      props:{
        singerList:{
          type:Array,
          default:[]
        },
        LetterList:{
          type:Array,
          default:[]
        }
      },
      computed:{
        fixedP(){
          if(this.scrollY>0){
            return ''
          }
          return this.LetterList[this.currentIndex]?this.LetterList[this.currentIndex]:"";
        },
        ...mapGetters(
          [
            'fullScreen'
          ]
        )
      },
      methods:{
        selectItem(item){
          this.$emit('select',item);
        },
        handlePlaylist(fullScreen){
          const bottomX=!this.fullScreen?"60px":"0px";
          // this.$refs.listview.$el.style.bottom = bottomX;
          // console.log("list重新计算")
          this.$refs.listview.refresh()
        },
        _calculateHeight() {
          this.listHeight = [];
          let Hlist = this.$refs.listGroup;
          let Height = 0;
          this.listHeight.push(Height)
          for(var i = 0; i < Hlist.length; i++) {
            this.listHeight.push(Height += Hlist[i].clientHeight)
          }
        },
        onShortcutTouchStart(e) {
          let startIndex = getData(e.target, "index");
          this.currentIndex = startIndex;
          let firstTouch = e.touches[0];
          this.touch.y1 = firstTouch.pageY;
          this.touch.index = startIndex;
          this._scrollTo(startIndex)
        },
        scroll(pos) {
          this.scrollY = pos.y;
        },
        _scrollTo(index) {
          //处理右侧滑动列表超出边界
          if(!index && index !== 0) {
            return
          }
          if(index < 0) {
            index = 0
          } else if(index > this.listHeight.length - 2) {
            index = this.listHeight.length - 2
          }
          //右侧点击高亮,根据scrollY 进行判断
          this.scrollY = -this.listHeight[index]
          this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)

        },
        onShortcutTouchMove(e) {
          let lastTouch = e.touches[0];
          this.touch.y2 = lastTouch.pageY;
          let late = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0;
          let lastIndex = parseInt(this.touch.index) + late;
          this._scrollTo(lastIndex)
        }
      },
      components: {
        // listview,
        Scroll
      },
      watch: {
        data() {
          setTimeout(() => {
            this._calculateHeight()
          }, 20)
        },
        scrollY(newY) {
          let listheight = this.listHeight;
          if(newY > 0) {
            this.currentIndex = 0;
            return
          }
          for(var i = 0; i < listheight.length; i++) {
            let height1 = listheight[i];
            let height2 = listheight[i + 1];
            this.diff=newY+height2;
            if(-newY >= height1 && -newY < height2) {
              this.currentIndex = i;
              return;
            }
          }
          this.currentIndex = listheight.length - 1;
        },
        diff(newVal){
          let fixedTop=(newVal>0&&newVal<FIXEDTOP)?newVal-FIXEDTOP:0;
          this.$refs.fixed.style.transform = "translate3d(0,"+fixedTop+"px,0)"
        }
      }
    }
</script>

<style scoped>

  .fixedTop{
    position: absolute;
    top: 0;
    background: #2C3E50;
    z-index: 10;
    width: 100%;
  }
  .fixedP{
    line-height: 36px;
    text-align: left;
    color: yellow;
    padding-left: 30px;
    box-sizing: border-box;
  }
  .LetterListLi {
    color: #fff;
  }

  .current {
    color: #FFFF00;
  }

  .singerCon {
    position: relative;
    background: #2C3E50;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .LetterListDiv {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  .singerUl {
    background: #2C3E50;
  }

  .musicList_LI {
    height: 60px;
  }

  .singerLi p {
    line-height: 20px;
    height: 20px;
    color: #FFF;
    text-align: center;
  }

  .musicListImg {
    display: inline-block;
    width: 30px;
    height: 30px;
  }

  .musicListSpan {
    color: #FFF;
  }

  .musicList_LI {
    padding-left: 30px;
    box-sizing: border-box;
    display: flex;
    /*justify-content:center;*/
    align-items: center;
  }

  .musicListImg {
    margin-right: 30px;
  }

  .singerListTittle {
    color: yellow;
    /*background: #2C3E50;*/
    padding: 10px 0;
    text-align: left;
    padding-left: 30px;
    box-sizing: border-box;
  }

  .LetterListDiv {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
</style>
