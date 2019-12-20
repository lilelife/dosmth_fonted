import Vue from 'vue'
import Router from 'vue-router'
import Dosomething from '@/components/Dosomething'
import Index from '@/components/Index'
import Book from '@/components/Dos/Book'
import Plan from '@/components/Dos/Plan'
import Sport from '@/components/Dos/Sport'
import Tools from '@/components/Dos/Tools'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/sport'
      ,name: 'Sport',
      component: Sport
    },
    {
      path: '/dosomething',
      name: 'Dosomething',
      component: Dosomething,
       children:[{
        path:'/dosomething/book',
        name:'book',
        component:Book
      },{
        path:'/dosomething/sport',
        name:'sport',
        component:Sport
      },{
        path:'/dosomething/plan',
        name:'plan',
        component:Plan
      },{
        path:'/dosomething/tools',
        name: 'tools',
        component: Tools
      }
      ]

    }
  ]
})
