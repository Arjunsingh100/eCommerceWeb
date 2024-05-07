import axios from "axios";
import { useState,useEffect } from "react";

export default function useCategory () {
    const [categories,setCategories] = useState([]);
    useEffect(()=>{
        getCategories();
    },[])
    const getCategories = async () =>{
         try{
            const {data} = await axios.get('https://ecommerceweb-1.onrender.com/api/v1/category/get-categories');
        if(data?.success){
            setCategories(data?.allCategories);
        }
         }
         catch(error) {
            console.log(error)
         }
    }
    return categories;
}