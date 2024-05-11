import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import React from 'react'
import { useCart } from '../context/cart'
import { useAuth } from '../context/auth'
import styled from 'styled-components'
import { json, useNavigate } from 'react-router-dom'
import axios from 'axios'
import DropIn from "braintree-web-drop-in-react"
import { toast } from 'react-toastify'

const CartPages = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useCart();
    const [auth, setAuth] = useAuth();
    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState("");
    const [loading, setLoading] = useState(false);


    const totalPrice = () => {
        let total = 0;
        cart.map((p) => {
            return total = total +  (!p.userQuantity ? 1 : p.userQuantity)*p.price
        })
        return total;
    }

    const handleCartRemove = (cid) => {
        let myCart = [...cart]
        const Index = myCart.findIndex((ele) => {
            return ele._id === cid;
        })
        myCart.splice(Index, 1);
        setCart(myCart)
        localStorage.setItem('cart', JSON.stringify(myCart))
    }

    const getToken = async () => {
        try {
            const { data } = await axios.get('https://ecommerceweb-1.onrender.com/api/v1/products/braintree/token');
            setClientToken(data?.clientToken);
        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getToken();
    }, [auth?.token])


    const handlePayment = async () => {
        try {
            setLoading(true)
            const { nonce } = await instance.requestPaymentMethod();
            const { data } = await axios.post('https://ecommerceweb-1.onrender.com/api/v1/products/braintree/payment', { cart, nonce });
            setLoading(false);
            localStorage.removeItem('cart');
            setCart([]);
            navigate('/dashboard/user/orders');
            toast.success('Payment completed Successfully');
        } catch (error) {
            console.log(error)
            setLoading(false);
        }
    }

    const handleChange = (id, value) => {
        cart.filter((c,i)=>{
            if(c._id === id) {
                c.userQuantity=value
                setCart([...cart])
                localStorage.setItem('cart',JSON.stringify([...cart]))
            }
        })
    }
    return (
        <Layout>
            <Container>
                <div>
                    <div>
                        <h1 className="text-center bg-light p-2 mb-1">
                            {!auth?.user
                                ? "Hello Guest"
                                : `Hello  ${auth?.token && auth?.user?.name}`}
                            <p className="text-center">
                                {cart?.length
                                    ? `You Have ${cart.length} items in your cart ${auth?.token ? "" : "please login to checkout !"
                                    }`
                                    : " Your Cart Is Empty"}
                            </p>
                        </h1>
                    </div>
                    <div className='cart-page'>
                        <div>
                            {
                                cart.length > 0 && cart?.map((c) => {
                                    return (
                                        <div key={c._id} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', border: '1px solid gray' }} >
                                            <div>
                                                <img style={{ width: '200px', height: '200px' }} src={`https://ecommerceweb-1.onrender.com/api/v1/products/get-photo/${c._id}`} alt='product_img' />
                                            </div>
                                            <div style={{ marginLeft: '15px' }}>
                                                <h5>{c.name}</h5>
                                                <h5>{c.description}</h5>
                                                <h5>{c.price}</h5>
                                                <input type='number'min='1' placeholder='Quantity' value={c?.userQuantity ? c?.userQuantity : '1'} max={c.quantity} name='quantity' onChange={(e) => { handleChange(c._id, e.target.value) }}></input>
                                                <button style={{ backgroundColor: 'rgb(200,12,12)' }} onClick={() => { handleCartRemove(c._id) }}>Remove</button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div>
                            <h2>Cart Summary</h2>
                            <p>Total|Checkout|Payments</p>
                            <div>
                                <h5>Total:{totalPrice()}</h5>
                                {auth?.user?.address ? (
                                    <div>
                                        <h5>Current Address</h5>
                                        <h4>{auth?.user?.address}</h4>
                                        <button onClick={() => { navigate('/dashboard/user/profile') }}>Update Address</button>
                                    </div>
                                ) :
                                    (<div>
                                        {auth?.token ? (
                                            <button onClick={() => { navigate('/dashboard/user/profile') }}>Update Profile</button>
                                        ) : (
                                            <button onClick={() => {
                                                navigate('/login', {
                                                    state: '/cart'
                                                })
                                            }}>Please Login to CheckOut</button>
                                        )}
                                    </div>)}
                            </div>
                            <div style={{ width: '400px', height: '300px' }}>
                                {!clientToken || !cart?.length ? "" : (<>
                                    <DropIn
                                        options={{
                                            authorization: clientToken,
                                            paypal: {
                                                flow: "vault",
                                            },
                                        }}
                                        onInstance={(instance) => setInstance(instance)}
                                    />
                                    <button onClick={handlePayment}>{loading ? 'Processing' : 'Pay Now'}</button>
                                </>)}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </Layout>
    )
}

const Container = styled.div`
.cart-page {
    display:flex;
    flex-direction:row;
    justify-content:center;
    gap:20px;
}
button {
    padding:6px;
    border:none;
    outline:none;
    text-align:center;
    background-color:green;
    color:white;
    border-radius:9px;
    margin-bottom:3px;
}
@media screen and (max-width:858px){
    .cart-page {
        display:flex;
        flex-direction:column;
        align-items:center;
        gap:20px;
    }
}
`

export default CartPages
