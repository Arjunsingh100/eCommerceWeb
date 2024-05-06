import { useState, useEffect } from 'react'
import { useRef } from 'react'
import Layout from '../../components/Layout'
import styled from 'styled-components'
import UserMenu from '../../components/UserMenu'
import { useAuth } from '../../context/auth'
import axios from 'axios'
import { toast } from 'react-toastify'

const Profile = () => {
  const userPanelHandlerRef = useRef();
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('');

  const handleUserPanel = () => {
    userPanelHandlerRef.current.classList.toggle('user-panel1')
  }

  useEffect(() => {
    try {
      const { name, email, password, phone, address } = auth?.user;
      setName(name)
      setEmail(email)
      setPhone(phone)
      setAddress(address)
      setPassword(password)
    }
    catch (error) {
      console.log(error)
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { data } = await axios.put('http://localhost:5000/api/v1/auth/profile', {
      name: name,
      email: email,
      password: password,
      phone: phone,
      address: address,
    });
    if (data?.error) {
      toast.error(data?.success)
    }
    else {
      setAuth({ ...auth, user: data?.updatedUser });
      let ls = localStorage.getItem('auth');
      ls = JSON.parse(ls)
      ls.user = data?.updatedUser;
      localStorage.setItem('auth', JSON.stringify(ls))
      toast.success("User Updated Successfully");
    }
    console.log(data)
  }

  return (
    <Layout>
      <Container>
        <div className='profile'>
          <div className='user-panel' ref={userPanelHandlerRef}><UserMenu /></div>
          <div className='profile-form'>
            <div className='fas fa-bars' onClick={handleUserPanel}></div>
            <div className='register-form'>
              <form onSubmit={handleSubmit}>
                <h2>USER PROFILE</h2>
                <input type='text' name='name' value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Your Name' required />
                <input type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your Email' required disabled />
                <input type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Your Password' required />
                <input type='phone' name='phone' value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='Enter Your Phone No' required />
                <input type='text' name='address' value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Enter Your Address' required />
                <button type='submit'>CHANGE</button>
              </form>
            </div>
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
align-items:center;
background-image: linear-gradient(to right, red,orange,yellow,green,blue,indigo,violet);
.profile{
  width:90vw;
  display:flex;
  flex-direction:row;
  justify-content:space-between;
  gap:20px;
  margin-top:20px;
  .profile-form{
    position:relative;
    .fa-bars {
      display:none;
      position:absolute;
      top:50px;
      right:50px;
      color: white;
      font-size: 25px;
      margin-right: 20px;
  }
    width:80%;
    height:90vh;
    display:flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;
    background-color: #333;
    .register-form{
      width:300px;
    form{
      border-radius:9px;
        h2{
        font-family: "Playfair Display", serif;
    }
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    gap:15px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    padding:15px;
    background-color:#fff;
    input{
        width:250px;
        padding:8px;
        border:none;
        border:2px solid #555;
        border-radius:9px;
        outline:none;
    }
    input:hover{
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 5px;
        border:none;
    }
    button{
        width:250px;
        paddding:18px;
        text-align:center;
        border-radius: 9px;
        background-color: rgb(233, 43, 176);
        color:white;
        font-size:19px;
        outline:none;
        border:none;
    }
    button:hover{
    cursor:pointer;
    background: linear-gradient(
    to right,
    #434343,
    #000000
  );
    }
    li {
        list-style-type:none;
        a{
            text-decoration:none;
        }
    }
    }
}
  }
}
@media screen and (max-width:817px){
  .profile {
    width:100vw;
    .profile-form {
      margin-left:7vw;
      .fa-bars {
        display:inline-block;
      }
    }
  }
  .user-panel {
    position:absolute;
    top:50px;
    left:-300px;
    z-index:1;
    transition: 2s ease;
  }
  .user-panel1{
    position:absolute;
      top:50px;
      left:350px;
      z-index:1;
  }
}
`

export default Profile
