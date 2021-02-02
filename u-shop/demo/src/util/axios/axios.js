import axios from 'axios'
//引入路由
import router from "../../router"

let http = axios.create({
  baseURL: "/api"//基础的接口
})



//axios拦截器
//请求拦截
http.interceptors.request.use(req => {
 
  //设置请求拦截后 要返回这个配置
  return req
})

//响应拦截  一般用于全局拦截错误   
http.interceptors.response.use(res=>{
 return res.data
})

export default http
//利用axios软件然后获取基础的接口