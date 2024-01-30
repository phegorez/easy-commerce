import { createRouter, createWebHistory } from "vue-router";
// User
import HomeView from "@/views/user/HomeView.vue";
import SearchView from "@/views/user/SearchView.vue";
import ProfileView from "@/views/user/ProfileView.vue";
import CartView from "@/views/user/CartView.vue";
import SuccessView from "@/views/user/SuccessView.vue";
import CheckoutView from "@/views/user/CheckoutView.vue";
// Admin
import AdminDashboard from "@/views/admin/DashboardView.vue";

import AdminProdutcList from "@/views/admin/product/ListView.vue";
import AdminProductUpdate from "@/views/admin/product/UpdateView.vue";

import AdminOrderList from "@/views/admin/order/ListView.vue";
import AdminOrderDetail from "@/views/admin/order/DetailView.vue";

import AdminUserList from "@/views/admin/user/ListView.vue";
import AdminUserUpdate from "@/views/admin/user/UpdateView.vue";

// Hybrid
import LoginView from "@/views/LoginView.vue";
import LogoutView from "@/views/user/LogoutView.vue";
import Notfound from "@/views/user/NotfoundView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/search",
      name: "search",
      component: SearchView,
    },
    {
      path: "/profile",
      name: "profile",
      component: ProfileView,
    },
    {
      path: "/cart",
      name: "cart",
      component: CartView,
    },
    {
      path: "/checkout",
      name: "checkout",
      component: CheckoutView,
    },
    {
      path: "/success/:cartid",
      name: "success",
      component: SuccessView,
    },
    // Admin site
    {
      path: "/admin/dashboard",
      name: 'admin-dashboard',
      component: AdminDashboard
    },
    {
      path: "/admin/products",
      name: 'admin-products-list',
      component: AdminProdutcList
    },
    {
      path: "/admin/products/create",
      name: 'admin-product-create',
      component: AdminProductUpdate
    },
    {
      path: "/admin/products/update/:id",
      name: 'admin-product-update',
      component: AdminProductUpdate
    },
    {
      path: "/admin/users",
      name: 'admin-users-list',
      component: AdminUserList
    },
    {
      path: "/admin/users/update/:id",
      name: 'admin-users-update',
      component: AdminUserUpdate
    },
    {
      path: "/admin/orders",
      name: 'admin-orders-list',
      component: AdminOrderList
    },
    {
      path: "/admin/orders/details/:id",
      name: 'admin-orders-details',
      component: AdminOrderDetail
    },
    // 
    {
      path: "/logout",
      name: "logout",
      component: LogoutView,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "notfound",
      component: Notfound,
    },
    {
      path: '/admin/login',
      name: 'admin-login',
      component: LoginView
    }
  ],
});

export default router;
