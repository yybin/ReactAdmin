import React, { Component } from 'react'
import { Outlet } from 'react-router'
/**
 * 商品分类
 */
export default class Product extends Component {
    render() {
        return (<>
                <Outlet />
            </>
        )
    }
}
