import { resolve } from 'path';
import crypto from 'crypto';
import multer from 'multer';

const tmpFolder = resolve(__dirname, '..', '..', 'tmp');

export default {
  directory: tmpFolder,
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
