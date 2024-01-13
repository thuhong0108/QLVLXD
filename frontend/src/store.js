import { createStore } from 'redux';

const initialState = {
  userLogged: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, userLogged: action.payload };
    default:
      return state;
  }
};

const store = createStore(rootReducer);

export default store;
