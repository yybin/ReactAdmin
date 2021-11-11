import React, {useState, useEffect} from 'react'
import {Card, Input,  Select, Button,Table} from 'antd'
import { Link } from 'react-router-dom'
import LinkButton from '@/components/link-button'
import {reqProducts, reqSearchProducts} from '@/api'
import {PAGE_SIZE} from '@/utils/constants'

function Home() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [total, setTotal] = useState(0)
    const [searchType, setSearchType] = useState('productName')
    const [searchName, setSearchName] = useState('')

    const getProducts = async (data) => {
        setLoading(true)
        let result
        if(!data.searchName) {
            result = await reqProducts({pageSize: PAGE_SIZE, ...data})
        } else {
            result = await reqSearchProducts({pageSize: PAGE_SIZE, ...data })
        }
        setLoading(false)
        if(result.status ===0 ) {
            setProducts(result.data.list)
            setTotal(result.data.total)
        }
    }
    useEffect(() => {
        getProducts({pageNum: 0})        
    }, [])
    const columns = [
        {dataIndex:'name', title: '商品名称'},
        {dataIndex:'desc', title: '商品描述'},
        {dataIndex:'price', title: '价格', render: (value) => `¥${value}`},
        {dataIndex: 'status', title: '状态', width: 140,
        render: (status) => (<span><Button type='primary'>下架</Button> 在售</span>)},
        {title: '操作', width: 120,
        render: () => {
            return [<LinkButton>编辑</LinkButton>, <Link to="/product/detail">查看</Link>]
        }}
    ]
    const title = (<span>
        <Select style={{width:150}} value={searchType} onChange={(value) =>setSearchType(value)}>
            <Select.Option value="productName">按名称搜索</Select.Option>
            <Select.Option value="productDesc">按描述搜索</Select.Option>
        </Select>
        <Input placeholder="关键字" style={{width:150, margin: '0 15px'}}  value={searchName} onChange={(e) => setSearchName(e.target.value)}/>
        <Button type="primary" onClick={() => getProducts({pageNum:1, searchType, searchName})}>搜索</Button>
    </span>)
    const extra = (<Button type="primary">添加商品</Button>)
    return (
        <Card title={title} extra={extra}>
            <Table loading={loading } bordered={true} columns={columns} dataSource={products} rowKey="_id" pagination={{
                total,
                defaultPageSize: PAGE_SIZE,
                showQuickJumper: true,
                onChange: (pageNum) => {getProducts({pageNum})}
            }} />
        </Card>
    )
}

/**
 分页： 
    1）纯前台分页
        请求获取数据：一次性获取所有数据，翻页时不需要再发请求
        请求接口： 不需要指定 页码（pageNum）和每页数量（pageSize）
    2) 接口分页
        请求获取数据： 每次只获取当前页的数据， 翻页时要发请求
        请求接口：
            需要指定请求参数：页码（pageNum）和每页数量（pagesize）
            相应数据 需要返回总记录数total
    3) 如何选择？
        基本根据数据多少来选择
*/
export default Home
