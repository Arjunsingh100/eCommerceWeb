import React from 'react'
import { useRef } from 'react'
import Layout from '../components/Layout'
import { useSearch } from '../context/search'
import styled from 'styled-components'

const Search = () => {
    const [search, setSearch] = useSearch();
    return (
        <Layout>
            <Container>
                <div className='products'>
                    <h2>Search Page</h2>
                    <div className='products-container'>
                        {search.results.length > 0 ? ( search.results.map((product) => {
                                return (
                                    <div key={product._id} className='product'>
                                        <img style={{ width: '200px', height: '200px' }} src={`https://ecommerceweb-1.onrender.com/api/v1/products/get-photo/${product._id}`} alt='product_img' />
                                        <div>
                                            <h5>{product.name}</h5>
                                            <p>{product.price}</p>
                                            <p>{product.description}</p>
                                        </div>
                                    </div>
                                )
                            })):'PRODUCTS NOT FOUND'}
                    </div>
                </div>
            </Container>
        </Layout>
    )
}

const Container = styled.div`
width:100vw;
display:flex;
flex-direction:row;
justify-content:center;
.products{
    border:1px solid red;
    width:90%;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    gap:20px;
    h2{
        margin-top:20px;
    }
    .products-container{
        width:100%;
        display:flex;
        justify-content:center;
        flex-direction:row;
        flex-wrap:wrap;
        gap:20px;
    }
}
`
 
export default Search
