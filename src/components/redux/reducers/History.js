const initialState = {
  histories: [],
  detailHistory: [],
  lastWeekHistory: []
};

const Histories = (state = initialState, action) => {
  switch (action.type) {
    case "GET_HISTORY_PENDING":
      return {
        ...state
      };
    case "GET_HISTORY_REJECTED":
      return {
        ...state
      };
    case "GET_HISTORY_FULFILLED":
      return {
        ...state,
        histories: action.payload.data.result
      };
    case "GET_LAST_WEEK_HISTORY_PENDING":
      return {
        ...state
      };
    case "GET_LAST_WEEK_HISTORY_REJECTED":
      return {
        ...state
      };
    case "GET_LAST_WEEK_HISTORY_FULFILLED":
      return {
        ...state,
        lastWeekHistory: action.payload.data.result
      };
    case "GET_DETAIL_HISTORY_PENDING":
      return {
        ...state
      };
    case "GET_DETAIL_HISTORY_REJECTED":
      return {
        ...state
      };
    case "GET_DETAIL_HISTORY_FULFILLED":
      return {
        ...state,
        detailHistory: action.payload.data.result
      };

    default:
      return state;
  }
};

export default Histories;
