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