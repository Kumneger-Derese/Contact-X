import multer from 'multer';
import fs from 'node:fs';

if (!fs.existsSync('./upload')) {
  fs.mkdirSync('./upload');
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './upload');
  },

  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });
export default upload;
