import React from 'react'
import {Plus} from 'lucide-react'
import { useNavigate } from "react-router";

const Navbar = () => {

    const navigate = useNavigate()

  return (
    <nav className='mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6'>
        <h1 className='font-bold text-2xl text-pink-400'>Instagram</h1>
        <button 
        onClick={()=>{
            navigate("/create-post")
        }}
        >
            <Plus className='text-white'/>
        </button>
    </nav>
  )
}

export default Navbar
