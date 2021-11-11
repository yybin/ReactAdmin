import React, {useState, useEffect} from 'react'
import {
    Table, 
    Card,
    Button,
    message,
} from 'antd'
import {PlusOutlined, ArrowRightOutlined} from '@ant-design/icons'
import {createForm} from '@formily/core'
import { createSchemaField, Field } from '@formily/react'
import {FormDialog, FormItem, FormLayout, Input, Select} from '@formily/antd'
import LinkButton from '@/components/link-button'
import {reqCategorys, reqAddCategory, reqUpdateCategory} from '@/api'

const SchemaField = createSchemaField({
    components: {
      FormItem,
      Input,
      Select
    },
})

/**
 * 商品分类
 */
const Category = () => {
    const [categorys, setCategorys] =  useState([]) //一级分类列表
    const [subCategorys, setSubCategorys] =  useState([]) // 二级分类列表
    const [parentCategory, setParentCategory] =  useState({parentId: '0', parentName: ''})
    const [loading, setLoading] =  useState(false)
   
    const getCategorys = async () => {
        setLoading(true)
        const result = await reqCategorys(parentCategory.parentId)
        setLoading(false)
        if(result.status === 0) {
            const categroys = result.data
            if(parentCategory.parentId === '0') {
                setCategorys(categroys)
            } else {
                setSubCategorys(categroys)
            }
            
        } else {
            message.error('获取分类列表数组失败')
        }
    }
    const showSubCategory = (category) => {
        setParentCategory({parentId: category._id, parentName: category.name})
    }

    const showDialog = (type, data = {}) => {
      const schema = {
        type: 'object',
        properties: {
          parentId: {
            type: 'string',
            title: '一级分类',
            required: true,
            enum: parentCategory.parentId === '0' ? [{label:'root', value: '0'}] :categorys.map(category => ({label: category.name, value: category._id})),
            'x-decorator': 'FormItem',
            'x-component': 'Select',
            'x-disabled': type === 'add' ? false : true,
          },
          categoryName: {
            type: 'string',
            title: '分类名称',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-component-props': {
              placeholder: '请输入分类名称'
            }
          },
        },
      }
      FormDialog(`${type==='add'?'添加':'修改'}${parentCategory.parentId === '0'? '一级':'二级'}分类`, () => {
        return (
          <FormLayout labelCol={6} wrapperCol={10}>
            <SchemaField schema={schema} />
          </FormLayout>
        )
      }).forOpen((payload, next) => {
          next({initialValues:{
            parentId: parentCategory.parentId,
            categoryName: data?.name ?? ''
          }})
        }).forConfirm((payload, next) => next(payload))
        .open()
        .then((formData) => {
            if(type=== 'add') {
              return  reqAddCategory(formData)
            } else {
              return  reqUpdateCategory({...formData, categoryId: data._id})
            }
        }).then(value => {
           message.info('保存成功')
           getCategorys()
        }, reason => {
          message.error('保存失败', reason)
        })
    }

    const columns = [{
        dataIndex: 'name',
        title:'分类名称'
    }, {
        title:'操作',
        width:300,
        render: (category) => {
            return ([
            <LinkButton key={1} onClick={() => showDialog('update', category)}>修改分类</LinkButton>,
            parentCategory.parentId === '0' && <LinkButton key={2} onClick={() => showSubCategory(category)}>查看子分类</LinkButton>])
        }
    }]
    const title = parentCategory.parentId === '0' ? '一级分类列表':(<span><LinkButton onClick={() => setParentCategory({parentId: '0', parentName: ''})}>一级分类列表</LinkButton><ArrowRightOutlined /> {parentCategory.parentName}</span>)
    const extra = (<FormDialog.Portal><Button icon={<PlusOutlined />} type="primary" onClick={() => showDialog('add', undefined)}>添加</Button></FormDialog.Portal>)

    useEffect(() => {
        // 获取一级分类列表
        getCategorys()
    },[parentCategory])

    return(
        <Card title={title} extra={extra}>
            <Table 
                dataSource={parentCategory.parentId === '0' ? categorys: subCategorys}
                columns={columns}
                bordered
                rowKey={'_id'}
                loading={loading}
                pagination={{pageSize: 5, showQuickJumper: true}}
            />
        </Card>
    )
}
export default Category
