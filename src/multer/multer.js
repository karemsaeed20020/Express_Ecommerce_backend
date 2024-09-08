import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { AppError } from "../utils/AppError.js";
function refactorMulter(foldername) {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `uploads/${foldername}`);
    },
    filename: function (req, file, cb) {
      cb(null, uuidv4() + " - " + file.originalname);
    },
  });

  function fileFilter(req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      // Corrected to startsWith
      cb(null, true);
    } else {
      cb(new AppError("Images only", 401), false);
    }
  }

  const upload = multer({ storage, fileFilter });
  return upload;
}
export const uploadSingleFile = (fileName, foldername) => refactorMulter(foldername).single(fileName)
export const uploadMixOfFiles = (arrayOfFiles, foldername) => refactorMulter(foldername).fields(arrayOfFiles)

