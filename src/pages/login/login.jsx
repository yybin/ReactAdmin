import React from 'react'
import {createForm} from '@formily/core'
import {createSchemaField } from '@formily/react' 
import {FormItem, Form, Input, Password, Submit} from '@formily/antd'
import {Card} from 'antd'
import {LockOutlined, UserOutlined} from '@ant-design/icons'
const form = createForm()

const SchemaField = createSchemaField({
    components: {
        FormItem, 
        Input, Password
    }
})

const schema = {
    type: 'object',
    properties: {
        username: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-component-props': {
                prefix: <UserOutlined />,
            },
            'x-validator': [{required: true, message: '请输入用户名'}]
        },
        password: {
            type: 'string',
            // title: '密码',
            'x-validator': [{required: true, message: '请输入密码'}],
            'x-decorator': 'FormItem',
            'x-component': 'Password',
            'x-component-props': {
                prefix: <LockOutlined />,
                checkStrength: true,
            }
        }
    }
}

const Login =  () => {
    return (
        <div style={{display: 'flex', height: '100vh', width: '100%', justifyContent:'center', alignItems:"center", background: '#eee'}}>
            <Card title={'登录'} style={{width: 400}}>
                <Form
                form={form}
                layout="vertical"
                size="large"
                onAutoSubmit={console.log}
                >
                    <SchemaField schema={schema}/>
                    <Submit size="large" block>登录</Submit>
                </Form>
            </Card> 
        </div>
    )
}

/**
1. 高阶函数 
    1）一类特别的函数
        a. 接受函数类型的参数
        b. 返回值是函数
    2）常见
        a. 定时器： setTimeout()/setInterval()
        b. Promise: Promise(() => {}).then(value => {}, reason={}) 
        c. 数组遍历相关的方法: forEach()/filter()/map()/reduce()/find()/findInde()
        d. 函数对象bind()
    3) 高阶函数更加动态，更加具有扩展性

2. 高阶组件
    1）本质是一个函数
    2）接受一个组件（被包装组件），返回一个新的组件（包装组件），包装组件会向被包装组件传入特定属性
    3）作用：扩展组件功能
    4）高阶组件也是高阶函数： 接受一个组件函数，返回是一个新的组件函数
 */
export default Login