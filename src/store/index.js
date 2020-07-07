import Vue from "vue";
import Vuex from 'vuex';
import * as getters from "./getters.js";
import * as actions from "./actions.js";
import state from "./state.js";
import mutations from "./mutation.js";
import createLogger from "vuex/dist/logger";
Vue.use(Vuex);
const debug =process.env.NODE_ENV!=='production';
export default new Vuex.Store({
	getters,
	state,
	actions,
	mutations,
	strict: debug,
  	plugins: debug ? [createLogger()] : []
})
