import React from 'react'
import Header from './Header'
import Footer from './Footer'
import styled from 'styled-components'
const Layout = (props) => {
  return (
    <Container>
      <div>
        <Header />
        <main style={{ height: '80vh', overflowX:'hidden' }}>{props.children}</main>
        <Footer />
      </div>
    </Container>
  )
}

const Container = styled.div`

`
export default Layout
