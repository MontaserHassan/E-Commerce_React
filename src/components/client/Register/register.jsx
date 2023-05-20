import React, { useState, useEffect } from 'react';
import { userRegisterRequest } from '../userAction';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import '../login.css';
import auth from '../../images/28124.jpg'
import './register.css'
import { setAppElement } from 'react-modal';
import PasswordChecklist from "react-password-checklist"

const Register = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setusername] = useState('');
    const [Confirmpassword, setConfirmPassword] = useState('');
    const [massage, setMassage] = useState('');
    const [inputError, setInputError] = useState('');
    const [Error, setError] = useState('');
    const [passwordFocused, setPasswordFocused] = useState(false);
    const passwordInstructions = 'Password should contain at least one uppercase letter, one lowercase letter, one number, and one special character';
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
            setMassage('')
            setError('')
            dispatch(userRegisterRequest(email, username, Confirmpassword, password));
        }

    };

    useEffect(() => {
        if (userInfo) {
            navigate('/login');
        }
        if (error) {
            setError(error)
        }
    }, [userInfo, navigate, error]);


    return (

        <section className="vh-200" style={{ backgroundColor: '#fff' }}>

            <div className="container h-100">

                <div className="row d-flex justify-content-center align-items-center h-100 " >
                    <div className="col-lg-12 col-xl-11"  >
                        <div style={{ backgroundColor: '#fff' }}>
                            <div className="card-body p-md-5" >
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">SIGN UP</p>
                                        <form onSubmit={submitHandler} className="mx-1 mx-md-4" noValidate >
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
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            {inputError && !email && <div className="error-message">Please enter your email</div>}
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                <div className=" flex-fill mb-0">
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
                                            </div>

                                            {inputError && !username && <div className="error-message">Please enter your username</div>}
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                                <div className="flex-fill mb-0">
                                                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        id="exampleInputPassword1"
                                                        value={password}
                                                        onFocus={() => setPasswordFocused(true)}
                                                        onBlur={() => setPasswordFocused(false)}
                                                        onChange={e => {
                                                            setPassword(e.target.value);
                                                        }}

                                                        required
                                                    />
                                                </div>
                                            </div>
                                            {passwordFocused && <PasswordChecklist
                                                rules={["minLength", "specialChar", "number", "capital"]}
                                                minLength={5}
                                                value={password}
                                                valueAgain={Confirmpassword}

                                            />}


                                            {inputError && !password && <div className="error-message">Please enter your password</div>}

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                                <div className="flex-fill mb-0">
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
                                            </div>
                                            {inputError && !Confirmpassword && <div className="error-message">Please confirm your password</div>}
                                            {massage && <div className="error-message danger">{massage}</div>}
                                            {error && <div className="error-message danger">{error}</div>}

                                            <div className="text-center mb-4">
                                                <button type="submit" className="btn btn-dark">Register</button>
                                            </div>
                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">

                                                <p> have an account? <Link to="/login" style={{ color: 'black' }} >Login</Link></p>
                                            </div>
                                        </form>


                                    </div>

                                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                        <div className='video-container' >

                                            <div className="img-fluid">
                                                <img src={auth} type="video/mp4" />

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

}

export default Register;
