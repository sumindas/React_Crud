import React, { useState } from 'react'
import './Register.css'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const[error, setError] = useState('')
    // const [redirect, setRedirect] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        setError('')
        console.log(error)
        e.preventDefault();
        if (password === confirmPassword) {
            try {
                const response = await fetch('http://127.0.0.1:8000/register/', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        first_name: firstname,
                        last_name: lastname,
                        email,
                        phone,
                        password,
                    })
                });
                const data = await response.json();
                
    
                if (response.ok) {
                    console.log('success');
                    navigate('/');
                } else {
                    setError(data.error)
                
                
              
                }
            } catch (error) {
            
                console.error('Error occurred during fetch request:', error);
                
            }
        } else {
            setError("password mismatch")
           
        }
    };
        return (
            <>
                <div className='box1'>
                <h1 style={{textAlign:'center'}}>Sign Up</h1>
                    <form onSubmit={(e) => handleSubmit(e)}>

                        <div className="mb-3">
                            <label className="form-label">First Name</label>
                            <input value={firstname} onChange={(e) => setFirstname(e.target.value)} type="text" name='firstname' className="form-control" required />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Last Name</label>
                            <input value={lastname} onChange={(e) => setLastname(e.target.value)} type="text" name='lastname' className="form-control" required />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Phone</label>
                            <input value={phone} onChange={(e) => setPhone(e.target.value)} type="text" name='phone' className="form-control" required />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Email address</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" required />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" required />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Confirm Password</label>
                            <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" className="form-control" required />
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>
                        {error && <div className='error'>
                            {error}
                        </div>}

                        <div className='registerBtn'>
                            <span>Already have an account?</span>  <Link to='/'>Login</Link>
                        </div>
                        
                        
                    </form>
                </div>

            </>

        )
    }

    export default Register;