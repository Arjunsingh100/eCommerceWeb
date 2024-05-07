import React from 'react'
import { useState, useEffect, useRef } from 'react'
import Layout from '../../components/Layout'
import styled from 'styled-components'
import UserMenu from '../../components/UserMenu'
import axios from 'axios'
import { useAuth } from '../../context/auth';
import moment from 'moment';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

const Orders = () => {
    const userPanelHandlerRef = useRef();
    const [orders, setOrders] = useState([]);
    const [auth, setAuth] = useAuth();
    const getAllOrders = async () => {
        try {
            const { data } = await axios.get('https://ecommerceweb-1.onrender.com/api/v1/products/orders');
            setOrders(data.orders);
        }
        catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (auth?.token) getAllOrders()
    }, [auth?.token])
    const handleUserPanel = () => {
        userPanelHandlerRef.current.classList.toggle('user-panel1');
    }
    return (
        <Layout>
            <Container>
                <div className='orders'>
                    <div className='user-panel' ref={userPanelHandlerRef}><UserMenu /></div>
                    <div className='orders-container'>
                        <div className='fas fa-bars' onClick={handleUserPanel}></div>
                        {
                            orders?.map((order, i) => {
                                return (
                                    <div key={i} className='container'>
                                        <div className='product-details-container'>
                                            <ul>
                                                <li>Order Status: {order?.status}</li>
                                                <li>Order Number: {order?._id}</li>
                                                <li>Buyer Name: {order?.buyer?.name}</li>
                                                <li>Order Date: {moment(order?.createdAt).fromNow()}</li>
                                                <li>Total Amount: {order?.payment?.transaction?.amount}</li>
                                                <li>Quantity: {order?.products?.length}</li>
                                                <li>Payment Status: {order?.payment?.success ? 'Success' : 'Failed'}</li>
                                            </ul>
                                        </div>
                                        <div className="product-card">
                                            {
                                                order?.products?.map((product, i) => {
                                                    return (
                                                        <div key={i} className='card'>
                                                            <Card.Img className='img' variant="top" src={`https://ecommerceweb-1.onrender.com/api/v1/products/get-photo/${product?._id}`} />
                                                            <Card.Body>
                                                                <Card.Title>{product?.name}</Card.Title>
                                                                <Card.Text>{product?.description}</Card.Text>
                                                            </Card.Body>
                                                            <Card.Footer>
                                                                <small className="text-muted">Price: {product?.price}</small>
                                                            </Card.Footer>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </Container>
        </Layout>
    )
}

const Container = styled.div`
display:flex;
justify-content:center;
margin-top:15px;
overflow-x:hidden;
.orders{
    position:relative;
  width:90vw;
  display:flex;
  flex-direction:row;
  justify-content:space-around;
  gap:20px;
  .orders-container {
    width:80%;
    display:flex;
    flex-direction:column;
    align-items:flex-start;
    gap:20px;
    .fa-bars {
        color:black;
        font-size:25px;
    }
    .container {
        padding:15px;
        border:1px solid gray;
        border-radius: 8px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        .product-details-container {
            ul {
                list-style-type:none;
            }
        }
        .product-card {
            display:flex;
            flex-direction:row;
            justify-content: center;
            flex-wrap:wrap;
            gap:20px;
            .card {
                width:301px;
                .img{
                    width:100%;
                }
            }
        }
    }
  }
}
 
@media screen and (max-width:817px) {
    .user-panel {
        position:absolute;
        top:-10px;
        right:-300px;
        z-index:1;
        transition: 1s ease;
    }
    .user-panel1 {
        position:absolute;
        top:-10px;
        right:300px;
        z-index:1;  
    }
}
`

export default Orders
