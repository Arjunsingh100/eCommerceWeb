import Layout  from '../components/Layout'
import React from 'react'
import useCategory from '../components/hooks/useCategory'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Categories = () => {
    const categories=useCategory();
    return (
        <Layout>
             <Container>
                <div>
                    {
                        categories.map((c)=>{
                            return (
                                <div key={c._id}>
                                    <button><Link to={`/category/${c.slug}`}>{c.name}</Link></button>
                                </div>
                            )
                        })
                    }
                </div>
             </Container>
        </Layout>
    )
}

const Container = styled.div``

export default Categories
