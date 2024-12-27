const express = require("express");
const router = express.Router();

/* Controller */
const {
  GetAllBlogs,
  GetBlogDetails,
  AddBlog,
  DeleteBlog,
  AddComment,
  UpdateBlog
} = require("../Controller/BlogController.js");

/* test routes */
router.get("/", async (req, res) => {
  res.send("blog routes tested");
});

router.post("/add-blog", AddBlog);
router.get("/all-blogs",GetAllBlogs);
router.get("/get-blog-details/:blogId", GetBlogDetails);//details with comments
router.put("/update-blog", UpdateBlog);
router.delete("/delete-Blog/:blogId", DeleteBlog);
router.post("/add-comment", AddComment);


module.exports = router;
