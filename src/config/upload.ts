import { resolve } from 'path';
import crypto from 'crypto';
import multer from 'multer';

const tmpFolder = resolve(__dirname, '..', '..', 'tmp');
const uploadsFolder = resolve(__dirname, '..', '..', 'tmp', 'uploads');

export default {
  tmpFolder: tmpFolder,
  uploadsFolder: uploadsFolder,
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename: function (req, file, callback) {
      // @ts-ignore
      const hash = crypto.randomBytes(10).toString('HEX');
      const name = `${hash}-${file.originalname}`;

      return callback(null, name);
    },
  }),
};
