import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SETUSER, LOGIN } from '../Redux/ActionType'; 
import './Home.css'
const Home = () => {
    // const [user, setUserData] = useState({ first_name: "", last_name: "", email: "", phone: ""});
    const token = useSelector(state => state.token)
    const users = useSelector(state => state.users)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        (async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/user/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token.jwt}`
                    },
                    credentials: 'include'
                });
    

                const data = await response.json();
                
                const payload = {
                    firstname: data.first_name,
                    lastname:data.last_name,
                    email:data.email,
                    phone:data.phone,
                }
               
                dispatch({
                    type:SETUSER,
                    users:payload
                })
                // setUserData(data);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

            } catch (error) {
                console.error('Error while fetching user data:', error);
            }
        })();
    }, [token, dispatch]);

    
    



    const handleLogout = (e) => {
        console.log("sdsd")
        dispatch({
            type:LOGIN,
            token: '',

        })
        navigate('/')

    }

    return (
        <div>
            
            <button  className='btn btn-danger' onClick={(e) => handleLogout(e)} >Logout</button>

            <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
                <div className="container py-5 h-100">
                    <div className="row justify-content-center align-items-center h-100">
                        <div className="col-lg-6 mb-4 mb-lg-0">
                            <div className="card mb-3" style={{ borderRadius: '.5rem' }}>
                                <div className="row g-0">
                                    <div
                                        className="col-md-3 gradient-custom text-center text-white"
                                        style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                                        {/* Your content */}
                                    </div>
                                    {users && (
                                        <div className="col-md-9">
                                            <div className="card-body p-4">
                                                <h6 style={{textAlign:"center"}}><strong>User Information</strong></h6>
                                                <hr className="mt-0 mb-4" />
                                                <div className="row pt-1">
                                                    <div className="col-6 mb-3">
                                                        <h6>First name</h6>
                                                        <p className="text-muted"><strong>{users.firstname}</strong></p>
                                                    </div>
                                                    <div className="col-6 mb-3">
                                                        <h6>Last name</h6>
                                                        <p className="text-muted"><strong>{users.lastname}</strong></p>
                                                    </div>
                                                    <div className="col-12 mb-3">
                                                        <h6>Email</h6>
                                                        <p className="text-muted"><strong>{users.email}</strong></p>
                                                    </div>
                                                    <div className="col-12 mb-3">
                                                        <h6>Phone</h6>
                                                        <p className="text-muted"><strong>{users.phone}</strong></p>
                                                    </div>
                                                    {/* <div className="col-12 mb-3">
                                                        <h6>Upload Image</h6>
                                                        <input type="file" style={{width:"100%"}} className="form-control" />
                                                    </div> */}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>


    )
}

export default Home