import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLoginRequest } from './userAction';
import './login.css';

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
        <section className="vh-100 gradient-custom">
            <div className='container py-5 h-100'>
                <div className='row d-flex justify-content-center align-items-center h-100'>
                    <div className='col-12 col-md-8 col-lg-6 col-xl-5'>
                        <div className="card bg-light text-dark">
                            <div className="card-body p-5">
                                <div className="mb-md-5 mt-md-4 pb-5">
                                    <h1 className='text-center'>Sign in</h1>

                                    <form onSubmit={submitHandler} style={{ maxWidth: '40rem', margin: '0 auto' }}>
                                        <div className='mb-3'>
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
                                        <div className='mb-5'>
                                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="exampleInputPassword1"
                                                value={password}
                                                onChange={e => setPassword(e.target.value)}
                                            />
                                        </div>
                                        {error && <div className="error-message danger">{error}</div>}
                                        <div className="text-center mb-4">
                                            <button type="submit" className="btn btn-dark">Submit</button>
                                        </div>
                                        <div className="text-center">
                                            <p>Don't have an account? <Link to="/register">Sign up</Link></p>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
