import axios from 'axios';

export const getUsers = () => {
    return {
        type: 'GET_USERS',
        payload: axios({
            method: "GET",
            url: "http://localhost:8181/user"
        })
    }
}

// export const postCategory = (data) => {
//     return {
//         type: 'POST_CATEGORY',
//         payload: axios({
//             method: "POST",
//             url: "http://localhost:8181/category",
//             data: data
//         })
//     }
// }

// export const patchCategory = (data, id) => {
//     return {
//         type: 'UPDATE_CATEGORY',
//         payload: axios({
//             method: "PATCH",
//             url: "http://localhost:8181/category/" + id,
//             data: data
//         })
//     }
// }

export const deleteUser = (id) => {
    return {
        type: 'DELETE_USER',
        payload: axios({
            method: "DELETE",
            url: "http://localhost:8181/user/" + id
        })
    }
}
