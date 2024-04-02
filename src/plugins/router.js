import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/clean',
    component: () => import('@/components/CleanView.vue'),
    children: [
      {
        path: '/login',
        name: 'login',
        meta: { title: 'Login' },
        component: () => import('@/components/views/LoginView.vue'),        
      },
    ]
  },
  {
    path: '/',    
    component: () => import('@/components/BaseView.vue'),
    meta: {
      authorize: true
    },
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        meta: { title: 'Dashboard' },
        component: () => import('@/components/views/DashboardView.vue'),
        
      },
      {
        path: '/portada',
        name: 'cover',
        meta: { title: 'Portada' },
        component: () => import('@/components/views/CoverView.vue'),
        
      },
      {
        path: '/portada/:id',
        name: 'coverEdit',
        meta: { title: 'Portada Editar' },
        component: () => import('@/components/views/CoverEdit.vue'),
        
      },
      {
        path: '/activitats',
        name: 'activities',
        meta: { title: 'Activitats' },
        component: () => import('@/components/views/ActivitiesView.vue'),
      },
      {
        path: '/activitats/:id',
        name: 'activityEdit',
        meta: { title: 'Activitat · Detall' },
        component: () => import('@/components/views/ActivityEdit.vue'),
      },
      {
        path: '/activitats/media/:id',
        name: 'activityMultimedia',
        meta: { title: 'Activitat · Adjunts' },
        component: () => import('@/components/views/activityMultimedia.vue'),
      },
      {
        path: '/categories',
        name: 'categories',
        meta: { title: 'Categories' },
        component: () => import('@/components/views/CategoriesView.vue'),
      },
      {
        path: '/categories/:id',
        name: 'categoryEdit',
        meta: { title: 'Categoria · Detall' },
        component: () => import('@/components/views/CategoryEdit.vue'),
      },
      {
        path: '/rols',
        name: 'roles',
        meta: { title: 'Rols' },
        component: () => import('@/components/views/RolesView.vue'),
      },
      {
        path: '/usuaris',
        name: 'users',        
        meta: { title: 'Usuaris' },
        component: () => import('@/components/views/UsersView.vue'),
      },
      {
        path: '/tipus-socis',
        name: 'parners',        
        meta: { title: 'Tipus de socis' },
        component: () => import('@/components/views/ParnersView.vue'),
      },
      {
        path: '/tipus-socis/:id',
        name: 'parnersEdit',        
        meta: { title: 'Tipus de socis' },
        component: () => import('@/components/views/ParnersEdit.vue'),
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  routes: routes
})

let _user = {
  isLogged: function () {
    return router.app.$store.getters.isLoggedIn
  },
}

let _setTitle = function(to) {
  let title = "Ateneu l'Aliança"
  let pageTitle = to.meta.title || ''
  if (pageTitle != '') title = pageTitle + ' · ' + title
  if (to.params.id) title = `#${to.params.id} · ${title}`

  document.title = title
}

router.beforeResolve (
  async (to, from, next) => {
  
  _setTitle(to)

  if (!to.matched.some(record => record.meta.authorize)) {
    return next()
  }

  if(!_user.isLogged())
  return next({
    path: '/login',
    query: { redirect: to.fullPath }
  })

    return next()
})

export default router