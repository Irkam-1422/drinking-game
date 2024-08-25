import { createStore } from "redux";

const initialState = {
  currentPlayers: [],
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "setCurrentPlayers":
      return {
        ...state,
        currentPlayers: [...state.currentPlayers, ...payload],
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
