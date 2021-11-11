/*
 包含应用中所有接口请求函数模块
*/
import jsonp from 'jsonp'
import {message} from 'antd'
import ajax from './ajax'

const BASE = '/api'

// 登录
export const reqLogin = (username, password) => ajax(`${BASE}/login`, {username, password}, 'POST')

// 添加用户
export const reqAdduser = (user) => ajax(`${BASE}/manage/user/add`, user, 'POST')

/*
json请求的接口请求函数
 */
export const reqWeather = (city) => {
    return new Promise((resolve, reject) => {
      const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
      // 发送jsonp请求
      jsonp(url, {}, (err, data) => {
        console.log('jsonp()', err, data)
        // 如果成功了
        if (!err && data.status==='success') {
          // 取出需要的数据
          const {dayPictureUrl, weather} = data.results[0].weather_data[0]
          resolve({dayPictureUrl, weather})
        } else {
          // 如果失败了
          message.error('获取天气信息失败!')
        }
      })
    })
}

//获取产品分类列表
export const reqCategorys = (parentId) => ajax(`${BASE}/manage/category/list`, {parentId})

//添加分类
export const reqAddCategory = ({parentId, categoryName}) => ajax(`${BASE}/manage/category/add`, {parentId, categoryName}, 'POST')

//更新分类
export const reqUpdateCategory = ({categoryId, categoryName}) => ajax(`${BASE}/manage/category/update`, {categoryId, categoryName}, 'POST')


//获取产品列表
export const reqProducts = (data) => ajax(`${BASE}/manage/product/list`, data)
// 搜索商品分页列表

export const reqSearchProducts = ({pageNum, pageSize,searchType, searchName}) => ajax(`${BASE}/manage/product/search`, {
  pageNum,
  pageSize,
  [searchType]: searchName
})

//获取角色列表
export const reqRoles = () => ajax(`${BASE}/manage/role/list`)
//添加角色
export const reqAddRole = (roleName) => ajax(`${BASE}/manage/role/add`, {roleName}, 'POST')
