import axios from 'axios';
import { SERVER_URL } from '../../config/config.js';
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
} from '../Types/blogTypes';


// Action to get all blogs
export const getAllBlogs = () => async (dispatch) => {
  try {
    const response = await axios.get(`${SERVER_URL}/blog/all-blogs`);
    dispatch({
      type: ALL_BLOG_GET_SUCESS,
      payload: {
        data: response.data.data,
      },
    });
  } catch (error) {
    dispatch({
      type: ALL_BLOG_GET_ERROR,
      payload: {
        errorMessage: error.response ? error.response.data.message : 'Error fetching blogs',
      },
    });
  }
};

// Action to get a single blog
export const getBlogDetails = (blogId) => async (dispatch) => {
  try {
    const response = await axios.post(`${SERVER_URL}/blog/get-blog-details`,{blogId});
    dispatch({
      type: BLOG_GET_SUCESS,
      payload: {
        data: response.data.blog,
      },
    });
  } catch (error) {
    dispatch({
      type: BLOG_GET_ERROR,
      payload: {
        errorMessage: error.response ? error.response.data.message : 'Error fetching blog',
      },
    });
  }
};

// Action to add a new blog
export const addBlog = (blogData) => async (dispatch) => {
  try {
    const response = await axios.post(`${SERVER_URL}/blog/add-blog`, blogData);
    dispatch({
      type: BLOG_ADD_SUCESS,
      payload: {
        data: response.data.blog,
      },
    });
  } catch (error) {
    dispatch({
      type: BLOG_ADD_ERROR,
      payload: {
        data: error.response ? error.response.data.message : 'Error adding blog',
      },
    });
  }
};

// Action to update an existing blog
export const updateBlog = (blogId, updatedData) => async (dispatch) => {
  try {
    const response = await axios.put(`${SERVER_URL}/blog/${blogId}`, updatedData);
    dispatch({
      type: BLOG_UPDATE_SUCESS,
      payload: {
        data: response.data.blog,
      },
    });
  } catch (error) {
    dispatch({
      type: BLOG_UPDATE_ERROR,
      payload: {
        errorMessage: error.response ? error.response.data.message : 'Error updating blog',
      },
    });
  }
};

// Action to delete a blog
export const deleteBlog = (blogId) => async (dispatch) => {
  try {
    const response = await axios.delete(`${SERVER_URL}/blog/${blogId}`);
    dispatch({
      type: BLOG_DELETE_SUCESS,
      payload: {
        data: { _id: blogId },
      },
    });
  } catch (error) {
    dispatch({
      type: BLOG_DELETE_ERROR,
      payload: {
        errorMessage: error.response ? error.response.data.message : 'Error deleting blog',
      },
    });
  }
};

//Add Comment
export const addComment = (data) => async (dispatch) => {
    try {
      const response = await axios.post(`${SERVER_URL}/blog/add-comment`,data);
  
      dispatch({
        type: ADD_COMMENT_SUCCESS,
        payload: {
          data: response.data.comment, // Assuming the comment is returned in the response
        },
      });
    } catch (error) {
      dispatch({
        type: ADD_COMMENT_ERROR,
        payload: {
          errorMessage: error.response
            ? error.response.data.message
            : 'Error adding comment',
        },
      });
    }
  };

// Action to reset success and error messages
export const resetMessages = () => (dispatch) => {
  dispatch({
    type: RESET_MESSAGES,
  });
};
