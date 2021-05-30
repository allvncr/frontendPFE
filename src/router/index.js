import Vue from "vue"
import VueRouter from "vue-router"
Vue.use(VueRouter);

const routes = [

  {
    path: "/",
    name: "Home",
    component: () => import('../views/Bookworm/Home.vue')
  },

  {
    path: "/shop",
    name: "Shop",
    component: () => import('../views/Bookworm/Shop.vue')
  },

  {
    path: '/categorie/:cat',
    name: 'Categorie',
    component: () => import('../views/Bookworm/Category.vue')
  },
  {
    path: '/author/:aut',
    name: 'Author',
    component: () => import('../views/Bookworm/Author.vue')
  },

  {
    path: '/categorie/:cat/book/:id',
    name: 'Book',
    component: () => import('../views/Bookworm/Book.vue')
  },

  {
    path: '/authors',
    name: 'Authors',
    component: () => import('../views/Bookworm/AuthorsList.vue')
  },

  
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Bookworm/Cart.vue')
  },

  {
    path: '/checkout/:price',
    name: 'Checkout',
    component: () => import('../views/Bookworm/Checkout.vue')
  },

  {
    path: '/help/about',
    name: 'About',
    component: () => import('../views/StaticPage/About.vue')
  },

  {
    path: '/help/contact',
    name: 'Contact',
    component: () => import('../views/StaticPage/Contact.vue')
  },

  {
    path: '/help/faq',
    name: 'FAQ',
    component: () => import('../views/StaticPage/Faq.vue')
  },

  /***********************************************************/

  {
    path: '/help/terms',
    name: 'Terms',
    component: () => import('../views/StaticPage/Terms.vue')
  },
  
  {
    path: '/auth/:recover',
    name: 'Authentication',
    component: () => import('../views/StaticPage/Auth.vue')
  },

  {
    path: '/coming',
    name: 'Coming',
    component: () => import('../views/StaticPage/coming.vue')
  },

  {
    path: '/404',
    name: '404',
    component: () => import('../views/StaticPage/404.vue')
  },

  /***********************************************************/

  {
    path: '/user/account',
    name: 'Account',
    component: () => import('../views/User/Account.vue')
  },

  {
    path: '/user/wish',
    name: 'Wish',
    component: () => import('../views/User/Wish.vue')
  },

  {
    path: '/user/order',
    name: 'Orders',
    component: () => import('../views/User/Orders.vue')
  },

  /***********************************************************/

  {
    path: '/admin',
    name: 'Site administration',
    component: () => import('../views/Admin/Admin.vue')
  },

  {
    path: '/admin/login',
    name: 'Login administration',
    component: () => import('../views/Admin/Login.vue')
  },

  {
    path: '/admin/logout',
    name: 'Logout administration',
    component: () => import('../views/Admin/Logout.vue')
  },

  {
    path: '/admin/:app',
    name: "Administration",
    component: () => import('../views/Admin/App.vue'),
  },

  {
    path: '/admin/:app/:module',
    name: "List",
    component: () => import('../views/Admin/Module.vue'),
  },

  {
    path: '/admin/:app/:module/add',
    name: "Add",
    component: () => import('../views/Admin/Add.vue'),
  },

  {
    path: '/admin/:app/:module/:id',
    name: "Edit",
    component: () => import('../views/Admin/Put.vue'),
  },

  /***********************************************************/

  {
    path: "/**",
    name: "Not Found",
    component: () => import('../views/StaticPage/404.vue')
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) =>{
  document.title = `${ process.env.VUE_APP_TITLE } - ${ to.name }`
  next()
})

export default router
