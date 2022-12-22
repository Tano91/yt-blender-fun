import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import About from '@/views/About.vue'
import Privacy from '@/components/Privacy.vue'
import Terms from '@/components/Terms.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: Privacy
  },
  {
    path: '/terms',
    name: 'terms',
    component: Terms
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
