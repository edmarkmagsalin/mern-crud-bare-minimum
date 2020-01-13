import React, { Fragment, useContext, useEffect } from 'react'
import ItemFilter from '../items/ItemFilter'
import Items from '../items/Items'
import ItemForm from '../items/ItemForm'
import AuthContext from '../../context/auth/authContext'

const Item = () => {

    // provide functions and variables from AuthState
    const { loadUser } = useContext(AuthContext)

    useEffect(() => {
        loadUser()
        // eslint-disable-next-line
    }, [])

    return (
        <Fragment>
            <h1>Item/s</h1>
            <ItemFilter />
            <Items />
            <ItemForm />
        </Fragment>
    )
}

export default Item
