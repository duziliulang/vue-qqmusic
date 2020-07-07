import * as types from "./mutation_type.js"
const mutation = {
	[types.SET_SINGER](state,singer){
		state.singer=singer;
	},
	[types.SET_PLAYING](state,falg){
		state.playing=falg;
	},
	[types.SET_FULLSCREEN](state,falg){
		state.fullScreen=falg;
	},
	[types.SET_PLAYLIST](state,list){
		state.playlist=list;
	},
	[types.SET_SEQUENCELIST](state,list){
		state.sequenceList=list;
	},
	[types.SET_MODE](state,mode){
		state.mode=mode;
	},
	[types.SET_CURRENTINDEX](state,index){
		state.currentIndex=index;
	},
	[types.SET_TOP_LIST](state,toplist){
		state.topList=toplist;
	},
	[types.SET_DISC](state,disc){
		state.disc=disc
	},
  [types.SET_SEARCH_HISTORY](state,list){
    state.searchHistory=list;
  },
  [types.SET_PLAY_HISTORY](state,list){
	  state.playHistory=list;
  },
  [types.SET_MINIPLAYSHOW](state,falg){
    state.miniPlayShow=falg;
  },
  [types.SET_FAVORITELIST](state,list){
    state.favoriteList=list;
  }

}
export default mutation;
