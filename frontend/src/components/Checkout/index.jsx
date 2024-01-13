import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import { formatPrice } from '../../services/common';
import './style.scss';

function Checkout() {
    const navigate = useNavigate();

    const [carts, setCarts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const form = useFormik({
        initialValues: { 
            name: '',
            phone: '', 
            email: '', 
            address: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Trường này là bắt buộc'),
            phone: Yup.string().required('Trường này là bắt buộc').matches(/^[0-9\-\+]{9,15}$/, 'Số điện thoại không hợp lệ'),
            email: Yup.string().required('Trường này là bắt buộc').email('Trường này phải là email'),
            address: Yup.string().required('Trường này là bắt buộc')
        }),
        onSubmit: async () => {
            localStorage.removeItem('carts');
            setCarts([]);
            toast.success('Đặt hàng thành công');
        }
    });

    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        form.values.name = user.username;
        form.values.email = user.email;
    }

    useEffect(async () => {
        const cartList = JSON.parse(localStorage.getItem('carts')) || [];
        setCarts(cartList);
        const totalPrice = cartList.reduce((total, item) => total + (item.price * item.quantity), 0);
        setTotalPrice(totalPrice);
    }, []);

    const redirectToHomePage = () => {
        navigate('/');
    }

    return ( 
        <div className='checkout container'>
            {
                carts.length > 0 ? (
                    <>
                        <h1 className="checkout__heading">Đặt hàng</h1> 
                        <form className="checkout__infor" onSubmit={form.handleSubmit}>
                            <div className="checkout__infor-person">
                                <h3>Thông tin nhận hàng</h3>
                                <div className="checkout__infor-person-form">
                                    <div className="checkout__infor-person-row">
                                        <label>Họ tên</label>
                                        <TextField  id='name' name='name' placeholder='Họ tên'
                                            value={form.values.name} onChange={form.handleChange}
                                        />
                                        <span className='checkout__infor-person-mess'>
                                            { form.errors.name ? form.errors.name : '' }
                                        </span>
                                    </div>
                                    <div className="checkout__infor-person-row">
                                        <div>
                                            <label>Số điện thoại</label>
                                            <TextField placeholder='Số điện thoại' id='phone' name='phone'
                                                value={form.values.phone} onChange={form.handleChange} 
                                            />
                                            <span className='checkout__infor-person-mess'>
                                                { form.errors.phone ? form.errors.phone : '' }
                                            </span>       
                                        </div>

                                        <div>
                                            <label>Email</label>
                                            <TextField placeholder='Email' id='email' name='email' 
                                                value={form.values.email} onChange={form.handleChange}
                                            /> 
                                            <span className='checkout__infor-person-mess'>
                                                { form.errors.email ? form.errors.email : '' }
                                            </span>             
                                        </div>
                                    </div>
                                    <div className="checkout__infor-person-row">
                                        <div className="checkout__infor-person-wrap">
                                            <label>Địa chỉ nhận hàng</label>
                                            <TextField placeholder='Địa chỉ nhận hàng' id='address' name='address' 
                                                value={form.values.address} onChange={form.handleChange}
                                            /> 
                                        </div>
                                        <span className='checkout__infor-person-mess'>
                                            {form.errors.address ? form.errors.address : ''}
                                        </span>
                                    </div>  
                                </div>
                            </div>
                            <div className="checkout__infor-order">
                                <h3>Thông tin đơn hàng</h3>
                                <div className="checkout__infor-order-form">
                                    <div className="checkout__infor-order-list">
                                        {
                                            carts.map(item => (
                                                <div className="checkout__infor-order-item" key={item._id}>
                                                    <p className="checkout__infor-order-name">
                                                        {item.name} 
                                                        <span>X{item.quantity}</span>
                                                    </p>
                                                    <span className="checkout__infor-order-totalitem">
                                                        {formatPrice(item.price * item.quantity)}
                                                    </span>
                                                </div>
                                            ))
                                        }    
                                    </div>
                                    <div className="checkout__infor-order-group">
                                        <h4>TỔNG CỘNG</h4>
                                        <span>{formatPrice(totalPrice)}</span>
                                    </div>
                                    <Button type='submit' variant="contained" fullWidth size='large'>
                                        Đặt hàng
                                    </Button>
                                </div>
                            </div>    
                        </form>
                    </>
                ) : (
                    <div className='checkout__empty'>
                        <h3>Hiện không có sản phẩm nào cần thanh toán</h3>
                        <Button variant="outlined" onClick={redirectToHomePage}>Quay lại cửa hàng</Button>
                    </div>
                )
            }
        </div>
     );
}

export default Checkout;