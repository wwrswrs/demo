import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)
//设定二级路由配置项
export const indexRoutes = [
  {
    path: "/menu",
    component: () => import("@/views/menu/menu"),
    name: "菜单管理"
  },
  {
    path: "/role",
    component: () => import("@/views/role/role"),
    name: "角色管理"

  },
  {
    path: "/manger",
    component: () => import("@/views/manger/manger"),
    name: "管理员管理"
  },
  {
    path: "/goods",
    component: () => import("@/views/goods/goods"),
    name: "商品管理"
  },
  {
    path: "/sort",
    component: () => import("@/views/sort/sort"),
    name: "商品分类"
  },
  {
    path: "/banner",
    component: () => import("@/views/banner/banner"),
    name: "轮播图"
  },
  {
    path: "/seck",
    component: () => import("@/views/seck/seck"),
    name: "秒杀管理"
  },
  {
    path: "/specs",
    component: () => import("@/views/specs/specs"),
    name: "商品规格管理"
  },
  {
    path: "/member",
    component: () => import("@/views/member/member"),
    name: "会员管理"
  },
];
const router=new Router({
  routes: [
    {
      path: "/login",
      component: () => import("@/pages/login")
    },
    {
      path: "/index",
      component: () => import("@/pages/index"),
      children: [
        {
          path: "/home",
          component: () => import("@/views/home")
        },
        ...indexRoutes,
        {
          path: " ",
          redirect: "/home"
        }
      ]

    },
    {
      path: "*",
      redirect: "/login"
    }
  ]
})


//全局导航守卫登录拦截
router.beforeEach((to,from,next)=>{
  //如果你去的是登录就next  如果你有登录状态就next 都没有强制跳转回登录页
  if(to.path=="/login"){
   next()
   return
  }
  if (sessionStorage.getItem("loginInfo")) {
    next()
    return
  }
  next("/login")
})
export default router
