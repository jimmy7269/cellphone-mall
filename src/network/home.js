import {request} from "@/network/request";

export function requestHomeData() {
  // 其实返回的还是一个Promise，直接传入Home的url，返回之后直接拿取数据就行了
  // 请求首页数据
   return request({
    url: '/home/multidata'
  })
}

export function requestHomeGoods(type,page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page,
    }
  })
}
