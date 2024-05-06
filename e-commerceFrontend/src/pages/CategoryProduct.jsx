import axios from 'axios'
import Layout from '../components/Layout'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import styled from 'styled-components'

const CategoryProduct = () => {
    const navigate = useNavigate();
    const Params = useParams();
    const [products, setProducts] = useState([]);



    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/api/v1/products/product-category/${Params.slug}`)
            if (data?.success) {
                setProducts(data?.products)
            }
            else {
                toast.error(data?.message)
            }
        }
        catch (error) {
            console.log(error)
            toast.error("Error while fetching Products")
        }
    }

    return (
        <Layout>
            <Container>
                <div className='category-products'>
                    <div className='category'>
                        <h4>Category:{Params.slug}</h4>
                        <h5>{products.length} Results Found</h5>
                    </div>
                    <div className='products'>
                        {
                            products.map((product) => {
                                return (
                                    <div key={product._id} className='product'>
                                        <img style={{ width: '200px', height: '200px' }} src={`http://localhost:5000/api/v1/products/get-photo/${product._id}`} alt='product_img' />
                                        <div style={{ textAlign: 'center' }}>
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
            </Container>
        </Layout>
    )
}

const Container = styled.div`
.category-products {
    display:flex;
    flex-direction:column;
    gap:20px;
    align-items:center;
    .products {
        display:flex;
        flex-direction:row;
        gap:20px;
        flex-wrap:wrap;
        align-items:center;
        justify-content:center;
        .product{
            width:200px;
            border:2px solid green;
            border-radius: 9px;
            overflow:hidden;
            .buttons{
                width:100%;
                text-align:center;
                .more-detail-btn{
                  padding:6px;
                  border:none;
                  outline:none;
                  text-align:center;
                  background-color:#aa12ff;
                  color:white;
                  border-radius:9px;
                }
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
`

export default CategoryProduct
