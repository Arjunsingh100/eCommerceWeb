import React from 'react'
import Layout from '../components/Layout'
import styled from 'styled-components'

const Pagenotfound = () => {
  return (
    <Layout>
        <Container>
          <div className='error'>
            <h2>404</h2>
            <h3>oops!page not found</h3>
            <button>Go Back</button>
          </div>
        </Container>
    </Layout>
  )
}

const Container=styled.div`
width:100vw;
height:100%;
display:flex;
flex-direction:row;
align-items:center;
justify-content:center;
.error{
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  gap:15px;
  h2{
    font-size:40px;
  }
  h3{
    font-size:22px;
    text-transform:capitalize;
  }
  button{
    background:transparent;
    border:1px solid black;
    outline:none;
    font-size:12px;
    padding:10px;
    cursor:pointer;
  }
}
`

export default Pagenotfound
