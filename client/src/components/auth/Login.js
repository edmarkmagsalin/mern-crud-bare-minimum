import React, { useState, useContext, useEffect, Fragment } from 'react'
import AuthContext from '../../context/auth/authContext'

const Login = props => {
    const authContext = useContext(AuthContext);
    
    const { login, error, clearErrors, isAuthenticated } = authContext;

    useEffect(() => {
        if(isAuthenticated) {
            // redirect
            props.history.push('/')
        }
        if(error) {
            alert(error)
            clearErrors()
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history])

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const { email, password } = user;

    const onChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const onSubmit = e => {
        e.preventDefault();
        if (email === '' || password === '') {
            alert('Please enter all fields')
        } else {
            login({
                email, password
            });
        }
    }

    const fbLogin = e => {
        e.preventDefault();
        console.log("fbLogin");
    }

    const googleLogin = e => {
        e.preventDefault();
        console.log("googleLogin");
    }

    return (
        <Fragment>
            <h1>Login</h1>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="email">Email Address</label> <input type="email" name="email" value={email} onChange={onChange} required />
                </div>
            
                <div>
                    <label htmlFor="password">Password</label> <input type="password" name="password" value={password} onChange={onChange} required minLength="6" />
                </div>
                <div>
                    <input type="submit" value="Log in" />
                </div>
                <div>
                    <button disabled onClick={fbLogin}>Log in with Facebook</button>
                </div>
                <div>
                    <button disabled onClick={googleLogin}>Log in with Google</button>
                </div>
            </form>
        </Fragment>
    )
}

export default Login
