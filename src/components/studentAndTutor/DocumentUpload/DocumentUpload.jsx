import { useRef } from "react";
import { Upload } from "lucide-react";

function DocumentUpload({ onUpload, uploadError }) {
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (
        file.type === "application/pdf" ||
        file.type === "application/msword" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        onUpload(file);
      } else {
        // Instead of alert, trigger uploadError in parent
        onUpload(null, "❌ Only PDF and DOC/DOCX files are allowed.");
      }
    }

    // 🔹 Reset input so same file can be selected again
    e.target.value = "";
  };

  return (
    <div className="flex flex-col items-center w-full">
      <label className="flex flex-col items-center px-6 py-4 bg-gray-100 text-gray-600 rounded-md shadow-sm cursor-pointer hover:bg-gray-200 transition">
        <Upload size={20} className="mb-2 text-green-600" />
        <span className="text-xs sm:text-sm font-medium">Select PDF or DOC</span>
        <input
          type="file"
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          className="hidden"
          onChange={handleChange}
        />
      </label>

      {/* Upload error message */}
      {uploadError && (
        <p className="text-red-600 text-sm mt-2">{uploadError}</p>
      )}
    </div>
  );
}

export default DocumentUpload;
