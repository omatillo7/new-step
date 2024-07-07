import { RouteRecordRaw } from 'vue-router'

const baseBreadCrumbs = [
    {
        title: 'MainPage',
        to: "/dashboard",
    },
    {
        title: 'Basecalculationamount',
        to: { name: 'Basecalculationamount' },
    },
]

export default [
    {
        path: 'basecalculationamount',
        name: 'Basecalculationamount',
        meta: {
            title: 'Basecalculationamount',
            activeMenu: 'Basecalculationamount',
            breadcrumbs: baseBreadCrumbs
        },
        component: () => import('@/pages/basecalculationamount/index.vue')
    },
    {
        path: 'basecalculationamount/:id',
        name: 'basecalculationamountEdit',
        meta: {
            title: 'Basecalculationamount',
            activeMenu: 'Basecalculationamount',
            breadcrumbs: [
                ...baseBreadCrumbs,
                {
                    title: 'Add',
                },
            ]
        },
        component: () => import('@/pages/basecalculationamount/edit.vue')
    }
] as RouteRecordRaw[]
