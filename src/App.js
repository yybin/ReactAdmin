import React, { Component } from 'react'
import { Route, Routes, Navigate, Outlet } from 'react-router-dom'
import Login from './pages/login/login'
import Admin from './pages/admin/admin'

import Home from '@/pages/home/home'
import CateGory from '@/pages/category/category'
import ProductHome from '@/pages/product/home'
import Product from '@/pages/product/product'
import ProductAddUpdate from '@/pages/product/add-update'
import ProductDetail from '@/pages/product/detail'
import Role from '@/pages/role/role'
import User from '@/pages/user/user'
import Bar from '@/pages/charts/bar'
import Line from '@/pages/charts/line'
import Pie from '@/pages/charts/pie'

export default class App extends Component {
    render() {
        return (
            <Routes>
                <Route path="/" element={<Admin />}>
                        <Route index element={<Navigate to="/home" replace />}/>
                        <Route path='home' element={<Home />}/>
                        <Route path='category' element={<CateGory />}/>
                        <Route path='product' element={<Product />}>
                            <Route index element={<Navigate to="/product/home" replace />}/>
                            <Route path='home' element={<ProductHome/>}/>
                            <Route path='addupdate' element={<ProductAddUpdate/>}/>
                            <Route path='detail/:id' element={<ProductDetail/>}/>
                        </Route>
                        <Route path='role' element={<Role />}/>
                        <Route path='user' element={<User />}/>
                        <Route path="charts" element={<Outlet/>}>
                            <Route index element={<Navigate to="/charts/bar" replace />}/>
                            <Route path='bar' element={<Bar />}/>
                            <Route path='line' element={<Line />}/>
                            <Route path='pie' element={<Pie />}/>
                        </Route>
                </Route>
                <Route path="/login" element={<Login />}/>
            </Routes>
        )
    }
}
