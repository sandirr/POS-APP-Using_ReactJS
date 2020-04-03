import axios from "axios";
const url = process.env.REACT_APP_URL;
export const getHistory = () => {
  return {
    type: "GET_HISTORY",
    payload: axios({
      method: "GET",
      url: url + "purchase",
      headers: {
        token: localStorage.getItem("token"),
        "user-id": localStorage.getItem("user-id")
      }
    })
  };
};
export const getLastWeekHistory = () => {
  return {
    type: "GET_LAST_WEEK_HISTORY",
    payload: axios({
      method: "GET",
      url: url + "lastweek",
      headers: {
        token: localStorage.getItem("token"),
        "user-id": localStorage.getItem("user-id")
      }
    })
  };
};
export const getDetailHistory = id => {
  return {
    type: "GET_DETAIL_HISTORY",
    payload: axios({
      method: "GET",
      url: url + "purchase/" + id,
      headers: {
        token: localStorage.getItem("token"),
        "user-id": localStorage.getItem("user-id")
      }
    })
  };
};
export const resetHistory = () => {
  return {
    type: "RESET_HISTORY"
  };
};
