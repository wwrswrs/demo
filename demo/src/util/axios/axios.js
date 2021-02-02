import axios from 'axios'
//引入路由
import router from "../../router"

let http = axios.create({
  baseURL: "/api"//基础的接口
})




//axios拦截器
//请求拦截
http.interceptors.request.use(req => {
  console.log(req, "请求拦截")
  let token = sessionStorage.getItem("loginInfo") ? JSON.parse(sessionStorage.getItem("loginInfo")).token : " "
  req.headers.authorization = token
  //设置请求拦截后 要返回这个配置
  return req
})

//响应拦截  一般用于全局拦截错误   
http.interceptors.response.use(res=>{
  console.log(res,"响应1111111")
  if(res.data.code===500){ 
    alert(res.data.msg)
    router.push("/login")
  }else if(res.data.code===403){
  //token验证过期请重新登录
  alert(res.data.msg)
    router.push("/login")
}else{
  return  res
}
})

export default http
//利用axios软件然后获取基础的接口