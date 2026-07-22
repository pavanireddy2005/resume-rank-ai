import multer from "multer";
import path from "path";
import fs from "fs";

// Upload directory
const uploadPath = path.join(process.cwd(), "uploads");

// Create uploads folder if it doesn't exist
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);

    // Remove spaces and special characters from filename
    const fileName = path
      .basename(file.originalname, extension)
      .replace(/[^a-zA-Z0-9]/g, "_");

    const uniqueName = `${Date.now()}-${fileName}${extension}`;

    cb(null, uniqueName);
  },
});

// File validation
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/octet-stream",
  ];

  const allowedExtensions = [".pdf", ".doc", ".docx"];

  const extension = path.extname(file.originalname).toLowerCase();

  if (
    allowedMimeTypes.includes(file.mimetype) &&
    allowedExtensions.includes(extension)
  ) {
    return cb(null, true);
  }

  cb(
    new Error(
      "Only PDF, DOC, and DOCX files are allowed."
    ),
    false
  );
};

// Multer configuration
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});

export default upload;