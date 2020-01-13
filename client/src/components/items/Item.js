import React, { useContext, Fragment } from 'react'
import PropTypes from 'prop-types'
import ItemContext from '../../context/item/itemContext'


export const Item = ({ item }) => {

    const { deleteItem, setCurrent } = useContext(ItemContext)
    
    const { _id, name } = item

    const onDelete = () => {
        deleteItem(_id);
    }

    const onEdit = () => {
        setCurrent(item)
    }

    return (
        <Fragment>
           {name} <button onClick={onEdit}>Edit</button> <button onClick={onDelete}>Delete</button>
        </Fragment>
    )
}

Item.propTypes = {
    item: PropTypes.object.isRequired,
}

export default Item