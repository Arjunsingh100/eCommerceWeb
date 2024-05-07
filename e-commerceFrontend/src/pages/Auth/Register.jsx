import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const Register = () => {
    const navigate=useNavigate();
    const [name,setName]=useState('');
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [phone,setPhone]=useState('')
    const [address,setAddress]=useState('');
    const [answer,setAnswer]=useState('');

    const handleSubmit=async (e)=>{
        e.preventDefault()
        const usr=await axios.post('https://ecommerceweb-1.onrender.com/api/v1/auth/register',{
            name:name,
            email:email,
            password:password,
            phone:phone,
            address:address,
            answer:answer
        })
        if(usr){
            navigate('/login');
        }
    }
  return (
    <Layout>
         <Container>
         <div className='register-form'>
            <form onSubmit={handleSubmit}>
            <h2>SIGN UP</h2>
                <input type='text' name='name' value={name} onChange={(e)=>setName(e.target.value)} placeholder='Enter Your Name' required/> 
                <input type='email' name='email' value={email} onChange={(e)=> setEmail(e.target.value)}  placeholder='Enter Your Email' required/> 
                <input type='password' name='password' value={password} onChange={(e)=> setPassword(e.target.value)}  placeholder='Enter Your Password' required/> 
                <input type='phone' name='phone' value={phone} onChange={(e)=> setPhone(e.target.value)} placeholder='Enter Your Phone No' required /> 
                <input type='text' name='address' value={address} onChange={(e)=> setAddress(e.target.value)} placeholder='Enter Your Address'  required/> 
                <input type='text' name='answer' value={answer} onChange={(e)=> setAnswer(e.target.value)} placeholder='Enter your Faviorate Pet'  required/> 
                <button type='submit'>Register</button>
                <li><Link to='/login'>Login</Link></li>

            </form>
        </div>
         </Container>
    </Layout>
  )
}

const Container=styled.div`
width:100vw;
height:100%;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
background-color: #333;
//   background-image: linear-gradient(0deg, #ffdee9 0%, #b5fffc 100%);
.register-form{
    form{
        opacity:0.8;
        border-radius: 9px;
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
        border: 2px solid black;
        border-radius: 9px;
        outline:none;
    }
    input:hover{
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 5px;
        border:none;
    }
    button{
        width:250px;
        paddding-top: 15px;
        text-align:center;
        background-color: rgb(233, 43, 176);
        border: none;
        outline: none;
        border-radius:9px;
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

export default Register
