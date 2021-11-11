import React, { useEffect, useState } from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import { Modal } from 'antd'
import {formateDate} from '@/utils/dateUtils'
import memoryUtils from '@/utils/memoryUtils'
import storageUtils from '@/utils/storageUtils'
import menuList from '@/config/menuConfig'
import LinkButton from '@/components/link-button'
// import {reqWeather} from '@/api'
import './index.less'

const Header = () => {
    // const [weather,setWeather] = useState({})
    const [date, setDate] = useState(formateDate(new Date()))
    const location = useLocation()
    const navigate = useNavigate()
    const pathname = location.pathname
    const getTitle = () =>  {
        let title
        menuList.forEach(item => {
            if(item.key === pathname) {
                title = item.title
            } else if(item.children) {
                const cItem = item.children.find(cItem => cItem.key === pathname)
                if(cItem) {
                    title = cItem.title
                }
            }
        })
        return title
    }

    const logout = () => {
       Modal.confirm({
           content: '确定退出吗?',
           okText: '确认',
           cancelText: '取消',
           onOk(){
               memoryUtils.user = {}
               storageUtils.removeUser()
               navigate('/login', {replace: true})
           }
       })
    }
    useEffect(() => {
        // async function getWeather(city) {
        //    const weather = await reqWeather(city)
        //    setWeather(weather)
        // }
        // getWeather('北京')
        const timer = setInterval(() => {
            setDate(formateDate(new Date()))
        },1000)
        
        return () =>  {
            clearInterval(timer)
        }
    }, [])

    const user = memoryUtils.user
    const title = getTitle()
    return (
        <div className="header">
            <div className="header-top">
                <span>欢迎，{user.username}</span>
                <LinkButton onClick={() => logout()}>退出</LinkButton>
            </div>
            <div className="header-bottom">
                <div className="header-bottom-left">{title}</div>
                <div className="header-bottom-right">
                    <span>{date}</span>
                    <img src={''} />
                    <span>{'晴'}</span>
                </div>
            </div>
        </div>
    )
}

export default Header