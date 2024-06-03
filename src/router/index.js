import { createRouter, createWebHistory } from 'vue-router'
import Signup from "@/pages/Signup.vue"
import Login from "@/components/Header.vue"
import Product from "@/pages/Product.vue"
import Info from "@/pages/Info.vue"
import Cart from "@/components/Header.vue"
import Wishlist from "@/pages/Wishlist.vue"
import WishAdd from "@/pages/WishAdd.vue"
import About from "@/pages/About.vue"
import Home from "@/pages/Home.vue"


const routes = [

  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/product',
    name: 'Product',
    component: Product
  },
  {
    path: '/info/:id',
    name: 'Info',
    component: Info
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/wishlist',
    name: 'Wishlist',
    component: Wishlist
  },
  
  {
    path: '/wishadd',
    name: 'WishAdd',
    component: WishAdd
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
 
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router