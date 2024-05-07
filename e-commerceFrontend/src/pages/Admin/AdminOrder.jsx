import React from 'react'
import { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import styled from 'styled-components'
import AdminMenu from '../../components/AdminMenu'
import { Select } from 'antd'
const { Option } = Select;
import axios from 'axios'
import { useAuth } from '../../context/auth';
import moment from 'moment';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

const AdminOrder = () => {
    const [auth, setAuth] = useAuth();
    const [status, setStatus] = useState(["Not process", "Processing", "Shipped", "delivered", "Cancelled"])
    const [orders, setOrders] = useState([]);
    const getOrders = async () => {
        try {
            const { data } = await axios.get('https://ecommerceweb-1.onrender.com/api/v1/products/getAdminOrders');
            setOrders(data?.orders)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token])

    const handleChange = async (id, value) => {
        try {
            const { data } = await axios.put(`/api/v1/products/updateOrderStatus/${id}`,{status:value});
            if (data?.success) { getOrders() }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Layout>
            <Container>
                <div className='orders'>
                    <AdminMenu />
                    <div className='orders-container'>
                        {
                            orders?.map((order, i) => {
                                return (
                                    <div key={i} className='container'>
                                        <div className='product-details-container'>
                                            <ul>
                                                <li>Order Status: {
                                                    <Select placeholder='Select a category'
                                                        showSearch
                                                        size='large'
                                                        onChange={(value) => { handleChange(order?._id, value) }}>
                                                        {
                                                            status.map((s, i) => {
                                                                return (
                                                                    <Option key={i} value={s}>{s}</Option>
                                                                )
                                                            })
                                                        }
                                                    </Select>
                                                }</li>
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
.orders{
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
`
export default AdminOrder
