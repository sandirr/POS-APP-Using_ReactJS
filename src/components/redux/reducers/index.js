import { combineReducers } from 'redux'
import products from './Product'
import categories from './Categories'

export default combineReducers({
    products, categories
})