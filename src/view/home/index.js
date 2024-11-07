import React from "react";
import {useNavigate, Outlet} from "react-router-dom";
import {Button} from "antd";
import Router from "@/router/index"
import Index from "@/view/index/index"

export default function () {
    const navigate = useNavigate();
    console.log(111);
    const btnClick = () => {
        Router.routes.forEach(f => {
            if (f.path === "/"){
                f.children.push({
                    path: '/test',
                    element: <Index/>
                })
            }
        })
        console.log(Router);
        navigate("/test")
    }
    return (
        <>
            <Button onClick={btnClick}>添加路由页面</Button>
            <h1>这是Home页</h1>
            <Outlet/>
        </>
    )
}