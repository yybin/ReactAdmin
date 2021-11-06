import React, { Component } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/login/login'
import Admin from './pages/admin/admin'

export default class App extends Component {
    render() {
        return (
            <Routes>
                <Route path="/" element={<Admin />}/>
                <Route path="login" element={<Login />}/>
            </Routes>
        )
    }
}
