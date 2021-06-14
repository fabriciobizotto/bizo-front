import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';

import AuthService from './services/auth.service';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/profile',
      name: 'profile',
      // lazy-loaded
      component: () => import('./views/Profile.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      // lazy-loaded
      component: () => import('./views/BoardAdmin.vue')
    },
    {
      path: '/mod',
      name: 'moderator',
      // lazy-loaded
      component: () => import('./views/BoardModerator.vue')
    },
    {
      path: '/user',
      name: 'user',
      // lazy-loaded
      component: () => import('./views/BoardUser.vue')
    },

    {
      path: '/accounts',
      name: 'accounts',
      // lazy-loaded
      component: () => import('./views/Accounts.vue')
    },
    {
      path: '/tags',
      name: 'tags',
      // lazy-loaded
      component: () => import('./views/Tags.vue')
    },
    {
      path: '/categories',
      name: 'categories',
      // lazy-loaded
      component: () => import('./views/Categories.vue')
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  const publicPages = ['/login', '/register', '/home'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  try {
    // const response = await AuthService.verificarToken();
    // console.log(response);
    if (authRequired && !loggedIn) {
      next('/login');
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
  }

  // trying to access a restricted page + not logged in
  // redirect to login page
  // if (authRequired && !loggedIn) {
  //   next('/login');
  // } else {
  //   next();
  // }
});

// router.beforeEach((to, from, next) => {
//   if(to.matched.some(record => record.meta.requiresAuth)) {
//     if (store.getters.isLoggedIn) {
//       next()
//       return
//     }
//     next('/login')
//   } else {
//     next()
//   }
// })
