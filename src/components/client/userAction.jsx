import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT
} from './userConst.jsx'
import axios from 'axios'

export const userLoginRequest = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('http://localhost:8000/user/login/', { 'email': email, 'password': password }, config)

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        })
        localStorage.setItem('userInfo', JSON.stringify(data))
        console.log(localStorage)
    } catch (error) {
        let errorMessage = 'An error occurred during login.';

        if (error.response && error.response.data) {
            // Check specific error conditions and update the error message accordingly
            if (error.response.data.non_field_errors) {
                errorMessage = 'Invalid email or password.';
            } else if (error.response.data.email) {
                errorMessage = error.response.data.email[0]; // Use the first error message for simplicity
            } else if (error.response.data.password) {
                errorMessage = error.response.data.password[0]; // Use the first error message for simplicity
            }
        }

        dispatch({
            type: USER_LOGIN_FAIL,
            payload: errorMessage
        });

    }
}
