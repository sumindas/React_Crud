import React from 'react'
import './NavBar.css'
import {useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ADMINLOGOUT } from '../Redux/ActionType'
const Navbar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogout = () =>{
        dispatch({
            type:ADMINLOGOUT,
            admintoken:'',
            allUsers:[],
            

        })
        navigate('/admin')
    }
   
    return (
        <div>
            <ul className='navbar'>
            <h1 className='heading'>Users List</h1>
            <button onClick={(e)=>handleLogout(e)}>Logout</button>
            
          
                
            </ul>
        </div>
    )
}

export default Navbar