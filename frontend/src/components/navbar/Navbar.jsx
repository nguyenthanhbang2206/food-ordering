import { Avatar, IconButton } from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { pink } from '@mui/material/colors';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import "./Navbar.css"
export const Navbar = () => {
  return (
    <div className='px-5 z-50 py-[.8rem] bg-[#5A20CB] lg:px-20 flex justify-between' >
        <div className='lg:mr-10 cursor-pointer flex items-center space-x-4'>
          <li className='text-white text-2xl logo font-semibold'>Logo</li>
        </div>
        
      <div className='flex items-center space-x-2 lg:space-x-10'>
        <div className=''>
          <IconButton>
             <SearchIcon sx={{fontSize: 30, color: "white"}}/>          
          </IconButton>
        </div>
        <div className=''>
          <Avatar sx={{ width: 40, height: 40, bgcolor: "white", color: pink.A400 }} src="" >C</Avatar>
        </div>
        <div className=''>
          <IconButton>
              <Badge badgeContent={3} color="primary">
              <ShoppingCartIcon sx={{fontSize: 30, color: "white"}}/> 
                </Badge>
          </IconButton>
        </div>
      </div>
    </div>
  ) 
}
