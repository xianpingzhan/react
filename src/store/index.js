import { configureStore } from "@reduxjs/toolkit"
import user from "./module/user"
export default configureStore({
    reducer: {
        // 这里放入各个模块
        user
    },
});