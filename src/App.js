import React, { Component } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/login/login'
import Admin from './pages/admin/admin'

import Home from '@/pages/home/home'
import CateGory from '@/pages/category/category'
import Product from '@/pages/product/product'
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
                        <Route path='home' element={<Home />}/>
                        <Route path='category' element={<CateGory />}/>
                        <Route path='product' element={<Product />}/>
                        <Route path='role' element={<Role />}/>
                        <Route path='user' element={<User />}/>
                        <Route path='charts/bar' element={<Bar />}/>
                        <Route path='charts/line' element={<Line />}/>
                        <Route path='charts/pie' element={<Pie />}/>
                </Route>
                <Route path="/login" element={<Login />}/>
            </Routes>
        )
    }
}
