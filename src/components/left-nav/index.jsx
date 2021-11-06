import React, {useState, useEffect } from 'react'
import {Link, useLocation } from 'react-router-dom'
import { Menu } from 'antd';
import * as ICONS from '@ant-design/icons';
import menuList from '@/config/menuConfig'; 
import './index.less'
import logo from  '@/assets/images/logo192.png'

const { SubMenu } = Menu;

const icon = (name) => {
    return React.createElement(ICONS[name])
}

const LeftNav1 = () => {
    const [openKey, setOpenKey] = useState('')
    const [menuNodes, setMenuNodes] = useState([])
    const location = useLocation()
    const pathname = location.pathname

    const getMenuNodes = (menuList) => {
        return menuList.reduce((pre, item) => {
            // 向pre中添加 <Menu.Item> 或者 <SubMenu>
            if(!item.children || item.children.length === 0) {
                pre.push((
                    <Menu.Item key={item.key} icon={icon(item.icon)}><Link to={item.key}>{item.title}</Link></Menu.Item>
                ))
            } else {
                pre.push((<SubMenu key={item.key} icon={icon(item.icon)} title={item.title}>
                    {getMenuNodes(item.children)}
                </SubMenu>))
            }
            return pre
        },[])
    }

    useEffect(() => {
        setMenuNodes(getMenuNodes(menuList))
    }, [])
    return (<div className="left-nav">
                <Link to='/' className="left-nav-header">
                    <img src={logo} alt="img"></img>
                    <h1>后台管理</h1>
                </Link>
                <Menu
                    selectedKeys={[pathname]}
                    defaultOpenKeys={[openKey]}
                    mode="inline"
                    theme="dark"
                >
                    {menuNodes}
                </Menu>
        </div>
    )
}

/**
 * 左侧导航
 */
// class LeftNav extends Component {
//     /**
//      * 根据menu的数据数组生成对应的标签数组, 使用map() + 递归调用
//      * @param {Array} menuList 
//      */
//      getMenuNodes_Map = (menuList) => {
//         return menuList.map(item => {
//             if(!item.children || item.children.length === 0) {
//                 return (
//                     <Menu.Item key={item.key} icon={icon(item.icon)}><Link to={item.key}>{item.title}</Link></Menu.Item>
//                 )
//             } else {
//                 return( <SubMenu key={item.key} icon={icon(item.icon)} title={item.title}>
//                     {this.getMenuNodes(item.children)}
//                 </SubMenu>)
//             }
//         })
//     }
//     /**
//      * 根据menu的数据数组生成对应的标签数组, 使用map() + 递归调用
//      * @param {Array} menuList 
//      */
//     getMenuNodes = (menuList) => {
//         return menuList.reduce((pre, item) => {
//             // 向pre中添加 <Menu.Item> 或者 <SubMenu>
//             if(!item.children || item.children.length === 0) {
//                 pre.push((
//                     <Menu.Item key={item.key} icon={icon(item.icon)}><Link to={item.key}>{item.title}</Link></Menu.Item>
//                 ))
//             } else {
//                 pre.push((<SubMenu key={item.key} icon={icon(item.icon)} title={item.title}>
//                     {this.getMenuNodes(item.children)}
//                 </SubMenu>))
//             }
//             return pre
//         },[])
//     }

//     render() {
//         return (<div className="left-nav">
//                     <Link to='/' className="left-nav-header">
//                         <img src={logo} alt="img"></img>
//                         <h1>后台管理</h1>
//                     </Link>
//                     <Menu
//                         defaultSelectedKeys={['/home']}
//                         mode="inline"
//                         theme="dark"
//                     >
//                         {this.getMenuNodes(menuList)}
//                     </Menu>
//             </div>
//         )
//     }
// }

export default LeftNav1