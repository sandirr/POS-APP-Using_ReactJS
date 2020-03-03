import { combineReducers } from 'redux'
import products from './Product'
import categories from './Categories'
import users from './Users'

export default combineReducers({
    products, categories, users
})