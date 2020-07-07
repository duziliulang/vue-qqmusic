<template>
	<div class="Recommend" ref="Recommend">
    <el-input @keydown.native="onkeydown($event.target)" placeholder="请输入内容" v-model="input"></el-input>
<!--		<scroll ref="scroll" :data="disclist"  class="recommend-content">-->
<!--			<div>-->
<!--		        <div v-if="bannerList.length" class="slider-wrapper" ref="sliderWrapper">-->
<!--		          <slider>-->
<!--		            <div v-for="item in bannerList">-->
<!--		              <a :href="item.linkUrl">-->
<!--		                <img class="needsclick"  :src="item.picUrl"  @load="loadImage">-->
<!--		              </a>-->
<!--		            </div>-->
<!--		          </slider>-->
<!--		        </div>-->
<!--				<div class="RecommendList">-->
<!--					<h1 class="listTittle">热门歌单推荐</h1>-->
<!--					<ul>-->
<!--						<li v-for="item in disclist" class="item" @click="setItem(item)">-->
<!--							<div class="discIcon">-->
<!--								<img v-lazy=item.imgurl class="discIconIMG">-->
<!--							</div>-->
<!--							<div class="text">-->
<!--								<h2 class="name" v-html="item.creator.name"></h2>-->
<!--								<p class="desc" v-html="item.dissname"></p>-->
<!--							</div>-->
<!--						</li>-->
<!--					</ul>-->
<!--				</div>-->
<!--			</div>-->
<!--		</scroll>-->
		<router-view></router-view>
	</div>
</template>
<script>
	const singerLen = 10;
	const siggerHot = "热门";
	import Scroll from "../scroll/scroll";
	import { getSingerList } from "../../api/singer";
	import { ERROK } from "../../api/api";
	import Singer from "../../common/js/sigger";
	import { getRecommend, getDiscList } from "../../api/recommend";
	import slider from "../banner/banner";
	import listview from "../listview/listview";
	import {mapMutations} from "vuex"
  import {miniPlayerShow} from '../../common/js/mixin'
//	import banner from "../../common/js/banner"
	export default {
    mixins: [miniPlayerShow],
		data() {
			return {
				singerList: [],
				disclist: [],
				bannerList:[],
        input:'input'
			}
		},
		created() {
			// this._getRecommend();
			// 	this._getDiscList();
		},
		mounted() {
			// this._getSingerList();
      this.quchong()
		},
		components: {
			listview,
			slider,
			Scroll
		},
		methods: {
      quchong(){

        var arr = [{
          "name": "aaa",
          "age":123
        }, {
          "name": "bbb",
          "age": 324
        }, {
          "name": "ccc",
          "age": 345
        }, {
          "name": "ddd",
          "age": 546
        },{
          "name": "bbdb",
          "age": 324
        }, {
          "name": "clcc",
          "age": 345
        }, {
          "name": "ddd",
          "age": 546
        }
        ];
        var hash = {};
        arr = arr.reduce(function(item, next) {
          hash[next.name] ? '' : hash[next.name] = true && item.push(next);
          return item
        }, [])
        console.log('去重结果')
        console.log(arr)
      },
      onkeydown(data){
        console.log('--------------data')
        console.log( typeof data.value)
        console.log(data.value)
        let reg = /^([1-9]\d{0,9}|0)([.]?|(\.\d+)?)$/g
        console.log(reg.test(data.value));
        let flag =reg.test(data.value)
        if(flag){

        }
      },
      handlePlaylist(fullScreen){
        const bottomX=!this.fullScreen?"60px":"0px";
        this.$refs.Recommend.style.bottom = bottomX
        // this.$refs.scroll.refresh()
      },
			setItem(item){
				console.log("item")
				console.log(item)
				this.$router.push({
					path:"/recommend/"+item.dissid
				})
				this.setDisc(item)
			},
			loadImage() {
		        if (!this.checkloaded) {
		          this.checkloaded = true
		          this.$refs.scroll.refresh()
		        }
		      },
			_getRecommend() {
				getRecommend().then((res) => {
					if(res.code == ERROK) {
						this.bannerList = res.data.slider;
					}
				})
			},
			_getSingerList() {
				getSingerList().then((res) => {
					if(res.code == ERROK) {
						this.singerList = this.classification(res.data.list);
					}
				})
			},
			_getDiscList() {
				getDiscList().then((res) => {
					if(res.code == 0) {
						this.disclist = res.data.list
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
				return hot.concat(ret)
			},
			...mapMutations({
		        setDisc: 'SET_DISC'
		    })
		}
	}
</script>
<style>
	.Recommend {
		position: absolute;
		width: 100%;
		top: 80px;
		bottom: 0;
		background: #2C3E50;
	}

	.slider-wrapper {
		 position: relative;
		width: 100%;
		overflow: hidden;
	}
	.recommend-content{
	   	height: 100%;
      	overflow: hidden;
      	/*margin-bottom:1500px;*/
	}

	/*.Recommend {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}*/
	/*.Recommend>div{
		height: 100%;
		overflow: hidden;
	}*/

	.RecommendList {}
	.discIconIMG{
		display: inline-block;
		width: 100%;
		width: 60px;
		height: 60px;
	}
	.listTittle {
		height: 65px;
		line-height: 65px;
		text-align: center;
		font-size: 14px;
		color: #fff;
		/*display: none;*/
	}

	.RecommendList .item {
		display: flex;
		box-sizing: border-box;
		align-items: center;
		padding: 0 20px 20px 20px;
	}

	.item .discIcon {
		flex: 0 0 60px;
		width: 60px;
		padding-right: 20px;
	}

	.item .text {
		display: flex;
		flex-direction: column;
		justify-content: center;
		flex: 1;
		line-height: 20px;
		overflow: hidden;
		font-size: 14px;
	}

	.text>.name {
		margin-bottom: 5px;
		color: #fff;
		text-align: left;
	}

	.text .desc {
		color: #fff;
		text-align: left;
	}
</style>
