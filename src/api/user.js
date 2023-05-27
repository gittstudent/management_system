import request from '../utils/request'

// 获取验证码
export function getCode(data) {
  return request({
    url: '/send/code',
    method: 'post',
    data
  })
}

// 登录接口
export function login(data) {
  return request({
    url: '/user/register',
    method: 'post',
    data
  })
}


// 修改用户接口
export function editUser(data) {
  return request({
    url: '/muser/edit',
    method: 'post',
    data
  })
}


// get接口
export function getUser(data) {
  return request({
    url: '/muser/info',
    method: 'get',
    params:data
  })
}
