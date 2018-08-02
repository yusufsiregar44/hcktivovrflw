import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Question from './views/Question.vue';
import User from './views/User.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/question/:id',
      name: 'question',
      component: Question
    },
    {
      path: '/user',
      name: 'user',
      component: User
    },
  ]
})
