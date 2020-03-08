const initialState = {
  cart: [],
  totalPurchase: 0
};

const Cart = (state = initialState, action) => {
  switch (action.type) {
    case "POST_CART":
      const newItemtoCart = [...state.cart, action.payload.data];
      return {
        ...state,
        cart: newItemtoCart,
        totalPurchase: state.totalPurchase + 1
      };

    case "CHECKOUT_PENDING":
      return {
        ...state
      };
    case "CHECKOUT_REJECTED":
      return {
        ...state
      };
    case "CHECKOUT_FULFILLED":
      return {
        cart: [],
        totalPurchase: 0
      };

    case "MANIPULATE_QUANTITY":
      console.log(action);
      const newProductAfterUpdate = state.cart.map(product => {
        if (product.productId === action.payload.data.productId) {
          return action.payload.data;
        }
        return product;
      });
      return {
        ...state,
        cart: newProductAfterUpdate
      };

    case "DELETE_FROM_CART":
      const newProductAfterDelete = state.cart.filter(
        product => product.productId !== parseInt(action.payload.id)
      );
      return {
        ...state,
        cart: newProductAfterDelete,
        totalPurchase: state.totalPurchase - 1
      };

    default:
      return state;
  }
};

export default Cart;
