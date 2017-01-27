import VueRouter from 'vue-router'
import routes from './routes'
import auth from './auth'

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.auth && !auth.loggedIn()) {
    return next('/login')
  }
  next()
})

export default router
