import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlogs, addBlog, deleteBlog } from '../store/Action/blogAction'; // Assuming deleteBlog is implemented
import { Link } from 'react-router-dom';

const BlogList = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.Auth);
  const { allBlogs } = useSelector((state) => state.Blog);

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

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

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      dispatch(deleteBlog(id));
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleSortToggle = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const filteredBlogs = allBlogs
    .filter((blog) =>
      blog.title.toLowerCase().includes(searchTerm) || blog.content.toLowerCase().includes(searchTerm)
    )
    .sort((a, b) => {
      if (sortOrder === 'asc') return a.title.localeCompare(b.title);
      return b.title.localeCompare(a.title);
    });

  return (
    <div className="blog-container">
      <h1 className="blog-title">Blog Posts</h1>

      {/* Search and Sort Controls */}
      <div className="blog-controls">
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={handleSearch}
          className="blog-search"
        />
        <button onClick={handleSortToggle} className="blog-sort-button">
          Sort: {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
        </button>
      </div>

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
        {filteredBlogs.map((blog) => (
          <li key={blog._id} className="blog-item">
            <h3 className="blog-item-title">{blog.title}</h3>
            <p className="blog-item-author">Author: {blog.author.name}</p>
            <div className="blog-actions">
              <Link to={`/blog/${blog._id}`} className="blog-read-more">
                Read More
              </Link>
              {currentUser._id === blog.author._id && (
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="blog-delete-button"
                >
                  Delete
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;