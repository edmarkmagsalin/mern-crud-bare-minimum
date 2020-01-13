import React, { useState, useContext, useEffect } from 'react'
import ItemContext from '../../context/item/itemContext'

const ItemForm = () => {
    const itemContext = useContext(ItemContext);

    const { createItem, updateItem, current, clearCurrent } = itemContext

    useEffect(() => {
        if(current !== null) {
            setItem(current)
        } else {
            setItem({
                name: ''
            })
        }
    }, [current])

    const [item, setItem] = useState({
        name: ''
    });

    const { name } = item

    const onChange = e => {
        setItem({...item, [e.target.name]: e.target.value})
    }

    const onSubmit = e => {
        e.preventDefault()
        if(current === null) {
            createItem(item)
        } else {
            updateItem(item)
        }
        clearAll()
    }

    const clearAll = () => {
        clearCurrent()
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div>
                    <input type="text" name="name" id="name" required onChange={onChange} value={name}/> <input type="submit" value={current ? 'Update' : 'Add'}/> {current && (<button onClick={clearAll}>cancel</button>)}
                </div>
            </form>
        </div>
    )
}

export default ItemForm
