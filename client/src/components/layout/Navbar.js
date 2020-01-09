import React, { Fragment, useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/auth/authContext'

const Navbar = () => {

    const authContext = useContext(AuthContext)

    const { user, isAuthenticated, logout } = authContext;

    const onLogout = () => {
        logout()
    }

    const authLink = (
        <Fragment>
            <li><Link to='/profile'>Profile</Link></li>
            <li>Hi {user && user.firstname + '!'} | <a onClick={onLogout} href="#!">Logout</a></li>
        </Fragment>
    )
    const guestLink = (
        <Fragment>
            <li><Link to='/signup'>Signup</Link></li>
            <li><Link to='/login'>Login</Link></li>
        </Fragment>
    )
    return (
        <Fragment>
            <ul>
                <li><Link to='/'>Home</Link></li>

                {isAuthenticated ? authLink : guestLink}
            </ul>
        </Fragment>
    )
}

export default Navbar
