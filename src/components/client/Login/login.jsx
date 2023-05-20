import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLoginRequest } from '../userAction';
import '../login.css';
import webm from '../../images/Premium Vector _ Online shopping illustration concept.png'

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const userLogin = useSelector(state => state.userLogin);
    const { loading, userInfo, error } = userLogin;
    const dispatch = useDispatch();

    const submitHandler = e => {
        e.preventDefault();
        dispatch(userLoginRequest(email, password));
    };

    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
    }, [userInfo, navigate]);

    return (
        <section className="vh-200" style={{ backgroundColor: '#fff' }}>

            <div className="container h-100">

                <div className="row d-flex justify-content-center align-items-center h-100 " >
                    <div className="col-lg-12 col-xl-11"  >
                        <div style={{ backgroundColor: '#fff' }}>
                            <div className="card-body p-md-5" >
                                <div className="row justify-content-center">
                                    <div className="form-login col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1 ">

                                        <h1 className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">LOGIN</h1>

                                        <form onSubmit={submitHandler} className="mx-1 mx-md-4">
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                <div className=" flex-fill mb-0">
                                                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        id="exampleInputEmail1"
                                                        aria-describedby="emailHelp"
                                                        value={email}
                                                        onChange={e => setEmail(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                                <div className=" flex-fill mb-0">
                                                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>

                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        id="exampleInputPassword1"
                                                        value={password}
                                                        onChange={e => setPassword(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            {error && <div className="error-message danger">{error}</div>}
                                            <div className="text-center mb-4">
                                                <button type="submit" className="btn btn-dark">login</button>
                                            </div>
                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <p>Don't have an account? <Link to="/register" style={{ color: 'black' }} >Sign up</Link></p>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                        <div className='video-container' >

                                            <div className="img-fluid">
                                                <img src={webm} type="video/mp4" />

                                            </div></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
};

export default Login;
