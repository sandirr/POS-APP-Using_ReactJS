import axios from "axios";

const url = process.env.REACT_APP_URL;
export const getProducts = data => {
  const limit = data.limit || 8;
  const page = data.activePage || 1;
  const category = data.activeCategory || "";
  const name = data.searchName || "";
  const sort = data.sort || "ASC";
  const by = data.by || "id";
  const user = data.user || "admin";
  return {
    type: "GET_PRODUCT",
    payload: axios({
      method: "GET",
      url:
        url +
        `product/?limit=${limit}&page=${page}&category=${category}&name=${name}&sort=${sort}&by=${by}&user=${user}`,
      headers: {
        token: localStorage.getItem("token"),
        "user-id": localStorage.getItem("user-id")
      }
    })
  };
};

export const postProduct = data => {
  return {
    type: "POST_PRODUCT",
    payload: axios({
      method: "POST",
      url: url + "product",
      data: data,
      headers: {
        token: localStorage.getItem("token"),
        "user-id": localStorage.getItem("user-id")
      }
    })
  };
};

export const patchProduct = (data, id) => {
  return {
    type: "UPDATE_PRODUCT",
    payload: axios({
      method: "PATCH",
      url: url + "product/" + id,
      data: data,
      headers: {
        token: localStorage.getItem("token"),
        "user-id": localStorage.getItem("user-id")
      }
    })
  };
};

export const deleteProduct = id => {
  return {
    type: "DELETE_PRODUCT",
    payload: axios({
      method: "DELETE",
      url: url + "product/" + id,
      headers: {
        token: localStorage.getItem("token"),
        "user-id": localStorage.getItem("user-id")
      }
    })
  };
};
