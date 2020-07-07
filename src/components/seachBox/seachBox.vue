<template>
	<div class="searchBox">
		<i class="icon_search"></i>
		<input :placeholder=placeholder class="input" ref="inputquery" v-model="query" />
		<i @click="clearQuery" class="icon_del" v-show="query">X</i>
	</div>
</template>

<script>
  import { DelayedLoading } from "../../common/js/util.js";
	export default{
		data(){
			return {
        query:""
			}
		},
		methods:{
			setQuery(query){
				this.query=query;
			},
			clearQuery(){
				this.query="";
			},
      blur(){
        this.$refs.inputquery.blur()
      }
		},
		watch:{
			query(newQuery){
        DelayedLoading(this.$emit("query",newQuery),300)
			}
		},
		props:{
			placeholder:{
				type:String,
				default:"请输入搜索内容"
			}
		}
	}
</script>

<style>
	.searchBox{
		display: flex;
	    align-items: center;
	    box-sizing: border-box;
	    width: 100%;
	    padding: 0 6px;
	    height: 40px;
	    background:#2C3E50;
	    justify-content: center;
	    /*border-radius: 6px;*/
	   position: relative;
	}
	.searchBox .input{
	/*flex: 1;*/
      /*margin: 0 5px;*/
      line-height: 30px;
      background:#2C3E50;
      width: 90%;
      color:#fff;
      font-size: 14px;
	}
	/*input:placeholder{
		  color: #fff;
	}*/
      .icon_del{
      	position: absolute;
      	right: 10%;
      	top:50%;
      	transform: translateY(-50%);
      	color: #fff;
      	display: inline-block;
      	width: 10px;
      	height: 10px;
      	text-align: center;
      	line-height: 10px;
      }
</style>
