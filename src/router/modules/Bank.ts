import { RouteRecordRaw } from 'vue-router'

const baseBreadCrumbs = [
    {
        title: 'MainPage',
        to: "/dashboard",
    },
    {
        title: 'Bank',
        to: { name: 'Bank' },
    },
]

export default [
    {
        path: 'Bank',
        name: 'Bank',
        meta: {
            title: 'Bank',
            activeMenu: 'Bank',
            breadcrumbs: baseBreadCrumbs
        },
        component: () => import('@/pages/bank/index.vue')
    },
    {
        path: 'Bank/:id',
        name: 'CreativeDirectionEdit',
        meta: {
            title: 'Bank',
            activeMenu: 'Bank',
            breadcrumbs: [
                ...baseBreadCrumbs,
                {
                    title: 'Add',
                },
            ]
        },
        component: () => import('@/pages/bank/edit.vue')
    }
] as RouteRecordRaw[]
