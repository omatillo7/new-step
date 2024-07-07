import { App } from 'vue'
import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router'
import { IModuleType } from './types'
import AuthRoutes from './auth'
import { ErrorPageRoute } from './base'
import { useAuthStore } from '@/stores/auth'
import NProgress from 'nprogress';


const modules = import.meta.glob<IModuleType>('./modules/**/*.ts', { eager: true })

const routeModuleList: RouteRecordRaw[] = Object.keys(modules).reduce((list: any, key) => {
    const mod = modules[key].default ?? {}
    const modList = Array.isArray(mod) ? [...mod] : [mod]
    return [...list, ...modList]
}, [])


export const RootRoute: RouteRecordRaw = {
    path: '/',
    redirect: 'dashboard',
    component: () => import('@/layouts/admin/AdminLayout.vue'),
    meta: {
        title: 'Root',
        name: 'Root',
    },
    children: [
        {
            path: 'dashboard',
            name: 'dashboard',
            component: () => import('@/pages/dashboard.vue')
        },
        ...routeModuleList,
    ]
}


const routes = [RootRoute, ...AuthRoutes, ...ErrorPageRoute]

console.log(routes)


const router = createRouter({
    history: createWebHistory(),
    strict: true,
    routes: routes as RouteRecordRaw[],
    scrollBehavior: () => ({ left: 0, top: 0 }),
})


router.beforeEach(async (to, _from, next) => {
    NProgress.start()
    const access_token = localStorage.getItem('access_token') || '4849';
    // debugger
    const authStore = useAuthStore();

    const allowRoutes = ['no-access', 'dashboard'];
    const loginRoutes = ['login', 'resetpassword'];

    if (loginRoutes.includes(String(to.name))) {
        next();
        return;
    }
    // if (!authStore.user) {
    //     await authStore.fetchUser();
    // }

    if (allowRoutes.includes(String(to.name))) {
        next();
        return;
    }
    if (to.matched.some((record) => record.meta.requiresAuth) && !access_token) {
        next({ name: 'Login', query: { next: to.fullPath } });
    } else {
        next();
    }
});


router.afterEach(() => {
    NProgress.done()
})

export const setupRouter = (app: App<Element>) => {
    app.use(router)
}