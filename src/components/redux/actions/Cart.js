import axios from "axios";

export const postCart = data => {
  return {
    type: "POST_CART",
    payload: { data }
  };
};

export const manipulateQuantity = data => {
  return {
    type: "MANIPULATE_QUANTITY",
    payload: { data }
  };
};

export const deleteFromCart = id => {
  return {
    type: "DELETE_FROM_CART",
    payload: { id }
  };
};

export const checkout = data => {
  return {
    type: "CHECKOUT",
    payload: axios({
      method: "POST",
      url: "http://localhost:8181/purchase",
      data: data
    })
  };
};
