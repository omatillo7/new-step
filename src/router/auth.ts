import { RouteRecordRaw } from 'vue-router'

const AuthRoutes: Array<RouteRecordRaw> = [
    {
        path: '/auth',
        name: 'auth',
        component: () => import('@/layouts/blank.vue'),
        redirect: 'Login',
        meta: {
            isRoot: true,
            activeMenu: 'login',
        },
        children: [
            {
                path: 'login',
                name: 'login',
                meta: {
                    title: 'Auth',
                    activeMenu: 'login'
                },
                component: () => import('@/pages/auth/login.vue')
            }
        ]
    }
]

export default AuthRoutes
