import React, { useContext, useEffect } from 'react'
import AuthContext from '../../context/auth/authContext'

const Home = () => {

    const authContext = useContext(AuthContext)

    const { loadUser, isAuthenticated } = authContext
    
    useEffect(() => {
        if(localStorage.token){
            loadUser()
        }
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <h1>Home</h1>
            {isAuthenticated && 'Authenticated'}
        </div>
    )
}

export default Home
