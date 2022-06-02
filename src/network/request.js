/* 封装axios，然后项目中所有的网络请求都通过request.js请求，这样万一axios出现bug，只需要改这一个文件就行了
* */
import axios from "axios";

export function request(config) {
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/hy66',
    timeout: 500
  })

  // 请求拦截器
  instance.interceptors.request.use(config => {
    return config
  },error => {
    console.log(error)
  })

  // 响应拦截器
  instance.interceptors.response.use(res => {
    return res.data;
  }, error => {
    console.log(error)
  });

  // axios实例其实返回的就是一个Promise对象，所以这里直接把实例instance返回就可以了
  return instance(config)
}

