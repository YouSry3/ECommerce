import React from 'react'
import img from '../../assets/images/error.svg'
import Footer from '../Footer/Footer'
export default function NotFound() {
  return (
    <>
    
    
    <div className='w-10/12 mx-auto flex justify-center items-center mt-28'>
      <img src={img} className='w-4/5' alt="" />
    </div>
      <Footer/>
    </>
  )
}
