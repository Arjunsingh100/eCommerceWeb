import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Layout from '../../components/Layout'
import AdminMenu from '../../components/AdminMenu';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([])
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
        getAllProducts();
    }, [])
    return (
        <Layout>
            <Container>
                <div className='all-products'>
                    <div>
                        <AdminMenu />
                    </div>
                    <div className='product-container'>
                        <h2>All Products</h2>
                        <div className='products'>
                            {
                                products.map((product) => {
                                    return (
                                         <Link key={product._id} to= {`/dashboard/admin/update-product/${product.slug}`}>
                                         <div className='product'>
                                            <img style={{ width: '200px', height: '200px' }} src={`https://ecommerceweb-1.onrender.com/api/v1/products/get-photo/${product._id}`} alt='product_img' />
                                            <div>
                                                <h5>{product.name}</h5>
                                                <p>{product.description}</p>
                                            </div>
                                        </div>
                                         </Link>
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
.all-products{
  width:90vw;
  display:flex;
  flex-direction:row;
  justify-content:space-between;
  gap:20px;
  .product-container{
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
            border:1px solid gray;
        }
    }
  }
}
`

export default Products
