import Vue from 'vue';
import App from "./App.vue";
import router from "./router/index";
import store from './store/index';
import { Button, Input } from 'element-ui';
import inject from '@/utils/inject';
import "@/style/index.scss";

Vue.use(Button);
Vue.use(Input);
Vue.use(inject);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
