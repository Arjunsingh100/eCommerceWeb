import { useEffect, useState } from 'react';
import { useAuth } from '../../context/auth';
import { Outlet } from 'react-router-dom';
import Spinner from '../Spinner';
import axios from 'axios';

export default function AdminRoute () {
    const [auth,setAuth]=useAuth();
    const [ok,setOk]=useState(false);

    useEffect(()=>{
        const checkAuth = async ()=>{
            const res = await axios.get('https://ecommerceweb-1.onrender.com/api/v1/auth/admin-auth');
            if(res.data.Ok){
                setOk(true)
            }
            else{
                setOk(false);
            }
        }
        if(auth?.token) checkAuth();
    }, [auth?.token])

    return ok ? <Outlet /> : <Spinner path='/home' />
}