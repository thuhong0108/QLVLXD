import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { Button, CircularProgress, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { formatPrice } from '../../services/common';
import { getAllProducts } from '../../services/product';
import './style.scss';

function ProductDetail() {
    const { productId } = useParams();

    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async() => {
            const response = await getAllProducts();
            const data = await response.data;
            setLoading(false);
            const product = data.find(item => item._id === productId);
            if (product) {
                setProduct(product);
            }
        })()
    }, [])

    const handleAddToCart = (product) => {
        const carts = JSON.parse(localStorage.getItem('carts')) || [];

        const { _id, name, price, image } = product;

        const index = carts.findIndex(item => item._id === _id);
        if (index !== -1) {
            carts[index].quantity += quantity;
            localStorage.setItem('carts', JSON.stringify(carts));
        } else {
            const cartItem = { _id, name, price, quantity, image };
            const newCarts = [ ...carts, cartItem ];
            localStorage.setItem('carts', JSON.stringify(newCarts));
        }

        setQuantity(1);
        toast.success('Đã thêm sản phẩm vào giỏ hàng!');
    }

    return ( 
        !loading ? (
            <div className="detail container">
                <img className='detail__image' src={product.image} alt={product.name} />
                <div className="detail__content">
                    <h2 className="detail__name">{product.name}</h2>
                    <span className='detail__price'>{formatPrice(product.price)}</span>
                    <p className="detail__desc">{product.description}</p>

                    <div className="detail__payment">
                        <TextField
                            type="number"
                            label="Số lượng"
                            id="outlined-number"
                            className='detail__quantity'
                            value={quantity} 
                            onChange={e => setQuantity(Number(e.target.value))}
                        />
                        <Button
                            variant="contained"
                            className='detail__add'
                            startIcon={<ShoppingBagOutlinedIcon />}
                            onClick={() => {handleAddToCart(product)}}
                            disabled={quantity < 1}
                        >
                            Thêm vào giỏ hàng
                        </Button>
                    </div> 
                </div>
            </div>
        )  : (
            <CircularProgress />
        )
     );
}

export default ProductDetail;