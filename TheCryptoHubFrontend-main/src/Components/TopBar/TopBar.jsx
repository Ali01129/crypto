import React from 'react'
import './TopBar.css'
import logo from './../../images/logo-crypto 2.png'
import { Link } from 'react-router-dom'
const TopBar = () => {
  return (
    <>
    
    <div className='topBarMain'>
    <div className='imgOuterSection'>
      <Link to="/">
      
        <img
        src={logo}
        className='topBarMainImg'
        style={{objectFit:"contain",width:"100%", height:"100%"}}
        />
        </Link>
</div>
    </div>
    </>
  )
}

export default TopBar