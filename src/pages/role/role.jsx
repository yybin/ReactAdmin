import React, { useState, useEffect } from 'react'
import {Table, Card, Button, message} from 'antd'
import { createSchemaField } from '@formily/react'
import {FormDialog, FormItem, FormLayout, Input, Select} from '@formily/antd'
import {PAGE_SIZE} from '@/utils/constants'
import {reqRoles, reqAddRole} from '@/api'

const SchemaField = createSchemaField({
    components: {
      FormItem,
      Input,
      Select
    },
})

const addRoleDialog = (callback) => {
    const schema = {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          title: '角色名称',
          required: true,
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          'x-component-props': {
            placeholder: '请输入角色名称'
          }
        },
      },
    }
    FormDialog(`添加角色`, () => {
      return (
        <FormLayout labelCol={6} wrapperCol={10}>
          <SchemaField schema={schema} />
        </FormLayout>
      )
    }).forOpen((payload, next) => {
        next({initialValues:{}})
      }).forConfirm((payload, next) => next(payload))
      .open()
      .then((formData) => {
          return reqAddRole(formData.name)
      }).then(value => {
          console.log(value)
          if(value.status === 0) {
            callback && callback (value.data)
            message.info('添加成功')
          } else {
            message.error(value.msg)
          }
      }, reason => {
        message.error('保存失败', reason)
      })
}

/**
 * 商品分类
 */
export default () => {
    const [roles, setRoles] = useState([])
    const [role, setRole] = useState({})
    const [loading, setLoading] = useState(false)
    const columns = [{
        title: '角色名称',
        dataIndex: 'name'
    }, {
        title: '创建时间',
        dataIndex: 'create_time'
    },{
        title: '授权时间',
        dataIndex: 'auth_time',
    },{
        title: '授权人',
        dataIndex: 'auth_name'
    }]
    
    const getRoles = async () => {
        setLoading(true)
        const reuslt = await reqRoles()
        setLoading(false)
        if(reuslt.status === 0) {
            setRoles(reuslt.data)
        } else {
            message.error('获取角色数据失败')
        }
    }

    const title = (<span><Button type="primary" onClick={() => addRoleDialog((newRole) => {setRoles([...roles, newRole])})}>创建角色</Button> &nbsp;&nbsp;<Button disabled={!role._id} type="primary">设置角色权限</Button></span>)
    
    useEffect(() => {
        getRoles()
    },[])
    return (
        <Card title={title}>
            <Table 
                bordered
                rowKey="_id"
                columns={columns}
                dataSource={roles}
                loading={loading}
                rowSelection={{
                    type: 'radio',
                    selectedRowKeys: [role?._id]
                }}
                onRow={(record) => {
                    return {
                        onClick: event => {
                            setRole(record)
                        }
                    }
                }}
                pagination={{defaultPageSize: PAGE_SIZE}}
            />
        </Card>
    )
}
