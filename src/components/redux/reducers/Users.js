const initialState = {
  users: []
};

const Users = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USERS_PENDING":
      return {
        ...state
      };
    case "GET_USERS_REJECTED":
      return {
        ...state
      };
    case "GET_USERS_FULFILLED":
      return {
        ...state,
        users: action.payload.data.result
      };

    case "DELETE_USER_PENDING":
      return {
        ...state
      };

    case "DELETE_USER_REJECTED":
      return {
        ...state
      };
    case "DELETE_USER_FULFILLED":
      console.log(action.payload.data);
      const newUserAfterDelete = state.users.filter(
        user => user.id !== parseInt(action.payload.data.result)
      );
      return {
        ...state,
        users: newUserAfterDelete
      };

    case "UPDATE_USER_PENDING":
      return {
        ...state
      };

    case "UPDATE_USER_REJECTED":
      return {
        ...state
      };

    case "UPDATE_USER_FULFILLED":
      console.log(action.payload.data);
      const newUserAfterUpdate = state.users.map(user => {
        if (user.id === action.payload.data.result.id) {
          return action.payload.data.result;
        }
        return user;
      });
      return {
        ...state,
        users: newUserAfterUpdate
      };
    default:
      return state;
  }
};

export default Users;
