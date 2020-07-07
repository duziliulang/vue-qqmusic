<template>
	<div class="suggest">
		<scroll
      :beforeScroll="beforeScroll"
      :pullup="pullup"
      :suggestList="suggestList"
      @beforeScroll="listScroll"
      @scrollToEnd="scrollToEnd"
      class="suggestList"
      ref="suggestList">
				<ul>
					<li @click="setItem(item,index)" class="suggestLi" v-for="( item , index ) in suggestList">
						<div><i></i></div>
						<div>
							<p class="text" v-html="singerOrSongs(item)"></p>
						</div>
					</li>
				</ul>
		</scroll>
    <div class="no-result-wrapper" v-show="!suggestList.length">
      <noResult title="抱歉暂无搜索结果" ></noResult>
    </div>
		<!--<router-view></router-view>-->
	</div>
</template>
<script>
  import noResult from "../noResult/noResult"
	import {search} from "../../api/search";
	import {createSong} from "../../common/js/song.js";
	import Scroll from "../scroll/scroll";
  import {mapMutations} from 'vuex';
  import Singer from "../../common/js/sigger";
  import { player } from '../../api/song';
  import { mapActions } from 'vuex';
	const perpage=19;
	const Type_Singer="singer"
	export default{
		data(){
			return {
				suggestList:[],
				page:1,
        beforeScroll:true
			}
		},
		props:{
			query:{
				type:String,
				default:""
			},
			showSinger: {
		        type: Boolean,
		        default: true
		   	},
		   	pullup:{
		   		type:Boolean,
		   		default:true
		   	}
		},
		methods:{
      ...mapActions([
        'selectplay'
      ]),
			singerOrSongs(item){

				if(item.type===Type_Singer){
					return item.singername
				}else{
					return item.name+"-"+item.singer
				}
			},
      listScroll(){
          this.$emit("listScroll")
      },
			scrollToEnd(){
				this.page++;
				search(this.query,this.page,this.showSinger,perpage).then((res)=>{
						if(res.code==0){

							this.suggestList=this.suggestList.concat(this._RecombinationArr(res.data))


						}
				})
			},
			_search(){
				this.page=1;

				// console.log("开始执行搜搜")
				search(this.query,this.page,this.showSinger,perpage).then((res)=>{
          console.log("------------res-----------")
          console.log(res)
          console.log("------------res-----------")
						if(res.code==0){
							this.suggestList=this._RecombinationArr(res.data)
              // console.log("------------this.suggestList-----------")
              // console.log(this.suggestList)
              // console.log("------------this.this.suggestList-----------")
						}
				})
			},
      _RecombinationArr(data){
				let ret=[];
				// console.log("--------data-------------------------")
				// console.log(data)
				// console.log("--------data-------------------------")
				// if(data.zhida&&data.zhida.singerid){
				// 	ret.push({...data.zhida,...{type:Type_Singer}})
				// }
				if(data.song){
			// 	  console.log("888888888888888888888")
          // console.log(this._normalizeSongs(data.song.itemlist))
					ret = ret.concat(this._normalizeSongs(data.song.itemlist))
				}
        //
        // console.log("---------------ret------------------------------")
        // console.log(ret)
        // console.log("---------------ret------------------------------")
				return ret;
			},
      _normalizeSongs(list){
        let arr=[];
        console.log( list instanceof Array)
        // console.log("---------------list------------------------------")
        // console.log(list)
        // console.log("---------------list------------------------------")

        list.forEach((musicData)=>{
          if(musicData.id&&musicData.docid){
            // console.log("进入for循环")
            arr.push(createSong(musicData))
          }
        })
        console.log("---------------arr------------------------------")
        console.log(arr)
        console.log("---------------arr------------------------------")
        return arr;
      },
			setItem(song,index){
				if(song.type==Type_Singer){
					let singer=new Singer({
						id:song.singermid,
						name:song.singername
					})
				this.$router.push({
				      path: "/search/"+singer.singermid
				})
					this.setSinger(singer)
				}
				this.$emit("savesearch",song)
				// 点击的是歌曲
        let url = '';
        const that = this;
        player(song.mid).then((response) => {
          let item = response.data.items[0];
          if(!song.url) {
            url = "http://dl.stream.qqmusic.qq.com/" + item.filename + "?vkey=" + item.vkey + "&guid=7661965632&uin=0&fromtag=66";
            that.suggestList[index].url = url;
          }
          this.selectplay({
            list: this.suggestList,
            index: index
          })
        })
			},

			...mapMutations({
		        setSinger: 'SET_SINGER'
		    })

		},
		components:{
			Scroll,
      noResult
		},
		watch:{
			query(query){
				this._search(query)
			}

		}
	}
</script>

<style>
	.suggest{
		position: fixed;
	    top: 120px;
	    bottom: 0;
	    width: 100%;
	    background: #2C3E50;

	}
	.suggestLi .text{
		color:#696969;
		height: 30px;
		min-line-height: 30px;
	}
	.suggestLi{
		min-height: 30px;
		line-height: 30px;
	}
	.suggestList{
		height: 100%;
		overflow: hidden;
	}

  .no-result-wrapper{
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
</style>
