import axios from 'axios'

export const postCart = (data) => {
    return {
        type: 'POST_CART',
        payload: 
            {data}
    }
}

export const manipulateQuantity = (data) => {
    return {
        type: 'MANIPULATE_QUANTITY',
        payload: 
            {data}
    }
}

export const checkout = (data) => {
    return {
        type: 'CHECKOUT',
        payload: axios({
            method: "POST",
            url: "http://localhost:8181/purchase",
            data: data
        })
    }
}

// export const deleteCategory = (id) => {
//     return {
//         type: 'DELETE_CATEGORY',
//         payload: axios({
//             method: "DELETE",
//             url: "http://localhost:8181/category/" + id
//         })
//     }
// }
