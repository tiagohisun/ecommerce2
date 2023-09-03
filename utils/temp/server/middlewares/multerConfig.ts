const multer = require('@koa/multer');
const fs = require('fs');

exports.storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "C:/ecommerce2/server/Images/Products");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

exports.limits = {
  fileSize: 10 * 1024 * 1024, // 10 MB
  fieldSize: 2 * 1024 * 1024 // 2MB for fields
};

exports.blogStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = `C:/ecommerce2/server/Images/Blogs/${req.body.title}`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
