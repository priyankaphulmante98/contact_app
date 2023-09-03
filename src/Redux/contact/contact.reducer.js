import {
  GET_CONTACTS_ERROR,
  GET_CONTACTS_LOADING,
  GET_CONTACTS_SUCCESS,
} from "./contact.types";

const initState = {
  contact_data: [],
  loading: false,
  error: false,
  flag: false,
};

export const contactreducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_CONTACTS_LOADING:
      return { ...state, loading: true };

    case GET_CONTACTS_SUCCESS:
      return {
        ...state,
        loading: false,
        contact_data: payload,
        flag: !state.flag,
      };

    case GET_CONTACTS_ERROR:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};
