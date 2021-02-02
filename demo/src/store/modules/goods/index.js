//引入接口模块
import { getGoodsList, getGoodsCount } from "../../../util/axios"
//封装所以模块的核心属性
const state = {
  goodsList: [],
  size: 2,//条数
  page: 1,//页数
  countNum: 0//总条数
}
const getters = {
  //管理员列表
  getGoodsList(state) {
    return state.goodsList
  },
  //条数，当然页面渲染个数
  getGoodsSize(state) {
    return state.size
  },
  getCountNum(state) {
    return state.countNum
  },
}
const mutations = {
  REQ_GOODSLIST(state, payload) {
    state.goodsList = payload
  },
  REQ_COUNT(state, payload) {
    state.countNum = payload
  },
  //修改页码
  CHANGE_PAGE(state, payload) {
    state.page = payload
  }
}
const actions = {
  //封住一个获取管理员列表的行动
  getGoodsListAction(payload) {
    getGoodsList({
      size: payload.state.size,
      page: payload.state.page
    })
      .then(res => {
        console.log(res, "管理员列表");
        if (res.data.code === 200) {
          //如果返回值为空 就返回一个空数组
          let list = res.data.list ? res.data.list : []
          //提交一个mutationstate中mangerlist的值
          payload.commit("REQ_GOODSLIST", list)
          //如果你的返回数据是一个空数组并不是第一页那就页码减一
          if (payload.state.page != 1 && list.length == 0) {
            payload.dispatch("changePageAction", payload, state.page - 1)
            return
          }
        }
      })
  },
  getCountAction(payload) {
    getGoodsCount()
      .then(res => {
        console.log(res, "aaaaaaaa")
        if (res.data.code === 200) {
          payload.commit("REQ_COUNT", res.data.list[0].total)
        }
      })
  },
  //封装一个修改page行动
  changePageAction(context, payload) {
    //触发mutation
    context.commit("CHANGE_PAGE", payload)
    context.dispatch("getGoodsListAction")
  }
}
export default {
  state,
  mutations,
  getters,
  actions,
  namespaced: true
}