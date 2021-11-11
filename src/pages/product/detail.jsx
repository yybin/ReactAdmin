import React from 'react'
import {List, Card } from 'antd'
import {useParams} from 'react-router-dom'
import {ArrowLeftOutlined} from '@ant-design/icons'
import './index.less'

const {Item} = List

function Detail() {
    const {id} = useParams()
    console.log(id)

    const title = (<span><ArrowLeftOutlined /><span> 商品详情</span></span>)

    return (
        <Card title={title} className="product-detail">
            <List>
                <Item>
                    <span className="left">商品名称:</span>
                    <span>测试商品</span>
                </Item>
                <Item>
                    <span className="left">商品描述:</span>
                    <span>测试商品</span>
                </Item>
            </List>    
        </Card>
    )
}

export default Detail
