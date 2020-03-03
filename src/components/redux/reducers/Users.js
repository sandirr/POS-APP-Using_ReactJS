
const initialState = {
    users: []
}

const Users = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_USERS_PENDING':
            return {
                ...state
            }
        case 'GET_USERS_REJECTED':
            return {
                ...state
            }
        case 'GET_USERS_FULFILLED':
            return {
                ...state,
                users: action.payload.data.result
            }

        // case 'POST_CATEGORY_PENDING':
        //     return {
        //         ...state
        //     }

        // case 'POST_CATEGORY_REJECTED':
        //     return {
        //         ...state
        //     }

        // case 'POST_CATEGORY_FULFILLED':

        //     const newDataCategory = [...state.categories, action.payload.data.result]
        //     return {
        //         ...state,
        //         categories: newDataCategory
        //     }

        case 'DELETE_USER_PENDING':
            return {
                ...state
            }

        case 'DELETE_USER_REJECTED':
            return {
                ...state
            }
        case 'DELETE_USER_FULFILLED':
            console.log(action.payload.data)
            const newUserAfterDelete =
                state.users.filter(user => user.id !== parseInt(action.payload.data.result))
            return {
                ...state,
                users: newUserAfterDelete
            }

        // case 'UPDATE_CATEGORY_PENDING':
        //     return {
        //         ...state,
        //     }

        // case 'UPDATE_CATEGORY_REJECTED':
        //     return {
        //         ...state,
        //     }

        // case 'UPDATE_CATEGORY_FULFILLED':
        //     console.log(action.payload.data)
        //     const newCategoryAfterUpdate = state.categories.map(category => {
        //         if (category.id === action.payload.data.result.id) {
        //             return action.payload.data.result
        //         }
        //         return category
        //     })
        //     return {
        //         ...state,
        //         categories: newCategoryAfterUpdate
        //     }
        default:
            return state
    }
}

export default Users