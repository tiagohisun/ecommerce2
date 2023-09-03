// Function to handle debug logging
const debugLog = (message) => {
  if (process.env.DEBUG === 'true') {
    console.log(message);
  }
};

// 1. MConf - Importing required modules
debugLog("1. MConf - Importing required modules");
const multer = require('multer');
const path = require('path');

// 2. MConf - Defining storage configuration
debugLog("2. MConf - Defining storage configuration");
const storage = multer.diskStorage({
  destination(req, file, cb) {
    debugLog("2.1 MConf - Determining destination for uploaded file");
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    debugLog("2.2 MConf - Determining filename for uploaded file");
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

// 3. MConf - Defining file upload constraints
debugLog("3. MConf - Defining file upload constraints");
const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter(req, file, cb) {
    debugLog("3.1 MConf - Checking file type");
    const fileTypes = /jpeg|jpg|png/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);
    if (extName && mimeType) {
      debugLog("3.2 MConf - File type is valid");
      return cb(null, true);
    } else {
      debugLog("3.3 MConf - Invalid file type");
      cb('Error: Images Only!');
    }
  },
}).single('image');

// 4. MConf - Exporting multer upload middleware
debugLog("4. MConf - Exporting multer upload middleware");
module.exports = upload;
