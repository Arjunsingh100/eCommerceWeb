import React from 'react';
import { NavLink } from 'react-router-dom'
import styled from 'styled-components';

const AdminMenu = () => {
    return (
        <Container>
            <div className='admin-menu'>
                <div className='admin-panel'>
                    <ul>
                        <h2>Admin Panel</h2>
                        <li><NavLink to='/dashboard/admin/create-product'>Create Product</NavLink></li>
                        <li><NavLink to='/dashboard/admin/create-category'>Create Category</NavLink></li>
                        <li><NavLink to='/dashboard/admin/products'>Products</NavLink></li>
                        <li><NavLink to='/dashboard/admin/allUsers'>All Users</NavLink></li>
                        <li><NavLink to='/dashboard/admin/orders'>All Orders</NavLink></li>
                    </ul>
                </div>
            </div>
        </Container>
    )
}

const Container = styled.div`
.admin-menu{
    .admin-panel{
        ul{
            li{
                width:250px;
                list-style-type:none;
                border:1px solid black;
                padding:10px;
                a{
                    text-decoration:none;
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

export default AdminMenu
