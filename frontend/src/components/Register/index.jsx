import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth_image from '../../assets/auth_image.PNG';
import { register } from '../../services/auth';
import './style.scss';

function Register() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const redirectToLoginPage = () => {
        navigate('/login');
    }

    const onSumbit = async () => {
        const data = await register({ username, email, password });
        if (data.success) {
            toast.success(data.message);

            setUsername('');
            setEmail('');
            setPassword('');
        } else {
            toast.error(data.message);
        }
    }

    return ( 
        <div className='container'>
            <div className="register">
                <form className="register__form">
                    <h3 className="register__title">Đăng kí</h3>
                    <div className="register__group">
                        <label>Tên tài khoản</label>
                        <TextField
                            placeholder='Tên tài khoản' 
                            id='username' 
                            name='username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="register__group">
                        <label>Email</label>
                        <TextField
                            placeholder='Email' 
                            id='email' 
                            name='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="register__group">
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
                    <div className="register__submit">
                        <Button variant="contained" onClick={onSumbit} disabled={!username || !email || !password}>
                            Đăng kí
                        </Button>
                    </div>
                    <div className="register__login">
                        <p>Bạn đã có tài khoản?</p>
                        <Button variant="outlined" onClick={redirectToLoginPage}>Đăng nhập</Button>
                    </div>
                </form>
                <div className="register__image">
                    <img src={auth_image} />
                </div>
            </div>
        </div>
     );
}

export default Register;