import React from "react";
import {Navigate} from 'react-router-dom';
import element from "./element";
import AuthRoute from "./listener";
//路由懒加载
const lazyComponent = path => {
    const Module = React.lazy(path);
    return <Module/>
}

// 配置路由映射 （不同的路由对应渲染不同的页面组件）
const router = [
    {
        path: "*",
        element: lazyComponent(element.NotFound),
    },
    {
        path: "/login",
        name: "login",
        element: lazyComponent(element.Login),
    },
    {
        path: "/",
        element: lazyComponent(element.RouterView),
        children: [
            {
                // 默认嵌套路由
                index: true,
                element: <Navigate to="/home"/>,
            },
            {
                path: "home",
                element: lazyComponent(element.Home),
            },
        ]
    },
];

export default router;