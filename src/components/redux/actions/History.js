import axios from "axios";

export const getHistory = () => {
  return {
    type: "GET_HISTORY",
    payload: axios({
      method: "GET",
      url: "http://localhost:8181/purchase"
    })
  };
};
export const getLastWeekHistory = () => {
  return {
    type: "GET_LAST_WEEK_HISTORY",
    payload: axios({
      method: "GET",
      url: "http://localhost:8181/lastweek"
    })
  };
};
export const getDetailHistory = id => {
  return {
    type: "GET_DETAIL_HISTORY",
    payload: axios({
      method: "GET",
      url: "http://localhost:8181/purchase/" + id
    })
  };
};
