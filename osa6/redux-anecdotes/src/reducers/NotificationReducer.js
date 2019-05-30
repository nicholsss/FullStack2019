const defaultMessage = "hello world!";

const notificationReducer = (state = defaultMessage, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.content;

    default:
      return state;
  }
};
export const setNotification = (content, time) => {
  console.log("anecdote info", content, time);
  return async dispatch => {
    await dispatch({
      type: "SET_NOTIFICATION",
      content
    });

    setTimeout(() => {
      dispatch({
        type: "SET_NOTIFICATION",
        content:null
      });
    }, time * 1000);
  };
};

export default notificationReducer;
