import axios from "axios";
const url = process.env.REACT_APP_URL;
export const getUsers = () => {
  return {
    type: "GET_USERS",
    payload: axios({
      method: "GET",
      url: url + "user",
      headers: {
        token: localStorage.getItem("token"),
        "user-id": localStorage.getItem("user-id")
      }
    })
  };
};

export const patchUser = (data, id) => {
  return {
    type: "UPDATE_USER",
    payload: axios({
      method: "PATCH",
      url: url + "user/" + id,
      data: data,
      headers: {
        token: localStorage.getItem("token"),
        "user-id": localStorage.getItem("user-id")
      }
    })
  };
};

export const deleteUser = id => {
  return {
    type: "DELETE_USER",
    payload: axios({
      method: "DELETE",
      url: url + "user/" + id,
      headers: {
        token: localStorage.getItem("token"),
        "user-id": localStorage.getItem("user-id")
      }
    })
  };
};
