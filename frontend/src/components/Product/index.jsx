import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../../services/common';
import './style.scss';

function Product({ product = {} }) {
    const { _id, name, price, image } = product;
    const navigate = useNavigate()

    const handleProductDetail = () => {
        navigate(`/product/${_id}`);
    }

    return ( 
        <div className="product">
            <img className='product__image' src={image} onClick={handleProductDetail} />
            <h4 className="product__name" onClick={handleProductDetail}>{name}</h4>
            <span className="product__price">{formatPrice(price)}</span>
        </div>
     );
}

export default Product;