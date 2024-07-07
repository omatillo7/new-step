import { RouteRecordRaw } from 'vue-router'

const baseBreadCrumbs = [
    {
        title: 'MainPage',
        to: "/dashboard",
    },
    {
        title: 'Ifut',
        to: { name: 'Ifut' },
    },
]

export default [
    {
        path: 'ifut',
        name: 'Ifut',
        meta: {
            title: 'Ifut',
            activeMenu: 'Ifut',
            breadcrumbs: baseBreadCrumbs
        },
        component: () => import('@/pages/ifut/index.vue')
    },
    {
        path: 'Ifut/:id',
        name: 'CreativeDirectionEdit',
        meta: {
            title: 'Ifut',
            activeMenu: 'Ifut',
            breadcrumbs: [
                ...baseBreadCrumbs,
                {
                    title: 'Add',
                },
            ]
        },
        component: () => import('@/pages/ifut/edit.vue')
    }
] as RouteRecordRaw[]
