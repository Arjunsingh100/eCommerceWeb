import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import Price from '../components/Price.js';
import { Radio } from 'antd'
import { useCart } from '../context/cart.jsx';
import dotevn from 'dotenv'

const Home = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState('');
  const [products, setProducts] = useState([]);
  const [radio, setRadio] = useState([])
  const [cart, setCart] = useCart();
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('auth'))
    if (!data) {
      navigate('/login');
      toast.error('Please Login');
    }
  }, [])
  const getAllCategories = async () => {
    const allCategories = await axios.get('https://ecommerceweb-1.onrender.com/api/v1/category/get-categories');
    if (allCategories?.data.success) {
      setCategories(allCategories?.data?.allCategories)
    }
    else {
      toast.error(allCategories?.data?.message);
    }
  }
  useEffect(() => {
    getAllCategories();
  }, []);
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get('https://ecommerceweb-1.onrender.com/api/v1/products/get-products');
      if (data?.success) {
        setProducts(data?.allProducts)
        toast.success(data?.message);
      }
      else {
        toast.error(data?.message)
      }
    }
    catch (error) {
      console.log(error)
      toast.error('Something went wrong')
    }
  }
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
    //eslint-disable-next-line
  }, [checked.length, radio.length])
  useEffect(() => {
    filterCategories();
    //eslint-disable-next-line
  }, [checked])
  const filterCategories = async () => {
    try {
      const { data } = await axios.get(`https://ecommerceweb-1.onrender.com/api/v1/products/category-filter/${checked}`);

      if (data?.success) {
        setProducts(data?.filterProducts);
        //eslint-disable-next-line
      }
    }
    catch (error) {
      console.log(error)
      toast.error('Error while filter products');
    }
  }

  useEffect(() => {
    if (radio) {
      let filteredProducts = products.filter((pro) => {
        if ((pro.price >= radio[0]) && (pro.price <= radio[1])) {
          return pro;
        }
      })
      setProducts(filteredProducts);
      //eslint-disable-next-line
    }

  }, [radio])
  return (
    <Layout>
      <Container>
        <div className='home-container'>
          <div className='filter-container'>
            <div className='category-filter'>
              <h2>Category Based Filter</h2>
              <Radio.Group onChange={(e) => { setChecked(e.target.value) }}>
                {
                  categories.map((cat) => {
                    return (
                      <Radio key={cat._id} value={cat._id}>
                        {cat.name}
                      </Radio>
                    )
                  })
                }
              </Radio.Group>
              {
                checked && <>
                  <h2>Filter Based on Price</h2>
                  <Radio.Group onChange={(e) => { setRadio(e.target.value) }}>
                    {
                      Price.map((price) => {
                        return (
                          <div key={price.id}>
                            <Radio value={price.Array}>
                              {price.name}
                            </Radio>
                          </div>
                        )
                      })
                    }
                  </Radio.Group>
                </>
              }
            </div>
            <button type='submit' onClick={() => { window.location.reload() }}>Reset Filter</button>
          </div>
          <div className='products-container'>
            <h2>All Products</h2>
            <div className='products'>
              {
                products.map((product) => {
                  return (
                    <button style={{outline:'none',border:'none',borderRadius:'9px'}} className='more-detail-btn' onClick={() => { navigate(`/product/${product.slug}`) }}>
                      <div key={product._id} className='product'>
                        <img style={{ width: '200px', height: '200px'}} src={`https://ecommerceweb-1.onrender.com/api/v1/products/get-photo/${product._id}`} alt='product_img' />
                        <div className='product-info' style={{ textAlign: 'center' }}>
                          <h5>{product.name}</h5>
                          <p>{product.price}</p>
                          <p>{product.description}</p>
                        </div>
                        <div className='buttons'>
                          {/* <button className='more-detail-btn' onClick={() => { navigate(`/product/${product.slug}`) }}>More Details</button> */}
                          <button onClick={() => {
                            setCart([...cart, product]);
                            localStorage.setItem('cart', JSON.stringify([...cart, product]));
                            toast.success('Product added to cart Successfully')
                          }} className='add-cart-btn'>Add to Cart</button>
                        </div>
                      </div>
                    </button>
                  )
                })
              }
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  )
}

const Container = styled.div`
display:flex;
justify-content:center;
.home-container{
  width:90vw;
  display:flex;
  flex-direction:row;
  justify-content:space-between;
  gap:20px;
  .products-container{
    width:70vw;
    display:flex;
    flex-direction:column;
    gap:20px;
    .products{
        display:flex;
        flex-direction:row;
        flex-wrap:wrap;
        gap:15px;
        .product{
          width:200px;
          border:2px solid green;
          border-radius: 9px;
          overflow:hidden;
          outline:none;
          .more-detail-btn{
            border:none;
            outline:none;
          }
          .buttons{
            width:100%;
            text-align:center;
            .add-cart-btn{
              padding:6px;
              border:none;
              outline:none;
              text-align:center;
              background-color:green;
              color:white;
              border-radius:9px;
              margin-bottom:3px;
            }
          }
        }
    }
  }
}
.filter-container {
  button {
    padding:6px;
    border:none;
    outline:none;
    text-align:center;
    background-color:green;
    color:white;
    border-radius:9px;
    margin-top:13px;
  }
}
@media screen and (max-width:854px) {
  .home-container {
width:90vw;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
gap:0px;
.filter-container {
  width:100vw;
  background-color:#f3d7d7;
}
.products-container{
    background-color:#e487f3;
    width:100vw;
    display:flex;
    flex-direction:column;
    flex-wrap:wrap;
    justify-content:center;
    align-items:center;
    row-gap:20px;
    .products {
      display:flex;
      flex-direction:row;
      flex-wrap:wrap;
      justify-content:center;
      gap:17px;
      .product {
        .product-info{
          line-height:11px;
        }
      }
    }
}
  }
}
`

export default Home
