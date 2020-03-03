import axios from 'axios';

export const getProducts = () => {
    return {
        type: 'GET_PRODUCT',
        payload: axios({
            method: "GET",
            url: "http://localhost:8181/product"
        })
    }
}

export const postProduct = (data) => {
    return {
        type: 'POST_PRODUCT',
        payload: axios({
            method: "POST",
            url: "http://localhost:8181/product",
            data: data
        })
    }
}

export const patchProduct = (data, id) => {
    return {
        type: 'UPDATE_PRODUCT',
        payload: axios({
            method: "PATCH",
            url: "http://localhost:8181/product/" + id,
            data: data
        })
    }
}

export const deleteProduct = (id) => {
    return {
        type: 'DELETE_PRODUCT',
        payload: axios({
            method: "DELETE",
            url: "http://localhost:8181/product/" + id
        })
    }
}
