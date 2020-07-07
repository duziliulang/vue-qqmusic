import {searchHistory} from "../../store/getters";
<template>
	<div class="search">
    <el-table
    :data="tableData"
    @select-all="handleCurrentChange"
    @selection-change="handleSelectionChange"
    ref="multipleTable"
    style="width: 100%"
    tooltip-effect="dark">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="日期"
      width="120">
      <template slot-scope="scope">{{ scope.row.date }}</template>
    </el-table-column>
    <el-table-column
      label="姓名"
      prop="name"
      width="120">
    </el-table-column>
    <el-table-column
      label="地址"
      prop="address"
      show-overflow-tooltip>
    </el-table-column>
  </el-table>
<!--		<div>-->
<!--			<searchbox ref="searchBox" @query="onQueryChange" class="searchBox" :query="query"></searchbox>-->
<!--		</div>-->
<!--    <div class="shortcut-wrapper" ref="shortcutwrapper">-->
<!--        <Scroll ref="scroll" :concat="concat"  class="shortcut">-->
<!--            <div ref="scrolldiv">-->
<!--                <div class="searchModel" v-show="!query" ref="searchModel">-->
<!--                  <h1>热门搜索</h1>-->
<!--                  <ul>-->
<!--                    <li v-for="item in hotKey" class="hotLi" @click="SetQuery(item.k)" >-->
<!--                      <span>{{item.k}}</span>-->
<!--                    </li>-->
<!--                  </ul>-->
<!--                </div>-->
<!--                <div class="search-history" v-show="searchHistory.length" ref="searchHistory">-->
<!--                  <h1 class="title">-->
<!--                    <span class="text">搜索历史</span>-->
<!--                    <span  class="clear" @click.stop="deleteAllHistory">-->
<!--                          <i class="icon-clear"></i>-->
<!--                  </span>-->
<!--                  </h1>-->
<!--                  <searchHistoryList-->
<!--                    :searchHistory="searchHistory"-->
<!--                    @select="selectLi"-->
<!--                    @colseHistorageLi="colseHistorageLi"-->
<!--                  ></searchHistoryList>-->
<!--                </div>-->
<!--            </div>-->
<!--        </Scroll>-->
<!--    </div>-->

<!--		<div class="searchResult" v-show="query">-->
<!--			<suggest-->
<!--        :query="query"-->
<!--        v-show="query"-->
<!--        @listScroll="blurInput"-->
<!--        @savesearch="savesearch"-->
<!--      ></suggest>-->
<!--		</div>-->
	</div>
</template>
<script>
	import searchbox from "../seachBox/seachBox";
	import suggest from "../suggest/suggest";
	import { getHotKey} from "../../api/search";
  import searchHistoryList from "../searchHistoryList/searchHistoryList";
  import {mapActions,mapGetters} from 'vuex';
  import Scroll from "../scroll/scroll";
  import {miniPlayerShow} from '../../common/js/mixin'
	export default{
    mixins: [miniPlayerShow],
		data(){
			return{
        allSelect:false,
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
				hotKey:[],
				query:"",
        showResult:false
			}
		},
		created(){
			this._getHotKey();
		},
    computed:{
		  concat(){
		        // 因为scroll组件下面两个元素是异步加载，高度不确定所以需要重新计算高度并赋值

          let arr= this.hotKey.concat(this.searchHistory);
          setTimeout(()=>{
            this.$refs.scroll.refresh()
          },3000)
          return arr;
      },
      ...mapGetters([
        "searchHistory"
      ])
    },
    watch:{
		  query(){
		    setTimeout(()=>{
		      this.$refs.scroll.refresh()
        },3000)
      }
    },
		methods:{
      handleCurrentChange(row){
        console.log('----row, event, column')
        console.log(row)
        console.log(row.length)

      },
      toggleSelect(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row, !this.allSelect)
          })
          this.allSelect = !this.allSelect
        }
      },
       handleSelectionChange(val) {
        console.log('--------------val')
        console.log(val)
        // this.multipleSelection = val;
      },

      handlePlaylist(fullScreen){
        // console.log("排行榜  页面")
        const bottomX=!this.fullScreen?"60px":"0px";
        this.$refs.shortcutwrapper.style.bottom = bottomX
        this.$refs.scroll.refresh()
      },
			_getHotKey(){
				getHotKey().then((res)=>{
					if(res.code==0){
						this.hotKey=res.data.hotkey.slice(0, 15);
					}
				})
			},
      savesearch(item){
          this.saveSearchHistory(item)
      },
      blurInput(){
        this.$refs.searchBox.blur()
      },
      colseHistorageLi(item){
			    this.deletaHistoryOne(item)
      },
			onQueryChange(Query){
				this.query=Query
			},
      SetQuery(newQuery){
				this.$refs.searchBox.setQuery(newQuery)
			},

      selectLi(item){
          this.query=item.name;
      },
      deleteAllHistory(){
			  this.deleteHistoryAll()
      },

      ...mapActions([
        "saveSearchHistory",
        "deletaHistoryOne",
        "deleteHistoryAll"
      ])
		},
		components:{
			// searchbox,
			// suggest,
      // searchHistoryList,
      // Scroll
		}
	}
</script>
<style>
	.searchResult{
		position: fixed;
		width: 100%;
		height: 100%;
		background: #2C3E50;
		overflow: hidden;
		top:120px;
		bottom:0;
	}
	.search{
		background: #2C3E50;
		height: 100%;
		position: fixed;
		width: 100%;
		top: 80px;
		bottom: 0;
	}
  .shortcut-wrapper{
    position: fixed;
    top: 118px;
    bottom: 0;
    width: 100%;
  }
	h1{
		padding: 10px 0;
		color: #fff;
	}
	.hotLi{
    display: inline-block;
    padding: 5px 10px;
    margin: 0 20px 10px 0;
    border-radius: 6px;
    background: #2C3E50;
    font-size: 14px;
    color: #fff;
	}
  .search-history{
    position: relative;
    margin: 0 20px;
  }
  .title{
    display: flex;
    align-items: center;
    height: 40px;
    font-size: 16px;
    color:  #ffff99;
  }
  .text{
    flex: 1;
  }
  .icon-clear{
    font-size: 16px;
    color: #ffff99;
  }

  .recommend-content{
    height: 100%;
    overflow: hidden;
    /*margin-bottom:1500px;*/
  }
  .icon-clear{
    width: 20px;
    height: 20px;
    display: inline-block;
    font-size: 16px;
    color: yellow;
    background: url("../../common/images/delbtn.png") center no-repeat;
    background-size: cover;
    vertical-align: middle;
  }

  .shortcut{
    height: 100%;
    overflow: hidden;
  }
</style>
