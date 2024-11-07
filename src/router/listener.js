import React from 'react';
import {Navigate, Outlet, useLocation} from "react-router-dom";
import {getData} from "@/store/module/user";

export default function AuthRoute(props) {
    const location = useLocation();
    console.log(props);
    console.log(location);
    if (getData("token")) {
        return <Outlet/>
    }
    return <Navigate to={`/login`}/>
}