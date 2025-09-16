import { useState } from "react";
import { Menu, FileText, Upload, File } from "lucide-react";
import DashboardSidebar from "../../../components/studentAndTutor/DashboardSidebar/DashboardSidebar";
import DocumentUpload from "../../../components/studentAndTutor/DocumentUpload/DocumentUpload";
import DocumentCard from "../../../components/studentAndTutor/DocumentCard/DocumentCard";

function TutorDocumentPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (file) => {
    if (
      file.type === "application/pdf" ||
      file.type === "application/msword" ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      setSelectedFile(file);
    } else {
      alert("❌ Only PDF and DOC/DOCX files are allowed.");
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      setDocuments([...documents, selectedFile]);
      setSelectedFile(null);
    }
  };

  const handleView = (file) => {
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL, "_blank");
  };

  const handleDelete = (file) => {
    setDocuments(documents.filter((doc) => doc !== file));
  };

  const renderFilePreview = (file) => {
    if (!file) return null;

    if (file.type === "application/pdf") {
      const fileURL = URL.createObjectURL(file);
      return (
        <iframe
          src={fileURL}
          title="PDF Preview"
          className="w-full h-full rounded-lg border"
        />
      );
    } else if (
      file.type === "application/msword" ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.name.endsWith(".doc") ||
      file.name.endsWith(".docx")
    ) {
      return (
        <div className="flex flex-col items-center justify-center gap-2 h-full w-full bg-gray-50 rounded-lg border border-gray-200 p-2">
          <File size={40} className="text-green-500" />
          <p className="text-sm text-gray-500 text-center">
            Preview not available for DOC/DOCX locally.
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed lg:relative z-20 inset-y-0 left-0 w-72 bg-white shadow-lg transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300`}
      >
        <DashboardSidebar
          role="tutor"
          open={sidebarOpen}
          setOpen={setSidebarOpen}
        />
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-10 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 w-full p-4 sm:p-6 transition-all duration-300">
        <div className="max-w-6xl mx-auto flex flex-col gap-6">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg shadow bg-white hover:bg-gray-100 transition"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex-1">
              Tutor Documents
            </h1>
          </div>

          {/* Upload Section */}
          <div className="bg-white rounded-md shadow p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Upload Document
            </h2>
            <DocumentUpload onUpload={handleFileSelect} />

            {selectedFile && (
              <div className="mt-4 w-full sm:w-full md:w-80 bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden relative mx-auto">
                {/* Header */}
                <div className="px-4 py-2 bg-gray-100 flex flex-col gap-1 border-b border-gray-200">
                  <p className="text-gray-800 font-medium truncate">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setSelectedFile(null)}
                  className="absolute top-3 right-3 bg-red-500 text-white w-8 h-8 flex items-center justify-center rounded-full shadow hover:bg-red-600 transition"
                >
                  ✕
                </button>

                {/* Preview */}
                <div className="h-60 bg-gray-50 flex items-center justify-center p-2">
                  {renderFilePreview(selectedFile)}
                </div>

                {/* Upload Button */}
                <div className="p-4 flex justify-end">
                  <button
                    onClick={handleUpload}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700 transition text-sm"
                  >
                    <Upload size={16} /> Upload
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Uploaded Documents */}
          <div className="bg-white rounded-xl shadow p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Uploaded Documents
            </h2>
            {documents.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {documents.map((doc, i) => (
                  <DocumentCard
                    key={i}
                    file={doc}
                    onView={handleView}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No documents uploaded yet.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default TutorDocumentPage;
