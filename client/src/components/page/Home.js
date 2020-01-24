import React, { Fragment, useContext, useEffect } from 'react'
import AuthContext from '../../context/auth/authContext'

const Home = () => {

    // provide functions and variables from AuthState
    const { loadUser, isAuthenticated } = useContext(AuthContext)
    
    // check if the token exist then load that token's user data
    useEffect(() => {
        if(localStorage.token){
            //loadUser()
        }
        // eslint-disable-next-line
    }, [])

    return (
        <Fragment>
            <h1>Home</h1>
            {isAuthenticated && 'Authenticated'}
        </Fragment>
    )
}

export default Home
