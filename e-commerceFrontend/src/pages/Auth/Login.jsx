import React, { useState } from 'react'
import Layout from '../../components/Layout'
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../context/auth';


const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [cPass, setCPass] = useState('');
    const [auth,setAuth]=useAuth();

    const toastStyle = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            if (formValidation()) {
                const status = await axios.post('http://localhost:5000/api/v1/auth/login', {
                    email:email,
                    password: password,
                })
                if (status && status.data.success) {
                    setAuth({
                        ...auth,
                        user:status.data.user,
                        token:status.data.token
                    })
                    const setUser = localStorage.setItem('auth',JSON.stringify(status.data))
                    navigate(location.state || '/home');
                }
                else{
                    toast.error(status.data.message,toastStyle);
                }
            }
        }
        catch(error){
            console.log(error)
            toast.error('Something went wrong',toastStyle);
        }
    }
    const formValidation = () => {
        if (password !== cPass) {
            toast.error('Password and Confirm Password should match', toastStyle);
            return false;
        }
        else {
            return true;
        }
    }
    return (
        <Layout>
            <Container className='testClass'>
                <div className='register-form'>
                    <form onSubmit={handleSubmit}>
                        <h2>SIGN IN</h2>
                        <input type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your Email' required />
                        <input type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Your Password' required />
                        <input type='password' name='confirm_password' value={cPass} onChange={(e) => setCPass(e.target.value)} placeholder='Confirm Password' required />
                        <button type='submit'>Login</button>
                        <li><Link to='/forgot-password'>Forget Password</Link></li>
                        <li><Link to='/register'>Register</Link></li>
                    </form>
                </div>
                <ToastContainer />
            </Container>
        </Layout>
    )
}

const Container = styled.div`
width:100vw;
height:100%;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
background-color: #333;
  
.register-form{
    form{
        border-radius: 9px;
        opacity: 0.8;
        h2{
        font-family: "Playfair Display", serif;
    }
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    gap:20px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    padding:20px;
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
        paddding-top: 18px;
        padding-left: 18px;
        text-align:center;
        border-radius: 9px;
        background-color: rgb(233, 43, 176);
        border:none;
        outline:none;
        color:white;
        font-size:19px;
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
`

export default Login
