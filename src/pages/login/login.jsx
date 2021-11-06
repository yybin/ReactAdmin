import React from 'react'
import {createForm} from '@formily/core'
import {createSchemaField } from '@formily/react' 
import {FormItem, Form, Input, Password, Submit} from '@formily/antd'
import {Card, message} from 'antd'
import {LockOutlined, UserOutlined} from '@ant-design/icons'
import {Navigate, useNavigate} from 'react-router-dom'
import {reqLogin} from '@/api'
import memoryUtils from '@utils/memoryUtils'
import storageUtils from '@utils/storageUtils'

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
    const navigate = useNavigate()
    const user = memoryUtils.user
    if(user && user._id) {
        return <Navigate to="/home" replace />
    }
    return (
        <div style={{display: 'flex', height: '100vh', width: '100%', justifyContent:'center', alignItems:"center", background: '#eee'}}>
            <Card title={'登录'} style={{width: 400}}>
                <Form
                    form={form}
                    layout="vertical"
                    size="large"
                    onAutoSubmit={async (data) => {
                        const {username,  password} = data
                        const result = await reqLogin(username, password)
                        if(result.status === 0 ) { //登录成功
                            message.info('登录成功')
                            const user = result.data
                            // 保存user
                            memoryUtils.user = user
                            storageUtils.saveUser(user)
                            navigate('/', {replace: true})
                        } else { // 登录失败
                            message.error(result.msg)
                        }
                    }}
                >
                    <SchemaField schema={schema}/>
                    <Submit size="large" block>登录</Submit>
                </Form>
            </Card> 
        </div>
    )
}

/**
 async await
 1 作用
    简化promise对象的使用，不在使用then()来指定成功/失败的对调函数
    以同步编码(没有回调函数)方式实现异步流程
2 哪里写await
    在返回promise的表达式左侧写await,
 */
export default Login