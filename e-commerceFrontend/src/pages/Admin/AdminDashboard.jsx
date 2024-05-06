import React, { useContext } from 'react' 
import Layout from '../../components/Layout';
import AdminMenu from '../../components/AdminMenu';
import { useAuth } from '../../context/auth';
import styled from 'styled-components';

const AdminDashboard = () => {
  const [auth, setAuth] = useAuth();
  return (
    <Layout>
      <Container>
        <div className='dashboard'>
          <div><AdminMenu /></div>
          <div className='user-action'>
          <h3>User name:{auth?.user?.name}</h3> 
          <h3>Email id:{auth?.user?.email}</h3>
          <h3>Address: {auth?.user?.address}</h3>
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
.dashboard{
width:90vw;
display:flex;
flex-direction:row;
justify-content:space-between;
column-gap:20px;
.user-action{
  width:calc(90vw -250px)
}
}
`

export default AdminDashboard
