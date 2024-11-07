import axios from "axios";
import {message} from "antd";
import {useNavigate} from "react-router-dom";
import store from "@/store/index";

const request = axios.create({
    // API 请求的默认前缀
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 1000 * 50 // 请求超时时间
});

request.interceptors.request.use(async config => {

    // 如果 token 存在
    const {token} = store.getState().user;
    if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
        const navigate = useNavigate();
        return navigate("/login");
    }
    return config
});

request.interceptors.response.use(res => {
    return res.data
}, err => {
    if (err.response && err.response.status === 401) {
        const navigate = useNavigate();
        return navigate("/login");
    }
    return Promise.reject(err);
});

export const get = (url, params, config = {}) => {
    return new Promise((resolve, reject) => {
        request.get(url + stringifyData(params)).then(res => {
            if (res.status) {
                resolve(res);
            } else {
                message.destroy();
                message.error(res.message);
                reject(res);
            }
        }).catch(reject);
    })
};

export const post = (url, data, config = {}) => {
    switch (config.type) {
        case "form":
            data = formatFormData(data);
    }
    return new Promise((resolve, reject) => {
        request.post(url, data).then(res => {
            if (res.status) {
                resolve(res);
            } else {
                message.destroy();
                message.error(res.message);
                reject(res);
            }
        }).catch(reject);
    })
};

export default {get, post};

function stringifyData(data, pName = '') {
    if (!data) {
        return ''
    }
    if (Object.prototype.toString.call(data) === '[object String]') {
        return '?' + data;
    }

    const dataArray = [];

    function stringify(_data, pName = '') {
        if (Object.prototype.toString.call(_data) === '[object Array]') {
            for (let i = 0; i < _data.length; i++) {
                if (typeof _data[i] === 'object') {
                    stringify(_data[i], pName);
                } else {
                    dataArray.push(pName + "=" + _data[i]);
                }
            }
        }
        if (Object.prototype.toString.call(_data) === '[object Object]') {
            for (const key in _data) {
                if (typeof _data[key] === 'object') {
                    stringify(_data[key], pName ? (pName + '.' + key) : key);
                } else {
                    dataArray.push(pName + "=" + _data[key]);
                }
            }
        }
    }

    stringify(data);
    return '?' + dataArray.join("&")
}

function formatFormData(data, formData, pName = '') {
    if (typeof data !== 'object') {
        return data
    }
    if (Object.prototype.toString.call(formData) !== '[object FormData]') {
        formData = new FormData()
    }
    if (Array.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
            formData.append(pName + `[${i}]`, data[i])
        }
        return formData
    }
    for (const key in data) {
        if (typeof data[key] === 'undefined') {
            continue
        }
        if (Array.isArray(data[key])) {
            formatFormData(data[key], formData, pName + key)
            continue
        }
        if (Object.prototype.toString.call(data[key]) === '[object Object]') {
            formatFormData(data[key], formData, pName + key + '.')
            continue
        }
        formData.append(pName + key, data[key])
    }

    return formData
}