import React, { useState, useEffect } from 'react';
import { userRegisterRequest } from './userAction';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './login.css';
const Register = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setusername] = useState('');
    const [Confirmpassword, setConfirmPassword] = useState('');
    const [massage, setMassage] = useState('');
    const [inputError, setInputError] = useState('');


    const navigate = useNavigate();
    const userRegister = useSelector(state => state.userRegister);
    const { loading, userInfo, error } = userRegister;
    const dispatch = useDispatch();

    const submitHandler = e => {
        e.preventDefault();
        if (password != Confirmpassword) {
            setMassage('Passwords do not match');
        } else if (!email || !username || !password || !Confirmpassword) {
            setInputError('Please fill in all the fields');
        }
        else {
            dispatch(userRegisterRequest(email, username, Confirmpassword, password));
        }

    };

    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
    }, [userInfo, navigate]);

    return (
        <section className="vh-200 gradient-custom">
            <div className='container py-5 h-100'>
                <div className='row d-flex justify-content-center align-items-center h-100'>
                    <div className='col-12 col-md-8 col-lg-6 col-xl-5'>
                        <div className="card bg-light text-dark">
                            <div className="card-body p-5">
                                <div className="mb-md-5 mt-md-4 pb-5">
                                    <h1 className='text-center'> SIGN UP</h1>

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
                                                required
                                            />
                                        </div>
                                        {inputError && !email && <div className="error-message">Please enter your email</div>}
                                        <div className='mb-3'>
                                            <label htmlFor="exampleInputusername" className="form-label">username</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="exampleInputusername"
                                                aria-describedby="usernameHelp"
                                                value={username}
                                                onChange={e => setusername(e.target.value)}
                                                required
                                            />
                                        </div>
                                        {inputError && !username && <div className="error-message">Please enter your username</div>}
                                        <div className='mb-5'>
                                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="exampleInputPassword1"
                                                value={password}
                                                onChange={e => setPassword(e.target.value)}
                                                required
                                            />
                                        </div>
                                        {inputError && !password && <div className="error-message">Please enter your password</div>}

                                        <div className='mb-5'>
                                            <label htmlFor="exampleInputPassword" className="form-label"> Confirm Password</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="exampleInputPassword"
                                                value={Confirmpassword}
                                                onChange={e => setConfirmPassword(e.target.value)}
                                                required
                                            />
                                        </div>
                                        {inputError && !Confirmpassword && <div className="error-message">Please confirm your password</div>}
                                        {massage && <div className="error-message danger">{massage}</div>}
                                        {error && <div className="error-message danger">{error}</div>}

                                        <div className="text-center mb-4">
                                            <button type="submit" className="btn btn-dark">Register</button>
                                        </div>
                                        <div className="text-center">
                                            <p> have an account? <Link to="/login" style={{ color: 'black' }} >Login</Link></p>
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

}

export default Register;
