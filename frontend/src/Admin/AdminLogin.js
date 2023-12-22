import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './AdminLogin.css'
import { ADMINLOGIN } from '../Redux/ActionType'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const admintoken = useSelector(state => state.admintoken)
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (admintoken) {
            navigate('/admin-home')
        }else{
            navigate('/admin')
        }

    }, [admintoken, navigate])
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null)
        await fetch('http://127.0.0.1:8000/cadmin/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                email, password
            })
        }).then(async (res) => {
            const data = await res.json();
            console.log(data)
            console.log(data.error)

            switch (data.error) {
                case 'Both email and password required':
                    setError(data.error);
                    break;

                case 'Incorrect Password':
                    setError(data.error);
                    break;

                case 'Admin Access is required':
                    setError(data.error);
                    break;

                default:
                    break;
            }
            

            if (!data.error) {
                dispatch({
                    type: ADMINLOGIN,
                    token: data,

                })
                // Navigate to the desired location
                navigate('/admin-home');
            }




        })


    }


    return (
        <>
            <div className='adminbox1'>
                <h1 style={{textAlign:"center"}}>Admin Login</h1>
                <form onSubmit={(e) => handleSubmit(e)}>

                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" />
                    </div>

                    {error && <div className='error'>{error}</div>}
                    <button type="submit" className="btn btn-primary">Submit</button>

                </form>

            </div>



        </>
    )
}

export default Login