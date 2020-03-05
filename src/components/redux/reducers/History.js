
const initialState = {
    histories: [],
    detailHistory:[]
}

const Histories = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_HISTORY_PENDING':
            return {
                ...state
            }
        case 'GET_HISTORY_REJECTED':
            return {
                ...state
            }
        case 'GET_HISTORY_FULFILLED':
            return {
                ...state,
                histories: action.payload.data.result
            }
        case 'GET_DETAIL_HISTORY_PENDING':
            return {
                ...state
            }
        case 'GET_DETAIL_HISTORY_REJECTED':
            return {
                ...state
            }
        case 'GET_DETAIL_HISTORY_FULFILLED':
            return {
                ...state,
                detailHistory: action.payload.data.result
            }

        // case 'DELETE_USER_PENDING':
        //     return {
        //         ...state
        //     }

        // case 'DELETE_USER_REJECTED':
        //     return {
        //         ...state
        //     }
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

export default Histories