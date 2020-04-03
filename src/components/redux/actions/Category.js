import axios from "axios";
const url = process.env.REACT_APP_URL;
export const getCategories = () => {
  return {
    type: "GET_CATEGORIES",
    payload: axios({
      method: "GET",
      url: url + "category",
      headers: {
        token: localStorage.getItem("token"),
        "user-id": localStorage.getItem("user-id")
      }
    })
  };
};

export const postCategory = data => {
  return {
    type: "POST_CATEGORY",
    payload: axios({
      method: "POST",
      url: url + "category",
      data: data,
      headers: {
        token: localStorage.getItem("token"),
        "user-id": localStorage.getItem("user-id")
      }
    })
  };
};

export const patchCategory = (data, id) => {
  return {
    type: "UPDATE_CATEGORY",
    payload: axios({
      method: "PATCH",
      url: url + "category/" + id,
      data: data,
      headers: {
        token: localStorage.getItem("token"),
        "user-id": localStorage.getItem("user-id")
      }
    })
  };
};

export const deleteCategory = id => {
  return {
    type: "DELETE_CATEGORY",
    payload: axios({
      method: "DELETE",
      url: url + "category/" + id,
      headers: {
        token: localStorage.getItem("token"),
        "user-id": localStorage.getItem("user-id")
      }
    })
  };
};
