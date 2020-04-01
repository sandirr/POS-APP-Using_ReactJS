import axios from "axios";
const url = process.env.REACT_APP_URL;
export const getCategories = () => {
  return {
    type: "GET_CATEGORIES",
    payload: axios({
      method: "GET",
      url: url + "category"
    })
  };
};

export const postCategory = data => {
  return {
    type: "POST_CATEGORY",
    payload: axios({
      method: "POST",
      url: url + "category",
      data: data
    })
  };
};

export const patchCategory = (data, id) => {
  return {
    type: "UPDATE_CATEGORY",
    payload: axios({
      method: "PATCH",
      url: url + "category/" + id,
      data: data
    })
  };
};

export const deleteCategory = id => {
  return {
    type: "DELETE_CATEGORY",
    payload: axios({
      method: "DELETE",
      url: "http://localhost:8181/category/" + id
    })
  };
};
