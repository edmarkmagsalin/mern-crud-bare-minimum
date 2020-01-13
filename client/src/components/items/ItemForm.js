import React, { useState, useContext } from 'react'
import ItemContext from '../../context/item/itemContext'

const ItemForm = () => {
    const itemContext = useContext(ItemContext);

    const { createItem, } = itemContext;

    const [item, setItem] = useState({
        name: ''
    });

    const onChange = e => {
        setItem({...item, [e.target.name]: e.target.value})
    }

    const onSubmit = e => {
        e.preventDefault()
        createItem(item)
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div>
                    <input type="text" name="name" id="name" required onChange={onChange} /> <input type="submit" value="Add item"/>
                </div>
            </form>
        </div>
    )
}

export default ItemForm
