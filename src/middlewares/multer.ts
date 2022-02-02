import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './public/images');
  },
  filename: (req, file, callback) => {
    callback(null, `${Date.now().toString()}-${file.originalname}`);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
) => {
  const isAccepted = ['image/png', 'image/jpg', 'image/jpeg'].find(
    (acceptedFormat) => acceptedFormat === file.mimetype
  );

  if (isAccepted) {
    return callback(null, true);
  }
  return callback(null, false);
};

export const upload = multer({ storage, fileFilter });
