import './style.scss';
import banner from '../../assets/banner.PNG';

function Banner() {

    return ( 
        <div className="banner container">
            <img className='banner__image' src={banner} alt="Banner" />
        </div>
     );
}

export default Banner;