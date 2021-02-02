import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
   {
     path:"/index",
     component:()=>import("@/pages/index"),
     children:[
       {
         path:"/home",
         component:()=>import("@/views/home")
       },
       {
        path:"/cate",
        component:()=>import("@/views/cate")
      },
      {
        path:"/cart",
        component:()=>import("@/views/cart")
      },
      {
        path:"/mine",
        component:()=>import("@/views/mine")
      },
      {
        path:"",
        redirect:"/home"
      },
     ]
   },
   {
     path:"/list",
     component:()=>import("@/pages/goodslist")
   },
  {
    path:"*",
    redirect:"/index"
  },


  ]
})
