import React, { useReducer } from 'react'
import axios from 'axios'
import ItemContext from './itemContext'
import ItemReducer from './itemReducer'
import {
    CREATE_ITEM,
    READ_ITEMS,
    UPDATE_ITEM,
    DELETE_ITEM,
    ITEM_ERROR
} from '../types'

const ItemState = props => {

    const initialState = {
        items: null,
        error: null
    }

    const [state, dispatch] = useReducer(ItemReducer, initialState);

    // Create Item
    const createItem = async item => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/items', item, config)
            dispatch({
                type: CREATE_ITEM,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: ITEM_ERROR,
                payload: error.response.msg
            })
        }
    }

    // Read Item
    const readItems = async () => {
        try {
            const res = await axios.get('/api/items')

            dispatch({
                type: READ_ITEMS,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: ITEM_ERROR,
                payload: error.response.msg
            })
        }
    }

    // Update Item
    const updateItem = async item => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.put(`/api/items/${item._id}`, item, config)
            dispatch({
                type: UPDATE_ITEM,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: ITEM_ERROR,
                payload: error.response.msg
            })
        }
    }

    // Delete Item
    const deleteItem = async _id => {

        try {
            await axios.delete(`/api/items/${_id}`)

            dispatch({
                type: DELETE_ITEM,
                payload: _id
            })
        } catch (error) {
            dispatch({
                type: ITEM_ERROR,
                payload: error.response.msg
            })
        } 
    }
    
    return (
        <ItemContext.Provider
        value={{
            items: state.items,
            error: state.error,
            createItem,
            readItems,
            updateItem,
            deleteItem
        }}
        >
            {props.children}
        </ItemContext.Provider>
    )
}
export default ItemState