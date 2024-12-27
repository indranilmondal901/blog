/* import types */
import {
  ALL_BLOG_GET_SUCESS,
  ALL_BLOG_GET_ERROR,
  BLOG_GET_SUCESS,
  BLOG_GET_ERROR,
  BLOG_ADD_SUCESS,
  BLOG_ADD_ERROR,
  BLOG_UPDATE_SUCESS,
  BLOG_UPDATE_ERROR,
  BLOG_DELETE_SUCESS,
  BLOG_DELETE_ERROR,
  RESET_MESSAGES,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_ERROR,
} from "../Types/blogTypes";

const initialState = {
  allBlogs: [], // Stores the list of all blogs
  blogData: {}, // Stores the details of a single blog
  blogSucessMessage: null, // Stores success messages for CRUD operations
  blogErrorMessage: null, // Stores error messages for CRUD operations
};

export const BlogReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    // Get all blogs
    case ALL_BLOG_GET_SUCESS:
      return {
        ...state,
        allBlogs: payload.data,
        blogErrorMessage: null,
      };

    case ALL_BLOG_GET_ERROR:
      return {
        ...state,
        blogErrorMessage: payload.errorMessage,
      };

    // Get a single blog
    case BLOG_GET_SUCESS:
      return {
        ...state,
        blogData: payload.data,
        blogErrorMessage: null,
      };

    case BLOG_GET_ERROR:
      return {
        ...state,
        blogErrorMessage: payload.errorMessage,
      };

    // Add a new blog
    case BLOG_ADD_SUCESS:
      return {
        ...state,
        allBlogs: [...state.allBlogs, payload.data],
        blogSucessMessage: "Blog added successfully!",
        blogErrorMessage: null,
      };

    case BLOG_ADD_ERROR:
      return {
        ...state,
        blogErrorMessage: payload.data,
      };

    // Update an existing blog
    case BLOG_UPDATE_SUCESS:
      return {
        ...state,
        allBlogs: state.allBlogs.map((blog) =>
          blog._id === payload.data._id ? payload.data : blog
        ),
        blogSucessMessage: "Blog updated successfully!",
        blogErrorMessage: null,
      };

    case BLOG_UPDATE_ERROR:
      return {
        ...state,
        blogErrorMessage: payload.errorMessage,
      };

    // Delete a blog
    case BLOG_DELETE_SUCESS:
      return {
        ...state,
        allBlogs: state.allBlogs.filter(
          (blog) => blog._id !== payload.data._id
        ),
        blogSucessMessage: "Blog deleted successfully!",
        blogErrorMessage: null,
      };

    case BLOG_DELETE_ERROR:
      return {
        ...state,
        blogErrorMessage: payload.errorMessage,
      };

    // Handle adding comment success
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        blogSucessMessage: "Comment added successfully",
        blogData: {
          ...state.blogData,
          comments: [...state.blogData.comments, action.payload.data],
        },
      };

    // Handle adding comment error
    case ADD_COMMENT_ERROR:
      return {
        ...state,
        blogErrorMessage: action.payload.errorMessage,
      };

    case RESET_MESSAGES:
      return {
        ...state,
        blogSucessMessage: null,
        blogErrorMessage: null,
      };

    default:
      return state;
  }
};
