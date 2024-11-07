import router from "@/router/index";
import store from "@/store/index";
import {Provider} from "react-redux";
import {RouterProvider} from "react-router-dom";
import {ConfigProvider} from 'antd';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { Suspense } from "react";

dayjs.locale('zh-cn');

function App() {
    return (
        <Suspense>
            <ConfigProvider locale={zhCN}>
                <Provider store={store}>
                    <RouterProvider router={router}/>
                </Provider>
            </ConfigProvider>
        </Suspense>
    );
}

export default App;
