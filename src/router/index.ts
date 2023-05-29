import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

import routes from './routes';
import {Cookies} from 'quasar';
import moment from 'moment';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory);

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });


  Router.beforeEach((to, from, next) => {
    const publicPages = ['/'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = Cookies.get('tk');
    const dd = moment(Cookies.get('uidt988'))
    const df = moment(new Date().toISOString())
    let dfd = 0
    if (dd === '' || dd === null) {
      dfd = 100
    } else {
      dfd = df.diff(dd, 'minutes')
    }
    //console.log(dfd)
    if (authRequired && !loggedIn) {
      next('/');
    } else {
      if (dfd > 45) {
        Cookies.set('lang', '')
        Cookies.set('tk', '')
        Cookies.set('user', '')
        Cookies.set('id', '')
        Cookies.set('mail', '')
        Cookies.set('photo', '')
        Cookies.set('mem', '')
        Cookies.set('auth', '')
        Cookies.set('profs', '')
        Cookies.set('uidt988', '')
        Cookies.set('log', '')

        return next({ path: '/' });
      }
      Cookies.set('time', new Date().toISOString())
      next();
    }
  })
  return Router;
});
