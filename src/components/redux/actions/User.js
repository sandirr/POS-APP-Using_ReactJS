import axios from "axios";

export const getUsers = () => {
  return {
    type: "GET_USERS",
    payload: axios({
      method: "GET",
      url: "http://localhost:8181/user"
    })
  };
};

export const patchUser = (data, id) => {
  return {
    type: "UPDATE_USER",
    payload: axios({
      method: "PATCH",
      url: "http://localhost:8181/user/" + id,
      data: data
    })
  };
};

export const deleteUser = id => {
  return {
    type: "DELETE_USER",
    payload: axios({
      method: "DELETE",
      url: "http://localhost:8181/user/" + id
    })
  };
};
