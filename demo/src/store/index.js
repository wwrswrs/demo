import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)
//引入menu模块
import menu from "./modules/menu"
//引入角色模块
import role from "./modules/role"
//引入管理员模块
import manger from "./modules/manger"
//引入分类模块
import cate from "./modules/sort"
//引入商品规格模块
import specs from "./modules/specs"
//引入商品管理模块
import goods from "./modules/goods"
export default new Vuex.Store({
  modules:{
    menu,//:menu
    role,
    manger,
    cate,
    specs,
    goods
  }//解构赋值所以简写
})