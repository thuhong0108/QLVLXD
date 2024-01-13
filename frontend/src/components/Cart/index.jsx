import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { formatPrice } from '../../services/common';
import './style.scss';

function Cart() {
    const [cartList, setCartList] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        const carts = JSON.parse(localStorage.getItem('carts')) || [];
        setCartList(carts);
        updateTotalPrice(carts);
        updateTotalQuantity(carts);
    }, []);

    const updateTotalPrice = (carts) => {
        const totalPrice = carts.reduce((total, item) => total + (item.price * item.quantity), 0);
        setTotalPrice(totalPrice);
    }

    const updateTotalQuantity = (carts) => {
        const totalQuantity = carts.reduce((total, item) => total + item.quantity, 0);
        setTotalQuantity(totalQuantity);
    }

    const handleRemove = (id) => {
        const carts = cartList.filter(item => item._id !== id);
        setCartList(carts);
        updateTotalPrice(carts);
        updateTotalQuantity(carts);
        localStorage.setItem('carts', JSON.stringify(carts));
        toast.success('Đã xóa sản phẩm khỏi giỏ hàng!');
    }

    const handleChangeQuantity = (id, newQuantity) => {
        const index = cartList.findIndex(item => item._id === id);
        cartList[index].quantity = newQuantity;
        updateTotalPrice(cartList);
        updateTotalQuantity(cartList);
        localStorage.setItem('carts', JSON.stringify(cartList));
    }

    const handlePayment = () => {
        navigate('/checkout');
    }

    return ( 
        <div className="cart container">
            <p className='cart__total'>Hiện đang có <span>{totalQuantity}</span> sản phẩm trong giỏ hàng</p>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>Sản phẩm</TableCell>
                            <TableCell>Giá</TableCell>
                            <TableCell>Số lượng</TableCell>
                            <TableCell>Tổng</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            cartList.map(item => (
                                <TableRow key={item._id}>
                                    <TableCell>
                                        <img className='cart__image' src={item.image} />
                                    </TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{formatPrice(item.price)}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>{formatPrice(item.price * item.quantity)}</TableCell>
                                    <TableCell>
                                        <div className='cart__action'>
                                            <AddIcon onClick={() => handleChangeQuantity(item._id, item.quantity + 1)} />
                                            <DeleteIcon onClick={() => handleRemove(item._id)} />
                                            <RemoveIcon onClick={() => handleChangeQuantity(item._id, item.quantity - 1)} 
                                                disabled={item.quantity === 1}
                                            />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>

            <div className='cart__payment'>
                <div>Tổng tiền: <h3>{formatPrice(totalPrice)}</h3></div>
                <Button variant="contained" onClick={handlePayment} disabled={cartList.length === 0}>Thanh toán</Button>
            </div>
        </div>
     );
}

export default Cart;