export const taskReducer = (state = [], action) => {
  switch (action.type) {
    case "add":
      return [...state, action.payload];

    case "restart":
      state = [];
      return state;

    case "delete":
      return state.filter((item) => item.id !== action.payload.id);

    case "finished":
      return state.map((item) =>
        item.id === action.payload.id ? { ...item, done: !item.done } : item
      );
    default:
      return state;
  }
};
