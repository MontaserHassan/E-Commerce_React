import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLoginRequest } from './userAction';
import './login.css';
import { useEffect } from 'react';

const getUserInfoFromLocalStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

const initialState = {
    userLogin: { userInfo: getUserInfoFromLocalStorage },
};

const Login = ({ Location, history }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const userLogin = useSelector(state => state.userLogin);
    const { loading, userInfo, error } = userLogin;
    const dispatch = useDispatch();
    // const redirect = Location.search ? Location.search.split('=')[1] : '/'

    console.log(Location)
    const submitHandler = e => {
        e.preventDefault();
        console.log(userInfo);
        dispatch(userLoginRequest(email, password));
        // navigate(-1); // Go back to the previous page
    };
    // useEffect(() => {
    //     if (userInfo) {
    //         history.push(redirect)
    //     }
    // }, [history, userInfo, redirect])


    return (
        <form onSubmit={submitHandler}>
            <h1>Sign Up </h1>
            <div>{error}</div>

            <div className="form-outline mb-4">
                <input
                    type="email"
                    id="Email"
                    className="form-control"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <label className="form-label" htmlFor="Email">
                    Email address
                </label>
            </div>

            <div className="form-outline mb-4">
                <input
                    type="password"
                    id="password"
                    className="form-control"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <label className="form-label" htmlFor="password">
                    Password
                </label>
            </div>

            <div className="row mb-4">
                <div className="col d-flex justify-content-center">
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="form2Example31"
                            checked
                        />
                        <label className="form-check-label" htmlFor="form2Example31">
                            Remember me
                        </label>
                    </div>
                </div>
                <div className="col">
                    <a href="#!">Forgot password?</a>
                </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block mb-4">
                Sign in
            </button>

            <div className="text-center">
                <p>
                    Not a member? <Link to="/register">Register</Link>
                </p>
                <p>or sign up with:</p>
                <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-facebook-f"></i>
                </button>
                <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-google"></i>
                </button>
                <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-twitter"></i>
                </button>
                <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-github"></i>
                </button>
            </div>

        </form>

    )
};

export default Login;
