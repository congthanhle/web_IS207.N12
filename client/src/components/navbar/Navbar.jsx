import React, { useState, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Context } from "../../context/Context";
import styles from './navbar.module.scss';
import logo from '../../assets/images/logo.png';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';


import { FaUserAlt, FaCartPlus, FaSearch } from 'react-icons/fa';


export default function Navbar() {
    const { user, dispatch } = useContext(Context);
    const [search, setSearch] = useState('');
    
    const handleClickUser = () => {
        if (user) {
            window.location.replace('/profile');
        }
        else {
            window.location.replace('/login');
        }
    }
    const handleClickCart = () => {
        if (user) {
            window.location.replace('/cart');
        }
        else {
            window.location.replace('/login');
        }
    }
    const handleSearch = () => {
        if (search) {
            window.location.replace(`/productSearch/${search}`);
        }
    }
    return (
        <nav className={styles.navbar}>
            <Link className={`${styles.navLeft} link`} to="/">
                <img className={styles.navLogo} src={logo} alt="logo" />
                <div className={styles.logoDisc}>
                    <h2 className={styles.brandName}>FIVE MEN</h2>
                    <h5 className={styles.slogan}>More Than Good Coffee</h5>
                </div>
            </Link>
            <div className={styles.navCenter}>
                <InputGroup className={styles.search}>
                    <input placeholder="Tìm kiếm sản phẩm tại đây..." type='text' className={styles.input} onKeyPress={e => {e.key === 'Enter' && (search &&  window.location.replace(`/productSearch/${search}`))}} onChange={(e)=>setSearch(e.target.value)}/>
                    <Button className={styles.button} variant="outline-dark" onClick={handleSearch}><FaSearch /></Button>
                </InputGroup>
                <ul className={styles.navList}>
                    <li >
                        <Link className={`${styles.navLink} link`} to="/collections">
                            Sản phẩm
                        </Link>
                    </li>
                    <li>
                        <Link className={`${styles.navLink} link`} to="/promotion">Khuyến mãi</Link>
                    </li>
                    <li>
                        <Link className={`${styles.navLink} link`} to="/blog">Blog</Link>
                    </li>
                    <li>
                        <Link className={`${styles.navLink} link`} to="/about">Giới thiệu</Link>
                    </li>
                </ul>
            </div>
            <ul className={styles.navRight}>
                <li>
                    <Button onClick={handleClickUser}>
                        <FaUserAlt />
                    </Button>
                </li>
                <li>
                    <Button onClick={handleClickCart}><FaCartPlus /></Button>
                </li>
            </ul>
        </nav>
    )
}
