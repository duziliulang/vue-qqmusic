import  storage from "good-storage";
const SEARCH_KEY="_search_";
const SEARCH_MAX_LEN=15;

const PLAYKEY="_play_";
const PLAY_MAX_LEN=200;

const FAVORITE ="_Favorite_";
const FAVORITE_MAX_LEN=200;

function inserArray( arr ,val ,compare , maxlen) {
    const index = arr.findIndex(compare);
    if(index==0){
      return
    }
    if(index>0){
      arr.splice(index,0);
    }
    arr.unshift(val);
    if(maxlen&&arr.length>maxlen){
      arr.pop();
    }
}
function deletaOneArray(arr,query, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}
export function loadSearch() {
  return storage.get(SEARCH_KEY, [])
}
export  function saveSearch(query){
    let searches =storage.get(SEARCH_KEY,[]);
    inserArray(searches,query,(item)=>{
        return item===query
    },SEARCH_MAX_LEN)
   storage.set(SEARCH_KEY,searches);
    return searches;
}
export function deleteOne( query ){
  let searches= storage.get(SEARCH_KEY,[]);
  deletaOneArray(searches,query,(item)=>{
    return item.id==query.id
  })
  storage.set(SEARCH_KEY,searches);
  return searches;
}
export function deleteHistoryall(){
  let searches=[];
  storage.set(SEARCH_KEY,[]);
  return searches;
}
export  function savePlay(song){
  let songs =storage.get(PLAYKEY,[])
  inserArray(songs,song,( item )=>{

      return song.id===item.id;
  },PLAY_MAX_LEN)
  storage.set(PLAYKEY,songs)
  return songs;
}
export function loadPlay() {
  return storage.get(PLAYKEY, [])
}

export  function saveFavorite(query){
  console.log("--------------currentSong----------------------")
  console.log(query)
  let favprote =storage.get(FAVORITE,[]);
  inserArray(favprote,query,(item)=>{
    return item===query
  },FAVORITE_MAX_LEN)
  console.log('----------------favprote------------------------------')
  console.log(favprote)
  storage.set(FAVORITE,favprote);
  return favprote;
}
export  function deleteFavorite(query){
  let favprote =storage.get(FAVORITE,[]);
  deletaOneArray(favprote,query,(item)=>{
    return item.id==query.id
  })
  storage.set(FAVORITE,favprote);
  return favprote;
}
export function loadFavorite(){
	return storage.get(FAVORITE, [])
}
