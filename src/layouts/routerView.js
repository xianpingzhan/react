import AuthRoute from "../router/listener";

import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, Breadcrumb } from 'antd';
const { Header, Sider, Content } = Layout;
const App = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Layout
            style={{
            height: "100%"
        }}
        >
            <Sider trigger={null} collapsible collapsed={collapsed}  theme="light">
                <div className="demo-logo-vertical" />
                <Menu
                    // theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <UserOutlined />,
                            label: 'nav 1',
                        },
                        {
                            key: '2',
                            icon: <VideoCameraOutlined />,
                            label: 'nav 2',
                        },
                        {
                            key: '3',
                            icon: <UploadOutlined />,
                            label: 'nav 3',
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header
                style={{
                    background: "#fff",
                    padding: 0
                }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Breadcrumb
                    style={{
                        margin: '16px 0',
                    }}
                >
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
                </Breadcrumb>
                <Content>
                    Content
                    <AuthRoute/>
                </Content>
            </Layout>
        </Layout>
    );
};

export default App