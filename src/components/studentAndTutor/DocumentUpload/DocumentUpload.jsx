import { useRef } from "react";
import { Upload } from "lucide-react";

function DocumentUpload({ onUpload }) {
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) onUpload(file);
  };
   const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (
        file.type === "application/pdf" ||
        file.type === "application/msword" ||
        file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        onUpload(file);
      } else {
        alert("❌ Only PDF and DOC/DOCX files are allowed.");
      }
    }
  };


  return (
    <div className="flex items-center justify-center w-full">
      <label className="flex flex-col items-center px-6 py-4 bg-gray-100 text-gray-600 rounded-md shadow cursor-pointer hover:bg-gray-200 transition">
        <Upload size={24} className="mb-2 text-green-600" />
        <span className="text-sm font-medium">Select PDF or DOC</span>
        <input
          type="file"
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          className="hidden"
          onChange={handleChange}
        />
      </label>
    </div>
  );
}

export default DocumentUpload;
