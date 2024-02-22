import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/main'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    component: () => import('@/components/CleanView.vue'),
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import('@/components/views/LoginView.vue'),        
      },
    ]
  },
  {
    path: '',
    component: () => import('@/components/BaseView.vue'),
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/components/views/DashboardView.vue'),
        meta: {
          authorize: true
        }
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  routes: routes
})

router.beforeResolve((to, from, next) => {
  var user = store.getters.user
  if (to.matched.some(record => record.meta.authorize)) {
    if (user.length <= 0) {
      router.push({ name: "login" });
    }
    else if (user != null) {
      next()
    }
    else {
      router.push({ name: "login" });
    }
  }
  else {
    if (user!=null) {
      router.push({ name: "dashboard" });
    }
    next()
  }
})

export default router