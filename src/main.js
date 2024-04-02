import Vue from 'vue';
import App from "./App.vue";
import router from "./router/index";
import store from './store/index';
// import VueSvgIcons from "@megvii-icons/vue-svg-icons";
import MegUI from "meg-ui";
import "@/style/index.scss";

Vue.use(MegUI);
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')