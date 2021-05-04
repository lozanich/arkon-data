export const taskReducer = (state = [], action) => {
  switch (action.type) {
    case "add":
      return [...state, action.payload];

    case "edit":
      const taskEdit = state.find((item) => item.id === action.payload.id);
      const index = state.indexOf(taskEdit);

      if (index !== -1) {
        state[index] = action.payload;
      }
      return state;

    case "restart":
      state = [];
      return state;

    case "delete":
      return state.filter((item) => item.id !== action.payload.id);

    case "finished":
      return state.map((item) =>
        item.id === action.payload.id ? { ...item, done: !item.done } : item
      );

    case "massive":
      return state = action.payload;
    default:
      return state;
  }
};
