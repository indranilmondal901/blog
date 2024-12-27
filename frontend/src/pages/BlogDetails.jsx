import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addComment, getBlogDetails, resetMessages } from "../store/Action/blogAction";

const BlogDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { blogData, blogSucessMessage, blogErrorMessage } = useSelector((state) => state.Blog);
  const { currentUser } = useSelector((state) => state.Auth);

  const [comment, setComment] = useState("");
  const [showAddCommentForm, setShowAddCommentForm] = useState(false);

  useEffect(() => {
    dispatch(getBlogDetails(id));
  }, [id]);

  const handleAddComment = () => {
    setShowAddCommentForm(true); // Show the Add Comment form
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    let obj = {
      blogId: id,
      authorId: currentUser._id,
      content: comment,
    };
    dispatch(addComment(obj));
  };

  useEffect(() => {
    if (blogSucessMessage) {
      setComment("");
      setShowAddCommentForm(false);
      dispatch(resetMessages());
    };
    if (blogErrorMessage) {
      window.alert(blogErrorMessage);
      dispatch(resetMessages());
    }
  }, [blogSucessMessage, blogErrorMessage]);

  if (!blogData) return <p>Post not found!</p>;

  return (
    <div className="blog-details-container">
      <h1 className="blog-title">{blogData.title}</h1>
      <p className="blog-content">{blogData.content}</p>

      <button className="add-comment-btn" onClick={handleAddComment}>Add Comment</button>
      {showAddCommentForm && (
        <form onSubmit={handleSubmitComment} className="comment-form">
          <textarea
            className="comment-textarea"
            placeholder="Write your comment..."
            value={comment}
            required
            onChange={(e) => setComment(e.target.value)}
          />
          <button type="submit" className="submit-comment-btn">Submit Comment</button>
        </form>
      )}

      <div className="comments-section">
        <h3 className="comments-title">
          Comments
          {blogData.comments ? ` (${blogData.comments.length})` : ` (0)`}
        </h3>
        <ul className="comments-list">
          {blogData.comments &&
            blogData.comments.map((comment) => (
              <li key={comment.id} className="comment-item">
                <p className="comment-content">
                  {comment.author.name || ""}: {comment.content}
                </p>
                <span className="comment-date">{comment.createdAt}</span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default BlogDetails;
