import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import Layout from '../../components/Layout';

const ForgetPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [newPassword, setNewPassword] = useState('');
    const [answer, setAnswer] = useState('');

    const handleSubmit = async () => {
        try {
            const user = await axios.post('http://localhost:5000/api/v1/auth/forget-password', {
                email: email,
                answer: answer,
                newPassword: newPassword,
            });
            if (user && user.data.success) {
                toast.success(user.data.message);
                navigate('/login');
            }
            else {
                toast.error(user.data.message);
            }
        }
        catch (error) {
            console.log(error);
            toast.error('Something went Wrong');
        }
    }
    return (
        <Layout>
            <Container>
                <div className='reset-form'>
                    <form onSubmit={handleSubmit}>
                        <h2>Reset Password Form</h2>
                        <input type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your Email' required />
                        <input type='password' name='newPassword' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder='Enter New Password' required />
                        <input type='text' name='answer' value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder='Enter your favourite Pet Name' required />
                        <button type='submit'>Reset</button>
                    </form>
                </div>
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
 
.reset-form{
    form{
        border-radius:9px;
        h2{
        font-family: "Playfair Display", serif;
    }
    form:hover{
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 5px;
        border:none;
    }
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    gap:20px;
    box-shadow: rgba(0, 0,0, 0.35) 0px 5px 15px;
    padding:20px;
    background-color:#fff;
    input{
        width:250px;
        padding:8px;
        border:none;
        border-radius: 9px;
        border:1px solid black;
        outline:none;
    }
    input:hover{
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 5px;
        border:none;
    }
    button{
        width:250px;
        paddding:15px;
        text-align:center;
        background-color: rgb(233, 43, 176);
        border: none;
        border-radius: 8px;
        outline: none;
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
    }
}
`

export default ForgetPassword
