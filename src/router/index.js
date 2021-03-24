import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AddTutorial from '../components/AddTutorial.vue'
import TutorialsList from '../components/TutorialsList'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    alias:"/tutorials",
    name: 'tutorials',
    component: TutorialsList
  },
  {
    path: '/add',
    name: 'add',
    component: AddTutorial
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
