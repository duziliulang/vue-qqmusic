import {commonParams} from "./api.js"
import axios from 'axios'
// 获取歌词
export function getLyric(mid) {
  const url = '/api/lyric'

  const data = Object.assign({}, commonParams, {
    songmid: mid,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    g_tk:1792280766,
    pcachetime: +new Date(),
    format: 'json',
    loginUin:941020643
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 获取歌曲播放地址
export function player(songmid) {
	const url = '/api/getSong';
	const data = Object.assign({}, commonParams, {
		g_tk: 5381,
		loginUin: 0,
		hostUin: 0,
		platform: 'yqq',
		needNewCode: 0,
		cid: 205361747,
		uin: 0,
		songmid: songmid,
		filename: `C400${songmid}.m4a`,
		guid: 7661965632,
	})
	return axios.get(url, {
	    params: data
	}).then((res) => {
	    return Promise.resolve(res.data)
	})
}
