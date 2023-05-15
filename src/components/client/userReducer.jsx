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

export const userLoginReducer = (state = {}, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true }
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }
        case USER_LOGOUT:
            return {}

        default:
            return state

    }
}


export const userRegisterReducer = (state = {}, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true }
        case USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload }
        case USER_LOGOUT:
            return {}

        default:
            return state

    }
}


const initialState = {
    userInfo: null,
    loading: false,
    error: null,
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case USER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                userInfo: action.payload,
            };
        case USER_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};