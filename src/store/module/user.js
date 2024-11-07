import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {setStorage, getStorage} from "../storage";
import {useSelector} from 'react-redux';

function set(name, data) {
    setStorage("user_" + name, data);
}

function get(name) {
    return getStorage("user_" + name);
}

const UserSlice = createSlice({
    name: "user",
    initialState: {
        token: '',
        rememberAccount: ''
    },
    reducers: {
        setToken(state, action) {
            state.token = action.payload;
            set("token", state.token);
        },
        setRememberAccount(state, action) {
            state.rememberAccount = action.payload;
            set("rememberAccount", state.rememberAccount);
        },
    }
})

export default UserSlice.reducer;
export const {setRememberAccount, setToken} = UserSlice.actions;
export function getData(key) {
    const user = useSelector(state => state.user);
    if (user[key]) {
        return user[key]
    }
    const value = get(key);
    const actions = Object.keys(UserSlice.actions);
    for (let i = 0; i < actions.length; i++) {
        if (actions[i].toLowerCase().indexOf(key.toLowerCase()) > -1) {
            UserSlice.actions[actions[i]](value);
            break
        }
    }
    return value
}
//创建异步方法
export const setRememberAccountSync = createAsyncThunk("rememberAccount",  data => {
    console.log(data);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(222)
        },3000)
    })
});