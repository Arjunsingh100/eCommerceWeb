import React, { useState } from 'react'
import styled from 'styled-components'
import { Link, NavLink } from 'react-router-dom'
import { BiCartAlt } from "react-icons/bi";
import { useAuth } from '../context/auth'
import { toast } from 'react-toastify';
import SearchForm from './Forms/SearchForm';
import useCategory from './hooks/useCategory';
import { useCart } from '../context/cart';

const Header = (props) => {
    const categories = useCategory()
    const [auth, setAuth] = useAuth();
    const [dropdown, setDropdown] = useState(false);
    const [dropdownCat, setDropdownCat] = useState(false)
    const [cart, setCart] = useCart();
    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: ""
        });
        localStorage.removeItem('auth');
        toast.success('Logout Successfully')
    }
    const handleDropdown = () => {
        setDropdown(!dropdown);
    }
    const handleDropdownCat = () => {
        setDropdownCat(!dropdownCat);
    }
    return (
        <>
            <Container>
                <div className='brands'>
                    {/* <BiCartAlt></BiCartAlt> */}
                    <h2>Brand Mall</h2>
                </div>
                <SearchForm />
                <div className='dropdown1'>
                    <div className='fas fa-bars'></div>
                    <div className='dropdown-content'>
                        <ul>
                            <li><NavLink to='/home'>Home</NavLink></li>
                            <li onClick={handleDropdownCat} className='dropdown-cat'>Categories
                                <ul className='dropdown-list1'>
                                    <li><Link to='/categories'>All Categories</Link></li>
                                    {categories.map((c) => {
                                        return (
                                            <li key={c._id} className='dropdown-item'><Link to={`/category/${c.slug}`}>{c.name}</Link></li>
                                        )
                                    })}
                                </ul>
                            </li>
                            {auth.user ? (<>
                                <li onClick={handleDropdown} className='dropdown'><NavLink hrefLang='#'>
                                    {auth?.user?.roll === 1 ? 'Admin' : `${auth?.user?.name}`}
                                </NavLink>
                                    <ul className={`dropdown-list ${dropdown ? 'dropdown-list-display' : ''}`}>
                                        <li className='dropdown-item'><NavLink to={`/dashboard/${auth?.user?.roll === 1 ? 'admin' : 'user'}`}>Dashboard</NavLink></li>
                                        <li className='dropdown-item'><NavLink onClick={handleLogout} to='/login'>Logout</NavLink></li>
                                    </ul>
                                </li>
                            </>) : (
                                <>
                                    <li><NavLink to='/register'>Register</NavLink></li>
                                    <li><NavLink to='/login'>Login</NavLink></li>
                                </>
                            )}
                            <li><NavLink to='/cart'>Cart({cart ? cart.length : '0'})</NavLink></li>
                        </ul>
                    </div>
                </div>
                <div className='nav-links'>
                    <ul>
                        <li><NavLink to='/home'>Home</NavLink></li>
                        <li onClick={handleDropdownCat} className='dropdown'>Categories
                            <ul className={`dropdown-list ${dropdownCat ? 'dropdown-list-display-cat' : ''}`}>
                                <li><Link to='/categories'>All Categories</Link></li>
                                {categories.map((c) => {
                                    return (
                                        <li key={c._id} className='dropdown-item'><Link to={`/category/${c.slug}`}>{c.name}</Link></li>
                                    )
                                })}
                            </ul>
                        </li>
                        {auth.user ? (<>
                            <li onClick={handleDropdown} className='dropdown'><NavLink hrefLang='#'>
                                {auth?.user?.roll === 1 ? 'Admin' : `${auth?.user?.name}`}
                            </NavLink>
                                <ul className={`dropdown-list ${dropdown ? 'dropdown-list-display' : ''}`}>
                                    <li className='dropdown-item'><NavLink to={`/dashboard/${auth?.user?.roll === 1 ? 'admin' : 'user'}`}>Dashboard</NavLink></li>
                                    <li className='dropdown-item'><NavLink onClick={handleLogout} to='/login'>Logout</NavLink></li>
                                </ul>
                            </li>
                        </>) : (
                            <>
                                <li><NavLink to='/register'>Register</NavLink></li>
                                <li><NavLink to='/login'>Login</NavLink></li>
                            </>
                        )}
                        <li><NavLink to='/cart'>Cart({cart ? cart.length : '0'})</NavLink></li>
                    </ul>
                </div>
            </Container>
        </>

    )
}

const Container = styled.div`
width: 100vw;
height: 80px;
border-bottom: 2px solid #ffc107;
background-color: black;
display:flex;
flex-direction:row;
align-items:center;
justify-content:space-between;
// box-shadow: 0 8px 6px -6px gray;
//   --webkit-box-shadow: 0 8px 6px -6px gray;
//   border-bottom: solid gray !important;
.brands{
    display:flex;
    align-items:center;
    column-gap:10px;
    margin-left:20px;
    font-size:30px;
    h2{
        font-size:20px;
        color:gray;
        text-transformation:uppercase;
    }
    @media screen and (max-width:745px) {
        h2 {
            display: none;
        }
    }
}
.fa-bars {
    color: white;
    font-size: 25px;
    margin-right: 20px;
}
.dropdown1 {
    position:relative;
    .dropdown-content {
        display:none;
        position: absolute;
        top:90px;
        right:25px;
        z-index:1;
        background-color:#fff;
        transform: scaleY(0);
        transition: 2s;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        ul {
            list-style-type:none;
            li{
                a {
                    text-decoration:none;
                    color:gray;
                }
            }
        }
        .dropdown-cat {
            .dropdown-list1 {
                display:none;
            }
        }
        .dropdown-cat:hover .dropdown-list1 {
            display:inline-block;
        }
    }
}
.dropdown1:hover .dropdown-content {
    display:block;
    transform:scaleY(1);
}
@media screen and (min-width:745px) {
    .dropdown1 {
        display:none;
    }
}
.nav-links{
    display:flex;
    flex-direction:row;
    align-items:center;
    column-gap:20px;
    margin-right:20px;
    ul {
        display:flex;
    flex-direction:row;
    align-items:center;
    column-gap:20px; 
    li{
        list-style-type:none;
        a{
            color:white;
            text-decoration:none;
            font-size: 19px;
            font-family: 'Roboto', sans-serif;
        }
        a.active{
            border-bottom:1px solid black;
        }
    }
    .dropdown {
            color:white;
            text-decoration:none;
            font-size: 19px;
            font-family: 'Roboto', sans-serif;
             
        .dropdown-list{
            position:absolute;
            background-color:#333;
            list-style-type:none;
            display:flex;
            flex-direction:column;
            align-items:flex-start;
            border:2px solid green;
            border-radius:4px;
            display:none;
        }
        .dropdown-list-display {
            display:inline-block;
            top:40px;
            right:80px;
        }
        .dropdown-list-display-cat {
            display:inline-block;
            top:40px;
            right:140px;
        }
    } 
    }
}
@media screen and (max-width:745px) {
    .nav-links {
        display:none;
    }
}
`
export default Header
