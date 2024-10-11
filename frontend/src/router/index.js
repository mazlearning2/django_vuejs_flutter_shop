import { createRouter, createWebHistory } from 'vue-router'
import { ShopLayout, DashboardLayout } from '../views/layouts';
import { ShopIndexView, ShopProductsView, ShopBlogView, ShopAuthView } from '@/views/shop'
import {
  DashboardIndexView, DashboardProductManagementView,
  DashboardProductCategoryManagerView, DashboardProductCategoryCreatedView, DashboardProductCategoryUpdatedView,
  DashboardProductBrandManagerView, DashboardProductBrandCreateView, DashboardProductBrandUpdateView,

} from '@/views/dashboard'
import { useUserStore } from '@/stores/user' // اضافه کردن Pinia store

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
          meta: { guestOnly: true }, // فقط کاربران مهمان بتوانند دسترسی داشته باشند
        },
      ]
    },
    {
      path: '/dashboard',
      name: 'dashboardLayout',
      component: DashboardLayout,
      meta: { requiresAuth: true }, // مسیر محافظت شده برای کاربران لاگین شده
      children: [
        {
          path: '',
          name: 'dashboardIndexView',
          component: DashboardIndexView,
          meta: { requiresAuth: true },
        },
        {
          path: 'product-management',
          name: 'dashboardProductManagementView',
          component: DashboardProductManagementView,
          meta: { requiresAuth: true, requiresStaff: true }, // مسیر محافظت شده برای کاربران staff
        },
        // product category
        {
          path: 'product-category-manager',
          name: 'dashboardProductCategoryManagerView',
          component: DashboardProductCategoryManagerView,
          meta: { requiresAuth: true, requiresStaff: true },
        },
        {
          path: 'product-create-category',
          name: 'dashboardProductCategoryCreatedView',
          component: DashboardProductCategoryCreatedView,
          meta: { requiresAuth: true, requiresStaff: true },
        },
        {
          path: 'product-category-update/:id',
          name: 'dashboardProductCategoryUpdatedView',
          component: DashboardProductCategoryUpdatedView,
          meta: { requiresAuth: true, requiresStaff: true },
        },
        // product brand
        {
          path: 'product-brand-manager',
          name: 'dashboardProductBrandManagerView',
          component: DashboardProductBrandManagerView,
          meta: { requiresAuth: true, requiresStaff: true },
        },
        {
          path: 'product-create-brand',
          name: 'dashboardProductBrandCreateView',
          component: DashboardProductBrandCreateView,
          meta: { requiresAuth: true, requiresStaff: true },
        },
        {
          path: 'product-brand-update/:id',
          name: 'dashboardProductBrandUpdateView',
          component: DashboardProductBrandUpdateView,
          meta: { requiresAuth: true, requiresStaff: true },
        },
      ]
    },
  ]
})

// ایجاد نگهبان برای مسیریابی
router.beforeEach((to, from, next) => {
  const userStore = useUserStore(); // دسترسی به Pinia store

  // بررسی مسیرهای محافظت شده (requiresAuth)
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!userStore.user.isAuthenticated) {
      // اگر کاربر لاگین نکرده باشد، به صفحه ورود هدایت می‌شود
      return next({ name: 'shopAuthView' });
    }

    // بررسی دسترسی کاربر به مسیرهای staff
    if (to.matched.some(record => record.meta.requiresStaff)) {
      if (!userStore.user.isStaff && !userStore.user.isSuperUser) {
        // اگر کاربر staff یا superuser نبود، دسترسی منع می‌شود
        return next({ name: 'shopIndexView' });
      }
    }
  }

  // جلوگیری از دسترسی کاربر لاگین شده به صفحه ورود
  if (to.matched.some(record => record.meta.guestOnly)) {
    if (userStore.user.isAuthenticated) {
      // اگر کاربر لاگین کرده باشد، به داشبورد هدایت می‌شود
      return next({ name: 'dashboardIndexView' });
    }
  }

  // اگر شرایط دسترسی برقرار بود، مسیر صحیح ادامه پیدا کند
  next();
});

export default router;
