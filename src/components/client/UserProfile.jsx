import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateUserInfo } from './userAction';
import { Row, Col } from 'react-bootstrap';
function UserProfile() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setusername] = useState('');
    const [Confirmpassword, setConfirmPassword] = useState('');
    const [massage, setMassage] = useState('');
    const [inputError, setInputError] = useState('');
    const [editMode, setEditMode] = useState(false);

    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    console.log(userLogin);
    const { userInfo, loading, error } = userLogin;
    console.log('userInfo', userInfo);
    console.log('userLogin', userLogin);

    const handleCancel = () => {
        setEditMode(false);
        setEmail(userInfo.email);
        setusername(userInfo.username);
        setPassword('');
        setConfirmPassword('');
        setMassage('');
        setInputError('');
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== Confirmpassword) {
            setMassage('Passwords do not match');
        } else if (!email || !username) {
            setInputError('Please fill in all the fields');
        } else {
            dispatch(UpdateUserInfo(userInfo.user_id, { email, username, password }));
            setEditMode(false);
        }
    }
    return (
        <Row>

            <Col md={3}>
                <h2>User Profile</h2>
                <form onSubmit={submitHandler} style={{ maxWidth: '40rem', margin: '0 auto' }}>
                    {loading ? (
                        <p>Loading user information...</p>
                    ) : error ? (
                        <p>Error: {error}</p>
                    ) : userInfo ? (
                        <>
                            {!editMode ? (
                                <>
                                    <h1 className='text-center'>Hello {userInfo.username}</h1>
                                    <div className='mb-3'>
                                        <label htmlFor='exampleInputEmail1' className='form-label'>
                                            Email address
                                        </label>
                                        <input
                                            type='email'
                                            className='form-control'
                                            id='exampleInputEmail1'
                                            aria-describedby='emailHelp'
                                            value={userInfo.email}
                                            readOnly
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <label htmlFor='UserName' className='form-label'>
                                            Username
                                        </label>
                                        <input
                                            type='text'
                                            className='form-control'
                                            id='UserName'
                                            aria-describedby='username'
                                            value={userInfo.username}
                                            readOnly
                                        />
                                    </div>
                                    <div className="text-center mb-4">
                                        <button type="button" className="btn btn-dark" onClick={() => setEditMode(true)}>Edit</button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h1 className='text-center'>Hello {userInfo.username}</h1>
                                    <div className='mb-3'>
                                        <label htmlFor='exampleInputEmail1' className='form-label'>
                                            Email address
                                        </label>
                                        <input
                                            type='email'
                                            className='form-control'
                                            id='exampleInputEmail1'
                                            aria-describedby='emailHelp'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <label htmlFor='UserName' className='form-label'>
                                            Username
                                        </label>
                                        <input
                                            type='text'
                                            className='form-control'
                                            id='UserName'
                                            aria-describedby='username'
                                            value={username}
                                            onChange={(e) => setusername(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="text-center mb-4">
                                        <button type="submit" className="btn btn-dark">Update</button>
                                        <button type="button" className="btn btn-secondary ml-2" onClick={handleCancel}>Cancel</button>
                                    </div>
                                </>
                            )}
                        </>
                    ) : null}
                </form>
            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
            </Col>
        </Row>
    );

}

export default UserProfile;
