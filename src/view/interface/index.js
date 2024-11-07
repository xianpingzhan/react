import React, {useState} from 'react';
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import {Button, Form, Input, Radio} from 'antd';
import http from "@/request/index"

const App = ({setData}) => {

    const {TextArea} = Input;
    const [form] = Form.useForm();
    const layout = {
        labelCol: {
            span: 6,
        },
        wrapperCol: {
            span: 16,
        },
        initialValues: {
            type: "get"
        }
    };
    const onFinish = (values) => {
        const ajax = values.type === "get" ? http.get : http.post;
        let params = values.params;
        try {
            params = JSON.parse(values.params)
        } catch (e) {

        }
        ajax(values.path, params).then(res => {
            setData(JSON.stringify(res, null, 4));
        }).catch(err => {
            setData(err);
        });
    };
    return (
        <Form
            {...layout}
            form={form}
            name="validateOnly"
            onFinish={onFinish}
            style={{
                maxWidth: "800px",
                margin: "50px auto"
            }}
            autoComplete="off">
            <Form.Item
                name="path"
                label="接口路径"
                rules={[
                    {
                        required: true,
                    },
                ]}>
                <Input/>
            </Form.Item>
            <Form.Item
                name="type"
                label="请求类型">
                <Radio.Group>
                    <Radio value="get"> Get </Radio>
                    <Radio value="post"> Post </Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item
                name="params"
                label="请求参数">
                <TextArea rows={4}/>
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    ...layout.wrapperCol,
                    offset: 8,
                }}
            >
                <Button type="primary" htmlType="submit">
                    提交
                </Button>
            </Form.Item>
        </Form>
    );
};
const Result = ({data}) => {
    return (
        <div
            style={{
                whiteSpace: "pre-wrap",
                display: "flex",
                justifyContent: "center"
            }}>
            <span>{data}</span>
        </div>
    )
}

export default function Interface() {
    const [resultData, setResultData] = useState("");
    const setData = data => {
        setResultData(data);
    }
    return (
        <>
            <App setData={setData}/>
            <Result data={resultData}/>
        </>
    )
};