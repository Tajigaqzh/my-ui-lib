import { createRouter, createWebHistory } from 'vue-router'
import { routeGeneratorService } from '../services/route-generator'

// Generate routes automatically based on discovered components
const routes = routeGeneratorService.createRouteConfiguration()

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router