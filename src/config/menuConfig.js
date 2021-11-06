 const menuList =  [
    {
        title: '首页',
        key: '/home',
        icon: 'PieChartOutlined',
    }, {
        title: '商品',
        key: '/products',
        icon: 'MailOutlined',
        children: [
            {
                title: '品类管理',
                key: '/category',
                icon: 'PieChartOutlined',
            },{
                title: '商品管理',
                key: '/product',
                icon: 'PieChartOutlined',
            },
        ]
    },{
        title: '用户管理',
        key: '/user',
        icon: 'UserOutlined',
    },{
        title: '角色管理',
        key: '/role',
        icon: 'UserOutlined',
    }
]

export default menuList