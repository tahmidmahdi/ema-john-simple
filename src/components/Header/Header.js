import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../../App';
import logo from '../../images/logo.png';
import './Header.css';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    return (
        <div className="header">
            <img src={logo} alt="" />
            <nav>
                <Link to="/shop ">Shop</Link>
                <Link to="/review">Order Review </Link>
                <Link to="/inventory">Manege inventory</Link>
                <button onClick={()=>setLoggedInUser({})}>SignOut</button>
            </nav>
        </div>
    );
};

export default Header;