import http from "./axios"//获取axios方法的文件夹
//前台移动端管理接口集合
//获取轮播图的接口
export function getBanner(){
  return http.get("/api/getbanner")
}
//获取商品列表的接口
export function getIndexGoodsList(){
  return http.get("/api/getindexgoods")
}

//获取一个封装列表接口
export function getCateList(){
  return http.get("/api/getcatetree")
}
//封装商品分类的列表
export function getGoods(params){
  return http.get("/api/getgoods",{
    params
  })
}
