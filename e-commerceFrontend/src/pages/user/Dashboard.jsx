import React from 'react'
import Layout from '../../components/Layout'
import UserMenu from '../../components/UserMenu'
import { useAuth } from '../../context/auth'
import styled from 'styled-components'

const Dashboard = () => {
  const [auth, setAuth] = useAuth();
  return (
    <Layout>
      <Container>
        <div className='user-dashboard'>
          <div><UserMenu /></div>
          <div className='user-action'>
            <h3>User Name:{auth?.user?.name}</h3>
            <h3>Email id:{auth?.user?.email}</h3>
            <h3>Address:{auth?.user?.address}</h3>
          </div>
        </div>
      </Container>
    </Layout>
  )
}

const Container = styled.div`
 display:flex;
 flex-direction:row;
 justify-content:center;
 .user-dashboard{
 width:90vw;
 display:flex;
 flex-direction:row;
 justify-content:space-between;
 column-gap:20px;
 .user-action{
  width:70vw;
  border:1px solid black;
}
 }
 `

export default Dashboard
