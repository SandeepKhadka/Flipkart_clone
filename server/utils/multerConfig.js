import multer from "multer";
import path from "path";
import { mkdir } from "fs/promises"; // Import the specific function you need
import { fileURLToPath } from "url";

// Define the destination folder
export const __dirname = path.dirname(fileURLToPath(import.meta.url));

const uploadFolder = path.join(__dirname, "uploads");

// Ensure the destination folder exists; if not, create it
const ensureUploadFolder = async () => {
  try {
    await mkdir(uploadFolder, { recursive: true });
  } catch (error) {
    console.error("Error creating the upload folder:", error);
  }
};

// Call the function to ensure the upload folder exists
ensureUploadFolder();

// Set up Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Specify the destination folder where uploaded images will be stored
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    // Define the filename for the uploaded image
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); // You can use a timestamp as the filename
  },
});

// Export the Multer middleware
const upload = multer({ storage });

export { upload, uploadFolder }; // Export the 'upload' object for use in other modules
