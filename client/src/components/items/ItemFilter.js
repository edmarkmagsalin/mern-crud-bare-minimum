import React, { useContext, useEffect, useRef } from 'react'
import ItemContext from '../../context/item/itemContext'

const ItemFilter = () => {

    const itemContext = useContext(ItemContext)

    const text = useRef(null)

    const { setFilter, clearFilter, filtered } = itemContext

    useEffect(() => {
        if (filtered === null) {
            text.current.value = ''
        }
    })

    const onChange = e => {
        if(text.current.value !== ''){
            setFilter(e.target.value)
        } else {
            clearFilter()
        }
    }
    return (
        <div>
            <form>
                <div>
                    <label htmlFor="search">Search: </label> <input type="text" ref={text} onChange={onChange}/>
                </div>
            </form>
        </div>
    )
}

export default ItemFilter
