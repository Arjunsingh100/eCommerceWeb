import React from 'react'
import { useSearch } from '../../context/search'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'

const SearchForm = () => {
  const navigate = useNavigate();
  const [values, setValues] = useSearch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.get(`https://ecommerceweb-1.onrender.com/api/v1/products/search/${values.keyword}`);
    setValues({ ...values, results: data?.products })
    navigate('/search');
  }
  return (
    <Container>
      <div>
        <form onSubmit={handleSubmit}>
          <input type='text'
            name='searc'
            placeholder='Search Here...'
            value={values.keyword}
            onChange={(e) => { setValues({ ...values, keyword: e.target.value }) }}
          />
          <button type='submit'>Search</button>
        </form>
      </div>
    </Container>
  )
}

const Container = styled.div`
form {
  display:flex;
  flex-direction:row;
  input {
    width: 90%;
    height: 50px;
    padding-left: 10px;
    outline: none;
    border: none;
    border-radius: 50px;
    font-size: 18px;
  }
  button{
    height: 50px;
    padding-left: 10px;
    padding-right: 10px;
    margin-left: 15px;
    border:none;
    outline:none;
    border-radius: 50px;
    background-color: #ffc107;
    color: white;
    
  }
}
`

export default SearchForm
