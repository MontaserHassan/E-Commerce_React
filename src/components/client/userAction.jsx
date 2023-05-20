import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
} from './userConst.jsx'
import axios from 'axios'
import { API } from "../../backend.js";

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

        const { data } = await axios.post(`${API}/user/login/`, { 'email': email, 'password': password }, config)

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

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({
        type: USER_LOGOUT
    })
}


export const userRegisterRequest = (email, username, password, password_confirmation) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`${API}/user/register/`, { 'email': email, 'username': username, 'password': password, 'password_confirmation': password_confirmation }, config)

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data,
        })

    } catch (error) {
        let errorMessage = 'An error occurred during Register.';


        if (error.response && error.response.data) {

            if (error.response.data.non_field_errors) {
                errorMessage = 'Invalid email or password.';
            } else if (error.response.data.email) {
                errorMessage = error.response.data.email[0];
            } else if (error.response.data.password) {
                errorMessage = error.response.data.password[0];
            }
        }

        dispatch({
            type: USER_REGISTER_FAIL,
            payload: errorMessage
        });

    }
}
export const UpdateUserInfo = (userId, userData, token) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST,
        });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await axios.put(
            `http://localhost:8000/user/update/${userId}`,
            userData,
            config
        );

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.message,
        });
    }
};
