import {Button} from 'antd';
import {useSelector, useDispatch} from 'react-redux';
// import {setCount} from '@/store/module/user.js';

export default function Index() {
    const {count} = useSelector(state => state.user);
    const dispatch = useDispatch();
    const btnCLick = () => {
        // dispatch(setCount(count + 1));
    }
    return (
        <>
            <Button onClick={btnCLick} type="primary">增加</Button>
            <h1>这是Index页 {count}</h1>
        </>
    )
}