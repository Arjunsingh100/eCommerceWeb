import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import AdminMenu from '../../components/AdminMenu'
import styled from 'styled-components'
import axios from 'axios'
import { Select } from 'antd'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
const { Option } = Select;


const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState('');
  const [photo, setPhoto] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [shipping, setShipping] = useState(null);

  const getAllCategories = async () => {
    const allCategories = await axios.get('http://localhost:5000/api/v1/category/get-categories');
    if (allCategories?.data.success) {
      setCategories(allCategories?.data?.allCategories)
    }
    else {
      toast.error(allCategories?.data?.message);
    }
  }
  useEffect(() => {
    getAllCategories();
  }, [])
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const newProductData = new FormData();
      newProductData.append("name", name)
      newProductData.append("category", category)
      newProductData.append("photo", photo)
      newProductData.append("price", price)
      newProductData.append("description", description)
      newProductData.append("quantity", quantity);
      newProductData.append("shipping", shipping)
      const { data } = await axios.post('http://localhost:5000/api/v1/products/create-product', newProductData);
      console.log(data)

      if (data?.success) {
        toast.success(data?.success);
        navigate('/dashboard/admin/products');
      }
      else {
        toast.error(data?.success);
      }
    }
    catch (error) {
      console.log(error)
      toast.error('Problem when creating product');
    }
  }
  return (
    <Layout>
      <Container>
        <div className='create-product'>
          <AdminMenu />
          <div className='product-container'>
            <h2>Create Product</h2>
            <div>
              <Select

                placeholder='Select a category'
                showSearch
                size='large'
                onChange={(value) => { setCategory(value) }}>
                {
                  categories?.map((cat,index) => {
                    return (
                      <Option key={index} value={cat._id}>{cat.name}</Option>
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
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
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
                  onChange={(e) => { setName(e.target.value) }} />
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
                <Select placeholder='Choose Shipping'showSearch onChange={(value) => { setShipping(value) }}>
                  <Option value='1'>Yes</Option>
                  <Option value='0'>No</Option>
                </Select>
              </div>
              <button type='submit' onClick={handleCreateProduct}>Create Product</button>
            </div>
          </div>
        </div>
        <ToastContainer />
      </Container>
    </Layout>
  )
}

const Container = styled.div`
display:flex;
justify-content:center;
.create-product{
  width:90vw;
  display:flex;
  flex-direction:row;
  justify-content:space-between;
  gap:20px;
  .product-container{
    width:70vw;
  }
}
`

export default CreateProduct
