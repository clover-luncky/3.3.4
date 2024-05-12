import { defineAsyncComponent } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    path: '/',
    name: 'home',
    redirect: '/dataSource'
  },{
      path: '/app/dataSource',
      name: 'dataSource',
      component: defineAsyncComponent(() => import('../views/DataSourceView.vue')),
      children: [{
        path: ':id',
        component: defineAsyncComponent(() => import('../views/DataSourceContent/DataSourceContent.vue')),
      }, {
        path: '',
        redirect: '/app/dataSource/1'
      }]
    }, {
      path: '/app/layout',
      name: 'layout',
      component: defineAsyncComponent(() => import('../views/LayoutView.vue'))
    }, {
      path: '/app/actions',
      name: 'actions',
      component: defineAsyncComponent(() => import('../views/ActionsView.vue'))
    }]
})

export default router
