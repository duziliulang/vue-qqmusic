import {commonParams,options} from "./api.js"
import jsonp from "../common/js/jsonp.js"
import axios from "axios/index";

export function getHotKey(){
	const url="https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg"
	const data=Object.assign({},commonParams,{
		uin:0,
		needNewCode:1,
		platform:"h5"
	})
	return jsonp(url,data,options)
}
// 获取搜索列表
export function search(query, page, zhida, perpage) {
  const url="/api/getSearch"
  const data = Object.assign({}, commonParams, {
    w: query,
    p: page,
    n: perpage,
    catZhida: zhida ? 1 : 0,
    t: 0,
    aggr: 1,
    needNewCode: 0,
    platform: 'yqq',
    g_tk: 5381,
    is_xml: 0,
    format: 'jsonp',
    key: query,
    loginUin: 0,
    hostUin: 0,
    notice: 0
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
  // return jsonp(url, data, options)
}
