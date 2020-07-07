<template>
  <div class="search-list" v-show="searchHistory.length">
    <!--<Scroll ref="scroll" :searchHistory="searchHistory"  class="recommend-content">-->
        <ul>
          <li  @click="selectLi(item)"  class="search-item" v-for="item in searchHistory">
            <span class="text">{{item.name}}</span>
            <span @click.stop="colseHistorageLi(item)">
              <i class="icon-delete"></i>
            </span>
          </li>
        </ul>
    <!--</Scroll>-->
  </div>
</template>
<script>
  // import Scroll from "../scroll/scroll";
    export default {
        name: "searchHistory",
        props:{
          searchHistory:{
            type:Array,
            default:[]
          }
        },
        methods:{
          selectLi(item){
            this.$emit("select",item)
          },
          colseHistorageLi(item){
            this.$emit("colseHistorageLi",item)
          }
        }
      // watch:{
      //   searchHistory(){
      //     this.$refs.scroll.refresh();
      //   }
      // }
    }
</script>

<style scoped>
  .search-list .search-item{
    display: flex;
    align-items: center;
    height: 40px;
    overflow: hidden;
  }
  .search-item.list-enter-active,.search-item.list-leave-active{
    transition: all 0.1s;
  }
  .search-item.list-enter,.search-item.list-leave-to{
    height: 0;
  }
 .search-item>.text{
    flex: 1;
    color:#fff;
   text-align: left;
   margin-left: 30px;
   font-size: 14px;
  }
  .icon-delete{
    width: 20px;
    height: 20px;
    display: inline-block;
    font-size:14px;
    color:  #fff;
    background: url("../../common/images/colse.png") center no-repeat;
    background-size: cover;
  }

</style>
