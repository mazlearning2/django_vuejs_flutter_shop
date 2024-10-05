import { createRouter, createWebHistory } from 'vue-router'
import { ShopLayout, DashboardLayout } from '../views/layouts';
import { ShopIndexView, ShopProductsView, ShopBlogView, ShopAuthView } from '@/views/shop'
import { DashboardIndexView, DashboardProductManagementView } from '@/views/dashboard'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'shopLayout',
      component: ShopLayout,
      children: [
        {
          path: '',
          name: 'shopIndexView',
          component: ShopIndexView,
        },
        {
          path: 'products',
          name: 'shopProductsView',
          component: ShopProductsView,
        },
        {
          path: 'blogs',
          name: 'shopBlogsView',
          component: ShopBlogView,
        },
        {
          path: 'auth',
          name: 'shopAuthView',
          component: ShopAuthView,
        },
      ]
    },
    {
      path: '/dashboard',
      name: 'dashboardLayout',
      component: DashboardLayout,
      children: [
        {
          path: '',
          name: 'dashboardIndexView',
          component: DashboardIndexView
        },
        {
          path: 'product-management',
          name: 'dashboardProductManagementView',
          component: DashboardProductManagementView
        },
      ]
    }
  ]
})

export default router
