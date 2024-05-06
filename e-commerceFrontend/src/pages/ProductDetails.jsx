import Layout from '../components/Layout';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import styled from 'styled-components';

const ProductDetails = () => {
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([])
    const Params = useParams();

    const getRelatedProducts = async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/api/v1/products/related-product/${product?._id}/${product?.category?._id}`);
            if (data?.success) {
                setRelatedProducts(data?.relatedProduct);
            }
        }
        catch (error) {
            console.log(error);
            toast.error('Error in frontend to get related products');
        }
    }
    const getProduct = async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/api/v1/products/get-product/${Params.slug}`);
            if (data?.success) {
                setProduct(data?.singleProduct);
                console.log(data?.singleProduct)
                if (product._id) {
                    getRelatedProducts();
                }
            }
        }
        catch (error) {
            console.log(error)
            toast.error('Error while fetching product Details')
        }
    }
    useEffect(() => {
        getProduct();
    }, [product?.slug])
    return (
        <Layout>
            <Container>
                <div className='product-details'>
                    <div>
                        <img src={`http://localhost:5000/api/v1/products/get-photo/${product._id}`} alt='product_img' />

                    </div>
                    <div className='details'>
                        <h3>Product Details</h3>
                        <h5>Name:{product.name}</h5>
                        <h5>Description:{product.description}</h5>
                        <h5>Category:{product?.category?.name}</h5>
                        <h5>Shipping:{product.shipping === true ? 'Yes' : "No"}</h5>
                    </div>
                </div>
                <div className='similar-products'>
                    <h2>Similiar Products</h2>
                    <div className='products-container'>
                        {
                            relatedProducts.map((product) => {
                                return (
                                    <div key={product._id} className='product'>
                                        <img style={{ width: '200px', height: '200px' }} src={`http://localhost:5000/api/v1/products/get-photo/${product._id}`} alt='product_img' />
                                        <div>
                                            <h5>{product.name}</h5>
                                            <p>{product.price}</p>
                                            <p>{product.description}</p>
                                        </div>
                                        <div className='buttons'>
                                            <button className='more-detail-btn' onClick={() => { navigate(`/product/${product.slug}`) }}>More Details</button>
                                            <button className='add-cart-btn'>Add to Cart</button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <ToastContainer />
            </Container>
        </Layout>
    )
}

const Container = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
row-gap:20px;
.product-details {
    display:flex;
    flex-direction:row;
    justify-content:center;
    column-gap:80px;
    margin-top:20px;
}
.similar-products{
    .products-container{
        display:flex;
        flex-direction:row;
        flex-wrap:wrap;
        gap:20px;
        .product{
            .buttons{
            .more-detail-btn{
              border:none;
              outline:none;
              padding:8px;
              text-align:center;
              background-color:#aa12ff;
              color:white;
              border-radius:9px;
            }
            .add-cart-btn{
              border:none;
              outline:none;
              padding:8px;
              text-align:center;
              background-color:gray;
              color:white;
              border-radius:9px;
            }
          }
        }
    }
}
`

export default ProductDetails
