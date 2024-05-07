import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import AdminMenu from '../../components/AdminMenu'
import styled from 'styled-components'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import CategoryForm from '../../components/Forms/categoryForm';
import { Modal } from 'antd';

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [open,setOpen] = useState(false);
  const [selected,setSelected] = useState(null)
  const [updateName,setUpdateName] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('https://ecommerceweb-1.onrender.com/api/v1/category/create-category', {
        name,
      });
      if (data?.success) {
        toast.success(data?.message);
        getAllCategories();
      }
      else {
        toast.error(data?.message);
      }
    }
    catch (error) {
      console.log(error)
    }
  }
  const getAllCategories = async () => {
    const allCategories = await axios.get('https://ecommerceweb-1.onrender.com/api/v1/category/get-categories');
    if (allCategories?.data.success) {
      setCategories(allCategories?.data?.allCategories)
    }
    else {
      toast.error(allCategories.data.message);
    }
  }
  useEffect(() => {
    getAllCategories();
  }, [])
  const handleUpdate = async (e) =>{
    e.preventDefault();
     try{
      setOpen(false);
    const {data} = await axios.put(`https://ecommerceweb-1.onrender.com/api/v1/category/update-category/${selected}`,{
      name:updateName,
    })
    if(data?.success){
      getAllCategories();
      toast.success(data.message)
    }
    else{
      toast.error(data.message)
    }
     }
     catch(error){
      console.log(error);
      toast.error('Some problem when updating Category')
     }
  }
  const handleDelete = async (id) =>{
    try{
      const {data} = await axios.delete(`https://ecommerceweb-1.onrender.com/api/v1/category/delete-category/${id}`);
      if(data?.success){
        toast.success(data.message);
        getAllCategories();
      }
      else{
        toast.error(data.message);
      }
    }
    catch(error){
      console.log(error);
      toast.error('Error while deleting Product')
    }
  }
  return (
    <Layout>
      <Container>
        <div className='create-category'>
          <AdminMenu />
          <div className='manage-category'>
            <h2>Manage Category</h2>
            <div>
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div>
              <table className='category-table'>
                <thead>
                  <tr>
                    <th>NAME</th>
                    <th>ACTIONS</th>
                   </tr>
                </thead>
                <tbody>
                  {
                    categories.map((cat,index) => {
                      return (
                          <tr key={index}>
                            <td>{cat.name}</td>
                            <td>
                              <button onClick={() => {
                                setOpen(true);
                                setSelected(cat._id);
                              }}>Edit</button>
                              <button style={{backgroundColor:'red'}}
                              onClick={ ()=>{
                                handleDelete(cat._id)
                              }}
                              >Delete</button>
                            </td>
                          </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
          <Modal onCancel={() => {
            setOpen(false)}}
            footer={null}
            open={open}
          >
          <CategoryForm
          value={updateName}
          setValue={setUpdateName}
          handleSubmit={handleUpdate}
           />
          </Modal>
        </div>
        <ToastContainer />
      </Container>
    </Layout>
  )
}

const Container = styled.div`
display:flex;
justify-content:center;
overflow:auto;
.create-category{
  width:90vw;
  margin-top:30px;
  display:flex;
  flex-direction:row;
  justify-content:space-between;
  gap:20px;
  .manage-category {
    width:70vw;
    display:flex;
    flex-direction:column;
    row-gap:15px;
    .category-table {
      flex-grow:1;
      tr{
        border-bottom:1px solid #111;
      }
      thead{
       tr{
        border-bottom:1px solid #111;
       }
      }
      tbody {
        tr{
           td{
            button{
            width:80px;
            color:white;
            margin:15px 15px;
                padding:10px;
                background-color:green;
                outline:none;
                border:none;
                border-radius:5px;
                cursor:pointer;
          }
           }
        }
      }
    }
  }
}`

export default CreateCategory
