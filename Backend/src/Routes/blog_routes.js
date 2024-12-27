const express = require("express");
const router = express.Router();

/* Controller */
const {
  GetAllBlogs,
  GetBlogDetails,
  AddBlog,
  DeleteBlog,
  AddComment
} = require("../Controller/BlogController.js");

/* test routes */
router.get("/", async (req, res) => {
  res.send("blog routes tested");
});

router.post("/add-blog", AddBlog);
router.get("/all-blogs",GetAllBlogs);
router.post("/get-blog-details", GetBlogDetails);//details with comments
router.delete("/delete-Blog/:blogId", DeleteBlog);
router.post("/add-comment", AddComment);


module.exports = router;
