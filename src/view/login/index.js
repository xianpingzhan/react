import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {Button, Checkbox, Form, Input, Flex, message} from 'antd';
import particlesJS from "@/utils/particles";
import {useDispatch} from 'react-redux';
import {getData, setRememberAccount, setToken} from '@/store/module/user';
import CryptoJS from "crypto-js";
import "./index.less";

// 前后端约定好的
const key = CryptoJS.SHA256("account").toString(CryptoJS.enc.Base64);

function decryptAes(content) {
    if (!content){
        return {}
    }
    const bytes  = CryptoJS.AES.decrypt(content, key);
    const value = bytes.toString(CryptoJS.enc.Utf8);
    if (typeof value === "string") {
        return JSON.parse(value || '{}');
    }
    return value;
}
function encryptAes(content){
    return CryptoJS.AES.encrypt(content, key).toString();
}

const LoginForm = () => {
    const navigate = useNavigate();
    const rememberAccount = decryptAes(getData("rememberAccount"));
    const [checked, setChecked] = useState(!!rememberAccount.checked);
    const [fields, setFields] = useState([
        {
            name: ['account'],
            value: rememberAccount.account,
        },
        {
            name: ['password'],
            value: rememberAccount.password,
        },
    ]);
    const dispatch = useDispatch();
    const onFinish = (values) => {
        message.destroy();
        if (values.account === 'admin' && values.password === '123456') {
            message.success("登录成功");
            const accountStorage = encryptAes(JSON.stringify({
                ...values,
                checked: checked
            }));
            dispatch(setRememberAccount(accountStorage));
            dispatch(setToken(accountStorage))
            navigate("/home")
            return
        }
        message.error("登录失败");
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div id="login-form">
            <h2>React+Antd搭建模板</h2>
            <Form
                style={{
                    width: "100%"
                }}
                initialValues={{
                    remember: true,
                }}
                fields={fields}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    name="account"
                    rules={[
                        {
                            required: true,
                            message: '请输入您的账号!',
                        },
                    ]}
                >
                    <Input placeholder="请输入账号"/>
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: '请输入您的密码!',
                        },
                    ]}
                >
                    <Input.Password placeholder="请输入密码"/>
                </Form.Item>

                <Form.Item>
                    <Flex justify={'space-between'} align={'center'}>
                        <Checkbox checked={checked} onChange={e => setChecked(e.target.checked)}>记住我</Checkbox>
                        <Button type="link">忘记密码</Button>
                    </Flex>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        登录
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.initParticles();
    }

    initParticles() {
        particlesJS("particles-js", {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 1000
                    }
                },
                "color": {
                    "value": ["#fff", "#0f0", "#ff0"]
                },
                "shape": {
                    "type": ["circle", "triangle", "star", "edge"],
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    },
                    "image": {
                        "src": "img/github.svg",
                        "width": 100,
                        "height": 100
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 30,
                        "opacity_min": 0.6,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 40,
                        "size_min": 0.4,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": false,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1.5,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "repulse"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 400,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": false
        })
    }

    render() {
        return (<div id="login-page">
            <div ref={v => {
                this.particles = v;
            }} id="particles-js"></div>
            <LoginForm/>
        </div>)
    }
};