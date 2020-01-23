import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken'
import {
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from '../types'

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
        error: null
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    // Load User
    const loadUser = async () => {
        if (localStorage.token) {
            setAuthToken(localStorage.token)
        }

        try {
            const res = await axios.get('/api/auth')
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: AUTH_ERROR
            })
        }
    }

    // Register User
    const signup = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/auth/register', formData, config);
            dispatch({
                type: SIGNUP_SUCCESS,
                payload: res.data
            })

            loadUser()
        } catch (error) {
            dispatch({
                type: SIGNUP_FAIL,
                payload: error.response.data.msg
            })
        }
    }

    // Login User
    const login = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/auth', formData, config);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })

            loadUser()
        } catch (error) {
            dispatch({
                type: LOGIN_FAIL,
                payload: error.response.data.msg
            })
        }
    }

    // Logout
    const logout = () => {
        dispatch({
            type: LOGOUT
        })
    }

    // Clear Errors
    const clearErrors = () => {
        dispatch({
            type: CLEAR_ERRORS
        })
    }
    
    return (
        <AuthContext.Provider
        value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            user: state.user,
            error: state.error,
            signup,
            loadUser,
            login,
            logout,
            clearErrors
        }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}
export default AuthState;