import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "@/views/home/index.vue";
import Chat from "@/views/chat/index.vue";

Vue.use(VueRouter)

const routes = [
    {
        path: "*",
        redirect: "/home",
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
    },
    {
        path: '/chat',
        name: 'Chat',
        component: Chat,
    },
];

const router = new VueRouter({
    mode: 'history',
    base: '/web-large-model',
    routes
})

export default router



