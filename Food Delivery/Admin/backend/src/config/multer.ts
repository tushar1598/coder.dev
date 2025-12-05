import multer, { FileFilterCallback } from "multer";
import path from "path";
import fs from "fs";
import { Request } from "express";

interface UploadConfig {
  folder: string; // module name: 'restaurants', 'foods', 'users'
}

// 🔥 Dynamic Storage
const getStorage = (folder: string) =>
  multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadPath = path.join("uploads", folder);

      // Folder auto-create
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }

      cb(null, uploadPath);
    },

    filename: function (req, file, cb) {
      const ext = file.originalname.split(".").pop();
      cb(
        null,
        `${Date.now()}-${Math.random().toString(36).substring(2)}.${ext}`
      );
    },
  });

// 🔥 File filter (only images allowed)
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files allowed"));
  }
};

// 🔥 Main reusable upload function
export const createUploader = (config: UploadConfig) =>
  multer({
    storage: getStorage(config.folder),
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
  });
