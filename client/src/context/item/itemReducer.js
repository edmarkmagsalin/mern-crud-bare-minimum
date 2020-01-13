import {
    CREATE_ITEM,
    READ_ITEMS,
    UPDATE_ITEM,
    DELETE_ITEM,
    SET_CURRENT,
    CLEAR_CURRENT,
    SET_FILTER,
    CLEAR_FILTER,
    ITEM_ERROR
} from '../types'

export default (state, action) => {
    switch(action.type) {
        case CREATE_ITEM:
            return {
                ...state,
                items: [action.payload, ...state.items],
                loading: false
            }
        case READ_ITEMS:
            return {
                ...state,
                items: action.payload,
                loading: false
            }
        case UPDATE_ITEM:
            return {
                ...state,
                items: state.items.map(item => item._id === action.payload._id ? action.payload : item),
                loading: false
            }
        case DELETE_ITEM:
            return {
                ...state,
                items: state.items.filter(item => item._id !== action.payload),
                loading: false
            }
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            }
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            }
        case SET_FILTER:
            return {
                ...state,
                filtered: state.items.filter(item => {
                    const regex = new RegExp(`${action.payload}`, 'gi')
                    return item.name.match(regex)
                })
            }
        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null
            }
        case ITEM_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default: return state;
    }
}