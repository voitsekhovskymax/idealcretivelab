import Vue from 'vue';
import tinymce from 'vue-tinymce-editor'
Vue.component('tinymce', tinymce)
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import VueRouter from 'vue-router';
import VueAxios from 'vue-axios';
import axios from 'axios'; 
import Vuex from 'vuex';
import Notifications from 'vue-notification';






Vue.use(Vuetify);
Vue.use(VueRouter);
Vue.use(VueAxios, axios);
Vue.use(Vuex);
Vue.use(Notifications);

import App from './app.vue';
import Welcome from './views/welcome';
import filemanager from './views/filemanager/filemanager';

import Blog from './views/blog/posts';
import Post_Create from './views/blog/post_create';
import post_edit from './views/blog/post_edit';

import Portfolio from './views/portfolio/portfolios';
import Portfolio_Create from './views/portfolio/portfolio_create';
import portfolio_edit from './views/portfolio/portfolio_edit';

import skills from './views/skills/skills';
import skill_create from './views/skills/skill_create';
import skill_edit from './views/skills/skill_edit';

import sliders from './views/sliders/sliders';
import slider_create from './views/sliders/slider_create';
import slider_edit from './views/sliders/slider_edit';

import notifications from './views/notifications/notifications';
import notification_view from './views/notifications/notification_view';

import visitors from './views/visitors/visitors';
import visitor_edit from './views/visitors/visitors_edit';



import users from './views/users/users';
import user_create from './views/users/user_create';
import user_edit from './views/users/user_edit';
import user_settings from './views/users/user_settings';


import feedbacks from './views/feedbacks/feedbacks';
import feedback_create from './views/feedbacks/feedback_create';
import feedback_update from './views/feedbacks/feedback_update';

const routes = [
    {
        name: 'Welcome',
        path: '/admin/',  
        component: Welcome
    },
    {
        name: 'filemanager',
        path: '/admin/files',
        component: filemanager
    },
    {
        name: 'Blog',
        path: '/admin/blog',
        component: Blog
    },
    {
        name: 'Post_Create',
        path: "/admin/post/new",
        component : Post_Create
    },
    {
        name: 'post_edit',
        path: '/admin/post/:id/edit',
        component: post_edit
    },
    {
        name: 'Portfolio',
        path: '/admin/portfolio',
        component: Portfolio
    },
    {
        name: 'Portfolio_Create',
        path: "/admin/portfolio/new",
        component : Portfolio_Create
    },
    {
        name: 'portfolio_edit',
        path: "/admin/portfolio/:id/edit",
        component : portfolio_edit
    },
    {
        name: 'skills',
        path: '/admin/skills',
        component: skills
    },
    {
        name: 'skill_create',
        path: "/admin/skills/new",
        component : skill_create
    },
    {
        name: 'skill_edit',
        path: "/admin/skill/:id/edit",
        component : skill_edit
    },
    {
        name: 'sliders',
        path: '/admin/sliders',
        component: sliders
    },
    {
        name: 'slider_create',
        path: "/admin/slider/new",
        component : slider_create
    },
    {
        name: 'slider_edit',
        path: "/admin/slider/:id/edit",
        component : slider_edit
    },
    {
        name: 'notifications',
        path: "/admin/notifications",
        component : notifications
    },
    {
        name: 'notification_view',
        path: "/admin/notification/:id/view",
        component : notification_view
    },
    {
        name: 'visitors',
        path: "/admin/visitors",
        component : visitors
    },
    {
        name: 'visitor_edit',
        path: "/admin/visitor/:id/edit",
        component : visitor_edit
    },
    {
        name: 'users',
        path: '/admin/users',
        component: users
    },
    {
        name: 'user_create',
        path: "/admin/user/new",
        component : user_create
    },
    {
        name: 'user_edit',
        path: "/admin/user/:id/edit",
        component : user_edit
    },
    {
        name: 'user_settings',
        path: "/admin/settings/:id",
        component : user_settings
    },
    {
        name: 'feedbacks',
        path: '/admin/feedbacks',
        component: feedbacks
    },
    {
        name: 'feedback_create',
        path: "/admin/feedback/new",
        component : feedback_create
    },
    {
        name: 'feedback_update',
        path: "/admin/feedback/:id/edit",
        component : feedback_update
    },
   
];


const router = new VueRouter({
    mode: 'history',
    routes: routes
});


const store = new Vuex.Store({
    state: {},
    actions: {},
    mutations: {},
    getters: {}
})



var vm = new Vue(Vue.util.extend({
    router
}, App), store).$mount('#app');


