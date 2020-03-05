import axios from 'axios';

export const getHistory = () => {
    return {
        type: 'GET_HISTORY',
        payload: axios({
            method: "GET",
            url: "http://localhost:8181/purchase"
        })
    }
}
export const getDetailHistory = (id) => {
    return {
        type: 'GET_DETAIL_HISTORY',
        payload: axios({
            method: "GET",
            url: "http://localhost:8181/purchase/" + id
        })
    }
}

// export const patchUser = (data, id) => {
//     return {
//         type: 'UPDATE_USER',
//         payload: axios({
//             method: "PATCH",
//             url: "http://localhost:8181/user/" + id,
//             data: data
//         })
//     }
// }

// export const deleteUser = (id) => {
//     return {
//         type: 'DELETE_USER',
//         payload: axios({
//             method: "DELETE",
//             url: "http://localhost:8181/user/" + id
//         })
//     }
// }
