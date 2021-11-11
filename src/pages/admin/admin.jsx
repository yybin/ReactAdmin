import React from 'react'
import {Layout} from 'antd'
import { Outlet } from 'react-router-dom'
import memoryUtils from '@utils/memoryUtils'
import {Navigate} from 'react-router-dom'
import LeftNav from '@/components/left-nav'
import Header from '@/components/header'

const { Content, Footer, Sider } = Layout;

const Admin = () => {
    const user = memoryUtils.user
  
    if(!user._id) {
        return <Navigate to="/login" replace />;
    }
    return(
        <Layout style={{height: '100vh'}}>
            <Sider>
                <LeftNav />
            </Sider>
            <Layout>
                <Header>Header</Header>
                <Content style={{ margin: '20px 20px', backgroundColor: '#fff'}}>
                    <Outlet />
                </Content>
                <Footer style={{textAlign:'center', color:'#ccc'}}>推荐使用谷歌浏览器,可以获得更加页面操作体验</Footer>
            </Layout>
        </Layout>
    )
}

export default Admin