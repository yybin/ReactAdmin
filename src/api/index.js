/*
 包含应用中所有接口请求函数模块
*/
import ajax from './ajax'

// 登录
export const reqLogin = (username, password) => ajax('/api/login', {username, password}, 'POST')

// 添加用户
export const reqAdduser = (user) => ajax('/manage/user/add', user, 'POST')