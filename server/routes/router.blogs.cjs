const Router = require('koa-router');
const multer = require('@koa/multer');
const { Blog } = require("../db.ts"); // Adjust the path to the correct location of db.ts
const { blogStorage, limits } = require('../middlewares/multerConfig.ts');
const fs = require('fs'); // Add this line back if you are using 'fs' elsewhere in your code
const path = require('path'); // Add this line back if you are using 'path' elsewhere in your code
const router = new Router();

const blogUpload = multer({ storage: blogStorage, limits });


router.get("/api/blogs", async (ctx) => {
  const blogs = await Blog.find();
  ctx.body = blogs;
});

router.post("/api/blogs", blogUpload.single("image"), async (ctx) => {
  let blogData;
  if (ctx.request.body.data) {
    blogData = JSON.parse(ctx.request.body.data);
  } else {
    blogData = ctx.request.body;
  }
  const image = ctx.request.files?.image; // Use 'files' instead of 'file'
  const imageUrl = image ? `${image.filename}` : ''; // Handle the case where the image is undefined
  const blog = await Blog.create({
    title: blogData.title,
    content: blogData.content,
    imageUrl: imageUrl,
    tags: blogData.tags,
  });
  ctx.status = 200;
  ctx.body = blog;
});


router.put("/api/blogs/:id", blogUpload.single("image"), async (ctx) => {
  const id = ctx.params.id;
  let blogData;
  if (ctx.request.body.data) {
    blogData = JSON.parse(ctx.request.body.data);
  } else {
    blogData = ctx.request.body;
  }
  const image = ctx.request.file;
  const updateObj = {
    title: blogData.title,
    content: blogData.content,
    tags: blogData.tags,
  };
  if (image) {
    const imageUrl = `${image.filename}`;
    updateObj["imageUrl"] = imageUrl;
    const dir = `C:/ecommerce2/server/Images/Blogs/${blogData.title}`;
    if (fs.existsSync(dir)) {
      fs.rmSync(dir, { recursive: true, force: true });
      fs.mkdirSync(dir, { recursive: true });
    }
  }
  const updatedBlog = await Blog.findByIdAndUpdate(id, updateObj, {
    new: true,
  });
  ctx.body = updatedBlog;
});

router.delete("/api/blogs/:id", async (ctx) => {
  const id = ctx.params.id;
  const blog = await Blog.findById(id);
  if (blog) {
    const dir = `C:/ecommerce2/server/Images/Blogs/${blog.title}`;
    if (fs.existsSync(dir)) {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  }
  await Blog.findByIdAndDelete(id);
  ctx.status = 200;
  ctx.body = "Blog Deleted";
});

module.exports = router;
