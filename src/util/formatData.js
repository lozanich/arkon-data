export const formatData = (value, action) => {
  switch (action) {
    case "minutes":
      value = parseInt(value, 10);
      const hours = Math.floor(value / 3600);
      value %= 3600;
      const minutes = Math.floor(value / 60);
      const seconds = value % 60;
      const result =
        String(hours).padStart(2, "0") +
        ":" +
        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0");
      return result;

    default:
      return value;
  }
};
