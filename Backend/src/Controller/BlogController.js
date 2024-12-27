const BlogModel = require("../Models/blogSchema");
const CommentModel = require("../Models/commentSchema");
const { IsEmailExist } = require("../Helper_Functions/HelperFunction");

// Helper function to check if blog exists
const IsBlogExist = async (blogId) => {
  const blog = await BlogModel.findById(blogId);
  if (!blog) {
    return { status: false, message: "Blog not found" };
  }
  return { status: true, data: blog };
};

/* Add Blog */
const AddBlog = async (req, res, next) => {
  try {
    const { title, content, authorId } = req.body;

    // Check if author exists
    // const { status, data } = await IsEmailExist(author);
    // if (!status) {
    //   return res.status(400).send({
    //     message: "Author does not exist.",
    //   });
    // }

    // Create new blog
    const blog = new BlogModel({
      title,
      content,
      author: authorId,
    });

    await blog.save();
    let blogData = await BlogModel.findOne({_id: blog._id}).populate("author");
    return res.status(201).send({
      message: "Blog created successfully!",
      blog: blogData,
    });
  } catch (error) {
    req.error = error;
    next();
  }
};

/* Get All Blogs */
const GetAllBlogs = async (req, res, next) => {
  try {
    console.log("here--");
    const blogs = await BlogModel.find().populate("author");
    return res.status(200).send({
      message: "All blogs retrieved successfully.",
      data: blogs,
    });
  } catch (error) {
    req.error = error;
    next();
  }
};

/* Get Blog Details (with comments) */
const GetBlogDetails = async (req, res, next) => {
  try {
    const { blogId } = req.params;

    const blog = await BlogModel.findOne({ _id: blogId }).populate("author");
    console.log(blog);
    // Get blog details with comments
    const comments = await CommentModel.find({ blog: blogId }).populate(
      "author"
    );

    return res.status(200).send({
      message: "Blog details retrieved successfully.",
      blog: {
        title: blog.title,
        content: blog.content,
        author: blog.author,
        comments: comments,
      },
    });
  } catch (error) {
    req.error = error;
    next();
  }
};

/* Delete Blog */
const DeleteBlog = async (req, res, next) => {
  try {
    const { blogId } = req.params;
    // Check if blog exists
    const blog = await BlogModel.findOne({ _id: blogId });

    if(!blog){
      return res.status(404).send({
        message:"Blog not found"
      })
    }

    // Delete associated comments
    await CommentModel.deleteMany({ blog: blogId });

    // Delete the blog
    await BlogModel.findByIdAndDelete(blogId);

    return res.status(200).send({
      message: "Blog deleted successfully.",
    });
  } catch (error) {
    req.error = error;
    next();
  }
};

/* Update Blog */
const UpdateBlog = async (req, res, next) => {
  try {
    const { blogId, title, content } = req.body;

    // Check if blog exists
    const blog = await BlogModel.findOne({_id:blogId});

    if (!blog) {
      return res.status(404).send({message: "Blog not found"});
    }

    // Update blog details
    blog.title = title || blog.title;
    blog.content = content || blog.content;

    await blog.save();

    let blogData = await BlogModel.findOne({_id:blogId}).populate("author");
    return res.status(200).send({
      message: "Blog updated successfully.",
      blog: blogData,
    });
  } catch (error) {
    req.error = error;
    next();
  }
};

/* Add Comment to Blog */
const AddComment = async (req, res, next) => {
  try {
    const { blogId, authorId, content } = req.body;
    // Check if blog exists
    const blog = await BlogModel.findOne({_id:blogId});

    if (!blog) {
      return res.status(404).send({message: "Blog not found"});
    }

    // Create new comment
    const comment = new CommentModel({
      blog: blogId,
      author:authorId,
      content,
    });

    await comment.save();

    return res.status(201).send({
      message: "Comment added successfully.",
      comment: await CommentModel.findOne({_id:comment._id}).populate("author"),
    });
  } catch (error) {
    req.error = error;
    next();
  }
};

/* Get All Comments for a Blog */
const GetAllComments = async (req, res, next) => {
  try {
    const { blogId } = req.body;

    // Check if blog exists
    const { status, message } = await IsBlogExist(blogId);
    if (!status) {
      return res.status(404).send({
        message: message,
      });
    }

    // Get all comments for a specific blog
    const comments = await CommentModel.find({ blog: blogId }).populate(
      "author",
      "name email"
    );

    return res.status(200).send({
      message: "All comments retrieved successfully.",
      comments,
    });
  } catch (error) {
    req.error = error;
    next();
  }
};

module.exports = {
  AddBlog,
  GetAllBlogs,
  GetBlogDetails,
  DeleteBlog,
  UpdateBlog,
  AddComment,
  GetAllComments,
};
