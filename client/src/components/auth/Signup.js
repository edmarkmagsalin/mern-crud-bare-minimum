import React, { useState, useContext, useEffect, Fragment } from 'react'
import AuthContext from '../../context/auth/authContext'

const Signup = props => {
    const authContext = useContext(AuthContext);
    
    const { signup, error, clearErrors, isAuthenticated } = authContext;

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
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        password2: ''
    });

    const { firstname, lastname, email, password, password2 } = user;

    const onChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const onSubmit = e => {
        e.preventDefault();
        if (firstname === '' || lastname === '' || email === '' || password === '') {
            alert('Please enter all fields')
        } else if (password !== password2){
            alert('Passwords do not match')
        } else {
            signup({
                firstname, lastname, email, password
            });
        }
    }

    return (
        <Fragment>
            <h1>Signup</h1>
            <form onSubmit={onSubmit}>
                <label htmlFor="firstname">First Name</label> <input type="text" name="firstname" value={firstname} onChange={onChange} required /><br />
                <label htmlFor="lastname">Last Name</label> <input type="text" name="lastname" value={lastname} onChange={onChange} required /><br />
            
                <label htmlFor="email">Email Address</label> <input type="email" name="email" value={email} onChange={onChange} required /><br />
            
                <label htmlFor="password">Password</label> <input type="password" name="password" value={password} onChange={onChange} required minLength="6" /><br />
            
                <label htmlFor="password2">Confirm Password</label> <input type="password" name="password2" value={password2} onChange={onChange} required minLength="6" /><br /><br />
                <input type="submit" value="Sign up" className="btn btn-primary btn-block" />
            </form>
        </Fragment>
    )
}

export default Signup
