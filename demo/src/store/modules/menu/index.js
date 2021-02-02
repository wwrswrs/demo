//引入接口文件
import {getMenuList} from "../../../util/axios"


//这是一个仓库用  用来接受接口的数据

//创建一个模块state
const state = {
  menuList: []
}
//创建一个模块的getters 用来渲染的
const getters = {
  getMenuList(state) {
    return state.menuList
  }
}
//创建一个mutation
const mutations = {
  //获取菜单列表
  REQ_MENULIST(state,padload){
    state.menuList= padload
}
}
//创建一个模块的action
const actions = {
  //封装一个菜单列表行动  向接口传递数据然后提交
  getMenuListAction({commit}){
    getMenuList()//调取接口的名字
    .then(res=>{
      if(res.data.code===200){
        //提交一盒mutation
        commit("REQ_MENULIST",res.data.list)
      }
   console.log(res,"菜单列表")
 })
  }
}
//导出创建好这些属性
export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true//因为会有重复的名字所以加上这个以防混淆
}