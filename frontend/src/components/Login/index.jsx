import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth_image from '../../assets/auth_image.PNG';
import { login } from '../../services/auth';
import './style.scss';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const redirectToRegisterPage = () => {
        navigate('/register');
    }

    const onSumbit = async () => {
        const data = await login({ email, password });
        if (data.success) {
            localStorage.setItem('user', JSON.stringify(data.data));
            dispatch({ type: 'LOGIN', payload: data.data });
        
            if (data.data.isAdmin) {
                navigate('/admin');
            } else {
                navigate('/');
            }
        } else {
            toast.error(data.message);
        }
    }

    return ( 
        <div className='container'>
            <div className="login">
                <form className="login__form">
                    <h3 className="login__title">Đăng nhập</h3>
                    <div className="login__group">
                        <label>Email</label>
                        <TextField
                            placeholder='Email' 
                            id='email' 
                            name='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="login__group">
                        <label>Mật khẩu</label>
                        <TextField
                            type='password'
                            placeholder='Mật khẩu' 
                            id='password' 
                            name='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="login__submit">
                        <Button variant="contained" onClick={onSumbit} disabled={!email || !password}>Đăng nhập</Button>
                    </div>
                    <div className="login__regis">
                        <p>Bạn chưa có tài khoản?</p>
                        <Button variant="outlined" onClick={redirectToRegisterPage}>Đăng kí</Button>
                    </div>
                </form>
                <div className="login__image">
                    <img src={auth_image} />
                </div>
            </div>
        </div>
     );
}

export default Login;