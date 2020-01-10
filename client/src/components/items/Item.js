import React, { useContext, Fragment } from 'react'
import PropTypes from 'prop-types'
import ItemContext from '../../context/item/itemContext'


export const Item = ({ item }) => {
    const itemContext = useContext(ItemContext)

    const { deleteItem } = itemContext;

    const { _id, name } = item;

    const onDelete = () => {
        deleteItem(_id);
    }

    return (
        <Fragment>
            {name} <button onClick={onDelete}>Delete</button>
        </Fragment>
    )
}

Item.propTypes = {
    item: PropTypes.object.isRequired,
}

export default Item;