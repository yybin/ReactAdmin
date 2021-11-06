/* craco.config.js */
const CracoLessPlugin = require('craco-less');
const path = require('path');

module.exports = {
    plugins: [
        {
          plugin: CracoLessPlugin,
          options: {
            lessLoaderOptions: {
              lessOptions: {
                modifyVars: { '@primary-color': '#1DA57A' },
                javascriptEnabled: true,
              },
            },
          },
        },
    ],
    babel:{  
        plugins: [
            ["@babel/plugin-proposal-decorators", { legacy: true }],  //装饰器
            [   
              "import", 
              {
                "libraryName": "antd",
                "libraryDirectory": "es",
                 "style": true //设置为true即是less
               }
           ]
        ]
    },
     //配置代理解决跨域
    devServer: {
        proxy: {
            "/api": {
                target: "http://localhost:8080",  
                changeOrigin: true,
                pathRewrite: {
                    "^/api": ""
                }
            }
        }
    },
    webpack: {
        // 别名
        alias: {
          "@": path.resolve("src"),
          "@utils": path.resolve("src/utils"),
        }
    },
};