import React from 'react'
import Layout from '../../components/Layout'
import AdminMenu from '../../components/AdminMenu'
import styled from 'styled-components'

const Users = () => {
  return (
    <Layout>
         <Container>
         <div className='users'>
            <AdminMenu />
            <div>Container</div>
        </div>
         </Container>
    </Layout>
  )
}

const Container=styled.div`
display:flex;
justify-content:center;
.users{
  width:90vw;
  display:flex;
  flex-direction:row;
  justify-content:space-between;
  gap:20px;
}`

export default Users
