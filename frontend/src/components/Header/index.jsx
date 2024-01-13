import Person3Icon from '@mui/icons-material/Person3';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import './style.scss';

function Header() {
    const navigate = useNavigate();
    
    const userLogged = useSelector((state) => state.userLogged);
    
    const [user, setUser] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);

    const openMenu = Boolean(anchorEl);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        setUser(user);
    }, [userLogged]);

    const onOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
      };
  
    const onCloseMenu = () => {
        setAnchorEl(null);
    };

    const redirectToHomePage = () => {
        navigate('/')
    }

    const redirectToCartPage = () => {
        navigate('cart');
    }

    const redirectToLoginPage = () => {
        navigate('login');
        onCloseMenu();
    }

    const redirectToRegisterPage = () => {
        navigate('register');
        onCloseMenu();
    }

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        onCloseMenu();
        toast.success('Đăng xuất thành công');
    }

    return ( 
        <>
            <header className='header'>
                <div className="container header__main">
                    <h3 className="header__logo" onClick={redirectToHomePage}>QL VLXD</h3>
                    <div className='header__right'>
                        <div className='header__user'>
                            <span>{user?.username}</span>
                            <Button onClick={onOpenMenu}>
                                <Person3Icon />
                            </Button>
                            <Menu anchorEl={anchorEl} open={openMenu} onClose={onCloseMenu}>
                                {
                                    !user ? (
                                        <>
                                            <MenuItem onClick={redirectToLoginPage}>Đăng nhập</MenuItem>
                                            <MenuItem onClick={redirectToRegisterPage}>Đăng kí</MenuItem>
                                        </>
                                    ) : (
                                        <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
                                    )
                                }
                            </Menu>
                        </div>

                        <div className="header__cart" onClick={redirectToCartPage}>
                            <ShoppingBagIcon />
                        </div>
                    </div>
                </div>
            </header>
            <ToastContainer />
            <Outlet />
        </>
     );
}

export default Header;