import React, { Fragment, useContext, useEffect } from 'react'
import AuthContext from '../../context/auth/authContext'

const Profile = () => {

    const authContext = useContext(AuthContext)

    useEffect(() => {
        authContext.loadUser()
        // eslint-disable-next-line
    }, [])

    const { user, isAuthenticated } = authContext;
    return (
        <Fragment>
            <h1>Profile</h1>
            First name: {user && user.firstname} <br />
            Last name: {user && user.lastname} <br />
            Email address: {user && user.email} <br />
        </Fragment>
    )
}

export default Profile
