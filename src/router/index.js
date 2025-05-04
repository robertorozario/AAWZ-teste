import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import LoginForm from '../components/LoginForm.vue'
import UserForm from '../components/UserForm.vue'
import UserStats from '../components/UserStats.vue'

const routes = [
  {
    path: '/',
    component: UserForm
  },
  {
    path: '/login',
    component: LoginForm
  },
  {
    path: '/stats',
    component: UserStats,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router