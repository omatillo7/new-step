import { RouteRecordRaw } from 'vue-router'

// 404 on a page
export const ErrorPageRoute: RouteRecordRaw[] = [{
   path: '/:catchAll(.*)*',
   name: 'ErrorPage',
   component: () => import('@/layouts/blank.vue'),
   meta: {
      title: 'ErrorPage',
   },
   children: [
      {
         path: '/:catchAll(.*)*',
         name: 'ErrorPageSon',
         component: () => import('@/layouts/blank.vue'),
         meta: {
            title: 'ErrorPage',
         }
      }
   ]
}]
