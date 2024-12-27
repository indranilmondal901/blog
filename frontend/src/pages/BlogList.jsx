import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlogs, addBlog } from '../store/Action/blogAction';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.Auth);
  const { allBlogs } = useSelector((state) => state.Blog);

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    dispatch(getAllBlogs());
  }, [dispatch]);

  const handleFormToggle = () => {
    setShowForm(!showForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const blogData = {
      title,
      content,
      authorId: currentUser._id,
    };

    dispatch(addBlog(blogData));
    setShowForm(false);
    setTitle('');
    setContent('');
  };

  return (
    <div className="blog-container">
      <h1 className="blog-title">Blog Posts</h1>

      <button onClick={handleFormToggle} className="blog-toggle-button">
        {showForm ? 'Cancel' : 'Add New Blog'}
      </button>

      {showForm && (
        <div className="blog-form-container">
          <h2 className="form-title">Create New Blog</h2>
          <form onSubmit={handleSubmit} className="blog-form">
            <div className="form-group">
              <label className="form-label">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Content</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                className="form-textarea"
              ></textarea>
            </div>
            <button type="submit" className="form-submit-button">
              Create Blog
            </button>
          </form>
        </div>
      )}

      <ul className="blog-list">
        {allBlogs.map((blog) => (
          <li key={blog._id} className="blog-item">
            <h3 className="blog-item-title">{blog.title}</h3>
            <p className="blog-item-author">Author: {blog.author.name}</p>
            <Link to={`/blog/${blog._id}`} className="blog-read-more">
              Read More
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
