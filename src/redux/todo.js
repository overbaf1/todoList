import { createStore } from "redux";

const initialState = {
  list: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "addTask":
      return { ...state, list: [...state.list, action.payload] };

    case "deleteTask":
      return {
        ...state,
        list: state.list.filter((task, index) => action.payload !== index),
      };

    case "patchTask":
      return {
        ...state,
        list: state.list.map((item, index) => {
          if (index === action.payload) {
            item.favorite = !item.favorite;
          }
          return item;
        }),
      };

    default:
      return state;
  }
};

export const store = createStore(reducer);
