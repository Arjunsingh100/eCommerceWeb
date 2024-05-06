import { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import AdminMenu from '../../components/AdminMenu'
import { Select } from 'antd'
import { toast, ToastContainer } from 'react-toastify'
const { Option } = Select;

const UpdateProduct = () => {
    const navigate = useNavigate();
    const param = useParams();
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState('');
    const [photo, setPhoto] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [shipping, setShipping] = useState('');
    const [id, setId] = useState('');



    const getAllCategories = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/v1/category/get-categories');
            if (data?.success) {
                setCategories(data?.allCategories)
            }
        }
        catch (error) {
            console.log(error)
            toast.error('Problem when fetching Categories');
        }
    }
    useEffect(() => {
        getAllCategories();
    }, [])
    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/api/v1/products/get-product/${param.slug}`);
            setName(data?.singleProduct?.name)
            setDescription(data?.singleProduct?.description)
            setCategory(data?.singleProduct?.category?.name)
            setPrice(data?.singleProduct?.price)
            setQuantity(data?.singleProduct?.quantity)
            setShipping(data?.singleProduct?.shipping)
            setId(data?.singleProduct?._id)
            console.log(data)
        }
        catch (error) {
            console.log(error)
            toast.error('Something went Wrong')
        }
    }
    useEffect(() => {
        getSingleProduct();
    }, [])
    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        try {
            const updatedProductData = new FormData();
            updatedProductData.append("name", name)
            updatedProductData.append("category", category)
            updatedProductData.append("price", price)
            photo && updatedProductData.append("photo", photo);
            updatedProductData.append("description", description)
            updatedProductData.append("quantity", quantity)
            updatedProductData.append("shipping", shipping);
            console.log(updatedProductData.files)
            console.log(updatedProductData.get(name))
            console.log(updatedProductData)
            const { data } = await axios.put(`http://localhost:5000/api/v1/products/update-product/${id}`,  {updatedProductData});
            if (data?.success) {
                toast.success(data?.message);
                navigate('/dashboard/admin/products')
            }
            else {
                toast.success(data.message)
            }
        }
        catch (error) {
            console.log(error)
            toast.error('Error when updating Product')
        }
    }
    const handleDeleteProduct = async ()=>{
        try{
            const {data} = await axios.delete(`http://localhost:5000/api/v1/products/delete-product/${id}`);
            if(data?.success){
                toast.success(data?.success)
                navigate('/dashboard/admin/products');
            }
            else{
                toast.error(data?.message)
            }
        }
        catch(error){
            console.log(error)
            toast.error('Something went wrong')
        }
    }
    return (
        <Layout>
            <Container>
                <div className='update-products'>
                    <div><AdminMenu /></div>
                    <div className='update-container'>
                        <h2>Update Container</h2>
                        <div>
                            <Select

                                placeholder='Select a category'
                                showSearch
                                size='large'
                                onChange={(value) => { setCategory(value) }}>
                                {
                                    categories?.map((cat) => {
                                        return (
                                            <Option key={cat._id} value={cat._id}>{cat.name}</Option>
                                        )
                                    })
                                }
                            </Select>
                            <div className='select-photo'>
                                <label htmlFor='photo'>
                                    {photo ? photo.name : 'Upload Photo'}
                                    <input type='file'
                                        name='photo'
                                        id='photo'
                                        accept='image/*'
                                        onChange={(e) => { setPhoto(e.target.files[0]) }}
                                        hidden
                                    ></input>
                                </label>
                            </div>
                            <div className="mb-3">
                                { (
                                    <div className="text-center">
                                        <img
                                            src={photo  ? URL.createObjectURL(photo) :`http://localhost:5000/api/v1/products/get-photo/${id}`}
                                            alt="product_photo"
                                            height={"200px"}
                                            className="img img-responsive"
                                        />
                                    </div>
                                )}
                            </div>
                            <div>
                                <input type='text'
                                    placeholder='Enter Product Name'
                                    name='name'
                                    value={name}
                                    onChange={(e) => { setName(e.target.value)}} />
                            </div>
                            <div>
                                <input type='text'
                                    placeholder='Enter description'
                                    name='description'
                                    value={description}
                                    onChange={(e) => { setDescription(e.target.value) }} />
                            </div>
                            <div>
                                <input type='number'
                                    placeholder='Enter Quantity'
                                    name='quantity'
                                    value={quantity}
                                    onChange={(e) => { setQuantity(e.target.value) }} />
                            </div>
                            <div>
                                <input type='number'
                                    placeholder='Enter price'
                                    name='price'
                                    value={price}
                                    onChange={(e) => { setPrice(e.target.value) }} />
                            </div>
                            <div>
                                <Select placeholder='Choose Shipping' onChange={(value) => { setShipping(value) }}>
                                    <Option value='1'></Option>
                                    <Option value='0'></Option>
                                </Select>
                            </div>
                            <button type='submit' onClick={handleUpdateProduct}>Update Product</button>
                            <button type='submit' onClick={handleDeleteProduct}>Delete Product</button>
                        </div>
                    </div>
                    <ToastContainer />
                </div>
            </Container>
        </Layout>
    )
}

const Container = styled.div`
display:flex;
justify-content:center;
.update-products{
  width:90vw;
  display:flex;
  flex-direction:row;
  justify-content:space-between;
  gap:20px;
  .update-container{
    width:70vw;
  }
}`

export default UpdateProduct
