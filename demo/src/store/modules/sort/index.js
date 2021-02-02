//引入接口文件
import {getCateList} from "../../../util/axios"


//这是一个仓库用  用来接受接口的数据

//创建一个模块state
const state = {
  cateList: []
}
//创建一个模块的getters 用来渲染的
const getters = {
  getCateList(state) {
    return state.cateList
  }
}
//创建一个mutation
const mutations = {
  //获取分类列表
  REQ_CATELIST(state,padload){
    state.cateList= padload
}
}
//创建一个模块的action
const actions = {
  //封装一个分类列表行动  向接口传递数据然后提交
  getCateListAction({commit}){
    getCateList()//调取接口的名字
    .then(res=>{
      if(res.data.code===200){
        //提交一个mutation
        commit("REQ_CATELIST",res.data.list)
      }
   console.log(res,"分类列表")
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