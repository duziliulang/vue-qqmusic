import Vue from 'vue'
import Router from 'vue-router';
import header from '@/components/header/header';
import Recommend from '@/components/Recommend/Recommend';
import singer from '@/components/singer/singer';
import rank from '@/components/rank/rank';
import search from '@/components/search/search';
import singerDetail from '@/components/singerDetail/singerDetail';
import toplist from '@/components/toplist/toplist';
import disc from '@/components/disc/disc';
import userCenter from '@/components/userCenter/userCenter';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Recommend
    },
    {
      path: '/recommend',
      component: Recommend,
      children:[
      	{
          path: ':id',
          component: disc
        }
      ]
    },
    {
      path: '/singer',
      component: singer,
      children:[
      	{
          path: ':id',
          component: singerDetail
        }
      ]
    },
    {
      path: '/rank',
      component: rank,
        children:[
	      	{
	          path: ':id',
	          component: toplist
	        }
	      ]
    },
    {
      path: '/search',
      component: search,
      children:[
	      {
	        path: ':id',
	        component: singerDetail
	      }
	    ]
    },
    {
      path: '/user',
      component: userCenter
    }

  ]
})
