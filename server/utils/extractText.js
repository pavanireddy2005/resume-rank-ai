import fs from "fs/promises";
import path from "path";
import pdfParse from "pdf-parse/lib/pdf-parse.js";
import mammoth from "mammoth";

const extractText = async (filePath) => {
  try {
    const extension = path.extname(filePath).toLowerCase();

    switch (extension) {
      case ".pdf": {
        const buffer = await fs.readFile(filePath);
        const data = await pdfParse(buffer);

        return data.text.trim();
      }

      case ".docx": {
        const result = await mammoth.extractRawText({
          path: filePath,
        });

        return result.value.trim();
      }

      default:
        throw new Error(
          `Unsupported file type: ${extension}`
        );
    }
  } catch (error) {
    console.error("Text Extraction Error:", error);
    throw new Error("Failed to extract resume text.");
  }
};

export default extractText;