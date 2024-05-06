import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Footer = () => {
  return (
   <>
    <Container>
        <div className='copyright'>
            <h3>all right reserved @ arjun daksh</h3>
        </div>
        <div className='footer-links'>
          <li><NavLink to='/about'>About</NavLink></li>
          <li><NavLink to='/contact'>Contact</NavLink></li>
          <li><NavLink to='/policy'>Policy</NavLink></li>
        </div>
    </Container>
   </>
  )
}

const Container=styled.div`
width:100vw;
height:100px;
background:linear-gradient(to right,#434343,#111111);
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
color:#eee;
.copyright{
  h3{
    font-size:23px;
    text-transform:uppercase;
  }
}
.footer-links{
  display:flex;
  flex-direction:row;
  align-items:center;
  justify-content:center;
  gap:15px;
  li{
    list-style-type:none;
    a{
      text-decoration:none;
      font-size:17px;
      color:#eee;
    }
    a.active{
      color:blueviolet;
    }
  }
}
`

export default Footer
