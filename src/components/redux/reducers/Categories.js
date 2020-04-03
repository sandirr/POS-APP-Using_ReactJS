const initialState = {
  categories: []
};

const Category = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CATEGORIES_PENDING":
      return {
        ...state
      };
    case "GET_CATEGORIES_REJECTED":
      return {
        ...state
      };
    case "GET_CATEGORIES_FULFILLED":
      return {
        ...state,
        categories: action.payload.data.result
      };

    case "POST_CATEGORY_PENDING":
      return {
        ...state
      };

    case "POST_CATEGORY_REJECTED":
      return {
        ...state
      };

    case "POST_CATEGORY_FULFILLED":
      const newDataCategory = [...state.categories, action.payload.data.result];
      return {
        ...state,
        categories: newDataCategory
      };

    case "DELETE_CATEGORY_PENDING":
      return {
        ...state
      };

    case "DELETE_CATEGORY_REJECTED":
      return {
        ...state
      };
    case "DELETE_CATEGORY_FULFILLED":
      const newCategoryAfterDelete = state.categories.filter(
        category => category.id !== parseInt(action.payload.data.result)
      );
      return {
        ...state,
        categories: newCategoryAfterDelete
      };

    case "UPDATE_CATEGORY_PENDING":
      return {
        ...state
      };

    case "UPDATE_CATEGORY_REJECTED":
      return {
        ...state
      };

    case "UPDATE_CATEGORY_FULFILLED":
      const newCategoryAfterUpdate = state.categories.map(category => {
        if (category.id === action.payload.data.result.id) {
          return action.payload.data.result;
        }
        return category;
      });
      return {
        ...state,
        categories: newCategoryAfterUpdate
      };
    default:
      return state;
  }
};

export default Category;
