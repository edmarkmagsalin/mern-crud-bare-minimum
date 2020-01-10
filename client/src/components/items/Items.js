import React, { Fragment, useContext, useEffect } from 'react'
import ItemForm from './ItemForm'
import Item from './Item'
import ItemContext from '../../context/item/itemContext'

const Items = () => {
    const itemContext = useContext(ItemContext)

    const { items, readItems, loading } = itemContext

    useEffect(() => {
        readItems();
        // eslint-disable-next-line
    }, [])

    if(items !== null && items.length === 0 && !loading) {
        return <p>Add item</p>
    }

    return (
        <Fragment>
            <h1>Items</h1>
            {items !==null && !loading ? (
            {filtered !== null
            ? filtered.map(item => (<div key={item._id}>
                <ContactItem item={item} />
            </div>))
            : items.map(item => (<div key={item._id}>
                <ContactItem item={item} />
            </div>))})}
            <ItemForm />
        </Fragment>
    )
}

export default Items
