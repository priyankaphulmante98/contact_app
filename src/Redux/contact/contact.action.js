import {
  GET_CONTACTS_ERROR,
  GET_CONTACTS_LOADING,
  GET_CONTACTS_SUCCESS,
} from "./contact.types";

export const getContacts = () => (dispatch) => {
  dispatch({ type: GET_CONTACTS_LOADING });
  try {
    fetch(`https://json-mock-ne19.onrender.com/products`)
      .then((res) => res.json())
      .then((res) => {
        let arr = res.map((e) =>
          !e.quantity ? { ...e, quantity: 1, added: false } : e
        );
        dispatch({ type: GET_CONTACTS_SUCCESS, payload: arr });
        return arr;
      });
  } catch (error) {
    dispatch({ type: GET_CONTACTS_ERROR });
  }
};

export const ChangeQuanity = (data, id, val) => (dispatch) => {
  dispatch({ type: GET_CONTACTS_LOADING });
  try {
    let arr = data?.map((e) => (e.id === id ? { ...e, quantity: val } : e));
    dispatch({ type: GET_CONTACTS_SUCCESS, payload: arr });
  } catch (error) {
    dispatch({ type: GET_CONTACTS_ERROR });
  }
};
export const AddtoCart = (data, id) => (dispatch) => {
  dispatch({ type: GET_CONTACTS_LOADING });
  try {
    let arr = data?.map((e) => (e.id == id ? { ...e, added: true } : e));
    dispatch({ type: GET_CONTACTS_SUCCESS, payload: arr });
  } catch (error) {
    dispatch({ type: GET_CONTACTS_ERROR });
  }
};
