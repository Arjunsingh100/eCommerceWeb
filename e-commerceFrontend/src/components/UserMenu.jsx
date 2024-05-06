import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/auth'
import { toast } from 'react-toastify'

const UserMenu = () => {
    const [auth,setAuth] = useAuth();
    const handleLogout = () => {
        setAuth({
            ...auth,
            user:null,
            token:''
        })
        localStorage.removeItem('auth');
        toast.success('User logout successfully')
    }
    return (
        <Container>
            <div className='user-menu'>
                <div className='user-panel'>
                    <ul>
                        <p>User Panel</p>
                        <li><NavLink to='/dashboard/user/profile'>Profile</NavLink></li>
                        <li><NavLink to='/dashboard/user/orders'>Orders</NavLink></li>
                        <li><NavLink onClick={handleLogout} to='/login'>Logout</NavLink></li>
                    </ul>
                </div>
            </div>
        </Container>
    )
}

const Container = styled.div`
.user-menu{
    .user-panel{
        ul{
            p{
                color:white;
            }
            li{
                width:250px;
                list-style-type:none;
                border:1px solid black;
                padding:10px;
                background:#555;
                a{
                    text-decoration:none;
                    color:white;
                }
            }
            li:hover{
                background-color:blue;
                a{
                    color:white;
                }
            }

        }
    }
}
`

export default UserMenu
