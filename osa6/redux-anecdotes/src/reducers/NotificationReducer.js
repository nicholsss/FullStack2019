const defaultMessage = "hello world!";

const notificationReducer = (state = defaultMessage, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.content;

    

    default:
      return state;
  }
};

export const notificationChange = content => {
  console.log("lol", content);
  return {
    type: "SET_NOTIFICATION",
    content
  };
};

export default notificationReducer;
