import React, { Fragment, useContext, useEffect } from 'react'
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
        return 'Add item'
    }

    return (
        <Fragment>
            {
            items !== null && !loading
                ? items
                    .map(item => (
                        <div key={item._id}>
                            <Item item={item} />
                        </div>
                    )
                )
                : 'loading...'
            }
        </Fragment>
    )
}

export default Items
