import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/category/:slug',
    name: 'Category',
    component: () => import(/* webpackChunkName: "category" */ '../views/Category.vue')
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: () => import(/* webpackChunkName: "tasks" */ '../views/Tasks.vue')
  },
  {
    path: '/create/:slug',
    name: 'CreateTask',
    component: () => import(/* webpackChunkName: "createTask" */ '../views/CreateTask.vue')
  },
  {
    path: '/edit/:slug',
    name: 'EditTask',
    component: () => import(/* webpackChunkName: "editTask" */ '../views/EditTask.vue')
  },
  {
    path: '/404',
    component:  () => import(/* webpackChunkName: "notFound" */ '../views/NotFound.vue')
  },
  {
    path: '/:match(.*)',
    redirect: '/404'
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next)=>{

  if (to.name === 'Category' || to.name === 'CreateTask'){
    if ((localStorage.getItem('categories')) === ''){
      next({name : 'Home'})
    }else{
      let categories = JSON.parse(localStorage.getItem('categories')) || [];
      let categoriesId = []
      categories?.forEach((item) =>{
        categoriesId.push(item.id)
      })
      let slug = to.params.slug;
      if (categoriesId.indexOf(slug) !== -1){
        next()
      }else {
        next({name : 'Home'})
      }
    }
  }
  if (to.name === 'EditTask'){
    if ((localStorage.getItem('tasks')) === ''){
      next({name : 'Home'})
    }else {
      let tasks = JSON.parse(localStorage.getItem('tasks'))
      let tasksId = []
      tasks?.forEach((item) => {
        tasksId.push(item.id)
      })
      let EditSlug = to.params.slug;
      if (tasksId.indexOf(EditSlug) !== -1) {
        next()
      } else {
        next({name: 'Home'})
      }
    }
  }
  next()
})
export default router
