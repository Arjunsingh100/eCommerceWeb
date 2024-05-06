import React from 'react'
import styled from 'styled-components';

const CategoryForm = (props) => {
    const { handleSubmit, value, setValue } = props;
    return (
        <Container>
            <div className='form-container'>
                <form onSubmit={handleSubmit}>
                    <input type='text' placeholder='Enter new Category' value={value} onChange={(e) => { setValue(e.target.value) }} /><br />
                    <button type='submit'>Create</button>
                </form>
            </div>
        </Container>
    )
}

const Container = styled.div`
.form-container {
    form {
        display:flex;
        flex-direction:column;
        column-gap:20px;
        input{
            width:250px;
            padding:9px;
            border-radius:5px;
        }
        button{
            width:100px;
            color:white;
                padding:10px;
                background-color:green;
                outline:none;
                border:none;
                border-radius:5px;
                cursor:pointer;
            }
    }
}
`
export default CategoryForm
