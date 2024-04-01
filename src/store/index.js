
import Vue from "vue";
import Vuex from "vuex";

// module store
import setting from "./modules/setting";
Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        setting,
    },
});