import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const authLink = (
        <Fragment>
            <li><Link to='/profile'>Profile</Link></li>
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
                {guestLink}
                {authLink}
            </ul>
        </Fragment>
    )
}

export default Navbar
