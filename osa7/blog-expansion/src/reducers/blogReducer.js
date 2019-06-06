import blogService from "../services/blogs";

const byLikes = (b1, b2) => b2.likes - b1.likes;

const reducer = (state = [], action) => {
  if (action.type === "LIKE") {
    return state
      .map(a => (a.id !== action.data.id ? a : action.data))
      .sort(byLikes);
  } else if (action.type === "ADD") {
    return state.concat(action.data).sort(byLikes);
  } else if (action.type === "INITIALIZE") {
    return action.data.sort(byLikes);
  }else if(action.type === "REMOVE"){
    
    return state.filter(

      a => a.id !== action.data.id)
  }

  return state;
};


export const removeBlog = (blog) => {
  
  return async dispatch => {

   
    await blogService.remove(blog)
   
    dispatch({
      data : blog,
      type:"REMOVE"
    })
      
  }
}
export const createBlog = (title, author, url) => {
  return async dispatch => {
    const blog = {
      title,
      author,
      url,
      likes: 0
    };
    const newBlog = await blogService.create(blog);
    dispatch({
      data: newBlog,
      type: "ADD"
    });
  };
};

export const initializeBlogs = () => {
  return async dispatch => {
    const data = await blogService.getAll();
    dispatch({
      data,
      type: "INITIALIZE"
    });
  };
};

export const likeBlog = blog => {
  console.log("click", blog.user.username)
  return async dispatch => {
    console.log("click", blog.user.username)
    const liked = { ...blog, likes: blog.likes + 1 };
    const data = await blogService.update(liked);
    dispatch({
      data,
      type: "LIKE"
    });
  };
};

export default reducer;
