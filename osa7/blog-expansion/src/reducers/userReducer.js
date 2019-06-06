import loginService from "../services/login";
import blogService from "../services/blogs";

const reducer = (state = null, action) => {
  
  switch (action.type) {
    case "LOGIN":
      return action.data;
    case "LOGOUT":
      return action.data;
    case "SET_USER":
      return action.data;
    default:
      return state;
  }
};

export const loginUser = (username, password) => {
  
  return async dispatch => {
    
      const data = await loginService.login(username, password);

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(data));
      blogService.setToken(data.token);

      dispatch({
        data,
        type: "LOGIN"
      });
    } 
  };


export const logout = () => {
  return async dispatch => {
    blogService.destroyToken();
    window.localStorage.removeItem("loggedBlogAppUser");
    dispatch({
      data: null,
      type: "LOGOUT"
    });
  };
};

export const setUser = user => {
  return async dispatch => {
    dispatch({
      data: user,
      type: "SET_USER"
    });
  };
};

export default reducer;
