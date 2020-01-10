import {
    CREATE_ITEM,
    READ_ITEMS,
    UPDATE_ITEM,
    DELETE_ITEM,
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
        case ITEM_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default: return state;
    }
}