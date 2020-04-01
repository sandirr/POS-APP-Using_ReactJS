import axios from "axios";
const url = process.env.REACT_APP_URL;
export const getHistory = () => {
  return {
    type: "GET_HISTORY",
    payload: axios({
      method: "GET",
      url: url + "purchase"
    })
  };
};
export const getLastWeekHistory = () => {
  return {
    type: "GET_LAST_WEEK_HISTORY",
    payload: axios({
      method: "GET",
      url: url + "lastweek"
    })
  };
};
export const getDetailHistory = id => {
  return {
    type: "GET_DETAIL_HISTORY",
    payload: axios({
      method: "GET",
      url: url + "purchase/" + id
    })
  };
};
