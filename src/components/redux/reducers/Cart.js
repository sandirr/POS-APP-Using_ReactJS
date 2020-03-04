
const initialState = {
    cart: [],
    totalPurchase: 0
}

const Cart = (state = initialState, action) => {
    switch (action.type) {
        case 'POST_CART':
            const newDataCart = [...state.cart, action.payload.data]
            return {
                ...state,
                cart: newDataCart,
                totalPurchase: state.totalPurchase + 1
            }
            
        case 'CHECKOUT_PENDING':
            return {
                ...state
            }
        case 'CHECKOUT_REJECTED':
            return {
                ...state
            }
        case 'CHECKOUT_FULFILLED':
            return {
                cart: [],
                totalPurchase: 0
            }

        case 'MANIPULATE_QUANTITY':
            console.log(action)
            const newProductAfterUpdate = state.cart.map(product => {
                if (product.productId === action.payload.data.productId) {
                    return action.payload.data
                }
                return product
            })
            return {
                ...state,
                cart: newProductAfterUpdate
            }

        // case 'DELETE_USER_FULFILLED':
        //     console.log(action.payload.data)
        //     const newUserAfterDelete =
        //         state.users.filter(user => user.id !== parseInt(action.payload.data.result))
        //     return {
        //         ...state,
        //         users: newUserAfterDelete
        //     }

        // case 'UPDATE_USER_PENDING':
        //     return {
        //         ...state,
        //     }

        // case 'UPDATE_USER_REJECTED':
        //     return {
        //         ...state,
        //     }

        // case 'UPDATE_USER_FULFILLED':
        //     console.log(action.payload.data)
        //     const newUserAfterUpdate = state.users.map(user => {
        //         if (user.id === action.payload.data.result.id) {
        //             return action.payload.data.result
        //         }
        //         return user
        //     })
        //     return {
        //         ...state,
        //         users: newUserAfterUpdate
        //     }
        default:
            return state
    }
}

export default Cart