import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateUserInfo } from '../userAction';
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

    console.log(userInfo);
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

        if (!email || !username) {
            setInputError('Please fill in all the fields');
        } else {
            const updatedData = { email, username, password };
            try {
                dispatch(UpdateUserInfo(userInfo.user_id, updatedData, userInfo.access));
                const updatedUserInfo = { ...userInfo, ...updatedData };

                // Clear the existing user information from local storage
                localStorage.removeItem('userInfo');

                // Set the updated user information in local storage
                localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));

                // Update the Redux store with the new user information
                dispatch({ type: 'USER_DETAILS_SUCCESS', payload: updatedUserInfo });

                window.location.reload();
                setEditMode(false);
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <Row>

            <Col >

                <form onSubmit={submitHandler} className='form'>
                    {loading ? (
                        <p>Loading user information...</p>
                    ) : error ? (
                        <p>Error: {error}</p>
                    ) : userInfo ? (
                        <>
                            {!editMode ? (
                                <>

                                    <h1 className='text-left'> {userInfo.username}</h1>
                                    <div className='accountName'>Account Holder</div>
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
                                    <div className="text-left mb-4">
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
                                        <button type="button" className="btn btn-warning ml-2 cancel" onClick={handleCancel}> Cancel</button>
                                    </div>
                                </>
                            )}
                        </>
                    ) : null}

                </form>
            </Col>

        </Row>
    );

}

export default UserProfile;
