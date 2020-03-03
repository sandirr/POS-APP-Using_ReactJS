
const initialState = {
    products: []
}

const Product = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_PRODUCT_PENDING':
            return {
                ...state
            }
        case 'GET_PRODUCT_REJECTED':
            return {
                ...state
            }
        case 'GET_PRODUCT_FULFILLED':
            return {
                ...state,
                products: action.payload.data.result
            }

        case 'POST_PRODUCT_PENDING':
            return {
                ...state
            }

        case 'POST_PRODUCT_REJECTED':
            return {
                ...state
            }

        case 'POST_PRODUCT_FULFILLED':
            const newDataProducts = [...state.products, action.payload.data.result]
            return {
                ...state,
                products: newDataProducts
            }
        case 'DELETE_PRODUCT_PENDING':
            return {
                ...state
            }

        case 'DELETE_PRODUCT_REJECTED':
            return {
                ...state
            }
        case 'DELETE_PRODUCT_FULFILLED':
            const newProductAfterDelete =
                state.products.filter(product => product.id !== parseInt(action.payload.data.result))
            return {
                ...state,
                products: newProductAfterDelete
            }
        case 'UPDATE_PRODUCT_PENDING':
            return {
                ...state,
            }

        case 'UPDATE_PRODUCT_REJECTED':
            return {
                ...state,
            }

        case 'UPDATE_PRODUCT_FULFILLED':
            console.log(action.payload.data.result.id)
            const newProductAfterUpdate = state.products.map(product => {
                if (product.id === action.payload.data.result.id) {
                    return action.payload.data.result;
                }
                return product
            })
            return {
                ...state,
                products: newProductAfterUpdate
            }
        default:
            return state
    }
}

export default Product