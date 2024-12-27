import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllBlogs,
  addBlog,
  deleteBlog,
  updateBlog,
} from "../store/Action/blogAction";
import { Link } from "react-router-dom";

const BlogList = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.Auth);
  const { allBlogs } = useSelector((state) => state.Blog);

  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [editBlogId, setEditBlogId] = useState(null);

  useEffect(() => {
    dispatch(getAllBlogs());
  }, [dispatch]);

  const handleFormToggle = () => {
    setShowForm(!showForm);
    setEditMode(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const blogData = {
      blogId: editBlogId,
      title,
      content,
      authorId: currentUser._id,
    };

    if (editMode) {
      dispatch(updateBlog(blogData));
    } else {
      dispatch(addBlog(blogData));
    }

    setShowForm(false);
    setTitle("");
    setContent("");
    setEditMode(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      dispatch(deleteBlog(id));
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleSortToggle = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleEdit = (blog) => {
    setEditMode(true);
    setEditBlogId(blog._id);
    setTitle(blog.title);
    setContent(blog.content);
    setShowForm(true);
  };

  const filteredBlogs = allBlogs
    .filter(
      (blog) =>
        blog.title.toLowerCase().includes(searchTerm) ||
        blog.content.toLowerCase().includes(searchTerm)
    )
    .sort((a, b) => {
      if (sortOrder === "asc") return a.title.localeCompare(b.title);
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
          Sort: {sortOrder === "asc" ? "Ascending" : "Descending"}
        </button>
      </div>

      {/* Add/Edit Blog Button */}
      <button onClick={handleFormToggle} className="blog-toggle-button">
        {showForm ? "Cancel" : "Add New Blog"}
      </button>

      {/* Blog Creation/Editing Form */}
      {showForm && (
        <div className="blog-form-container">
          <h2 className="form-title">
            {editMode ? "Edit Blog" : "Create New Blog"}
          </h2>
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
              {editMode ? "Update Blog" : "Create Blog"}
            </button>
          </form>
        </div>
      )}

      {/* Blog List */}
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
                <div>
                  <button
                    onClick={() => handleEdit(blog)}
                    className="blog-edit-button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="blog-delete-button"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
