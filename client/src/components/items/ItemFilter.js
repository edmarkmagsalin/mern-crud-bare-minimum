import React, { useContext, useState } from 'react'
import ItemContext from '../../context/item/itemContext'

const ItemFilter = () => {

    const itemContext = useContext(ItemContext)

    const { filterItem } = itemContext

    const [item, setItem] = useState({
        query: ''
    })

    const onChange = e => {
        setItem({ ...item, [e.target.name]: e.target.value })
        filterItem();
    }
    return (
        <div>
            <form>
                <div>
                    <label htmlFor="search">Search: </label> <input type="text" name="search" id="search" onChange={onChange}/>
                </div>
            </form>
        </div>
    )
}

export default ItemFilter
