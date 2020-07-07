import * as types from "./mutation_type.js";
import state from "./state.js"
import {saveSearch,deleteOne,deleteHistoryall,savePlay,saveFavorite,deleteFavorite} from "../common/js/cache"
export const selectplay = function({commit, state}, {list, index}) {
	commit(types.SET_PLAYING,true);
	commit(types.SET_FULLSCREEN,true);
	commit(types.SET_PLAYLIST,list);
	commit(types.SET_SEQUENCELIST,list);
	commit(types.SET_CURRENTINDEX,index);
}
export  const deleteSong=function ({commit,state},song) {
    // 因为vue不能直接更改vuex中的数值，所以需要用slice()方法来创建一个副本，在对副本进行更改，最后统一设置
    let playlist = state.playlist.slice();
    let currentIndex=state.currentIndex;
    let pIndex=findIndex(playlist,song);
    playlist.splice(pIndex,1);
    if( currentIndex > pIndex||currentIndex===playlist.length ){
        currentIndex--;
    }
  commit(types.SET_PLAYLIST,playlist)
  commit(types.SET_CURRENTINDEX,currentIndex)
}
export const saveSearchHistory = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}
export const deletaHistoryOne = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, deleteOne(query))
}
export const deleteHistoryAll = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY,deleteHistoryall())
}
function findIndex(list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}
export function  savePlayHistory({commit},song) {
  commit(types.SET_PLAY_HISTORY, savePlay(song))
}
export function insertSong({commit,state},song){
    let playlist = state.playlist.slice();
    let currentIndex=state.currentIndex;
    let fIndex = findIndex(playlist,song);
    currentIndex++;
    playlist.splice(currentIndex,0 ,song)
    if(fIndex>-1){
        if(currentIndex>fIndex){
          playlist.splice(fIndex,1);
          currentIndex--
        }else {
          playlist.splice(fIndex+1,1)
        }
    }
    commit(types.SET_PLAYLIST,playlist);
    commit(types.SET_CURRENTINDEX,currentIndex);
    commit(types.SET_FULLSCREEN,true)
    commit(types.SET_PLAYING,true)
}
export function saveFavoriteList({commit},song) {
  commit(types.SET_FAVORITELIST,saveFavorite(song))
}
export function deleteFavoriteList({commit},song) {
  commit(types.SET_FAVORITELIST,deleteFavorite(song))
}
