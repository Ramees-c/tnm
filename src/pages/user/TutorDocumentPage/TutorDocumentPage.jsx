import { useState, useEffect } from "react";
import { Menu, Upload, File } from "lucide-react";
import DashboardSidebar from "../../../components/studentAndTutor/DashboardSidebar/DashboardSidebar";
import DocumentUpload from "../../../components/studentAndTutor/DocumentUpload/DocumentUpload";
import DocumentCard from "../../../components/studentAndTutor/DocumentCard/DocumentCard";
import axios from "axios";
import { useAuth } from "../../../Context/userAuthContext";
import ConfirmMessagePopup from "../../../components/common/ConfirmMessagePopup/ConfirmMessagePopup";
import API_BASE, { MEDIA_URL } from "../../../API/API";
import ToastMessage from "../../../components/studentAndTutor/ToastMessage/ToastMessage";

function TutorDocumentPage({ role = "tutor" }) {
  const { token, userDetails, isMailVerified } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadError, setUploadError] = useState("");
  const [showUploadPopup, setShowUploadPopup] = useState(false);
  const [noPreviewPopupOpen, setNoPreviewPopupOpen] = useState(false);

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [fileToDelete, setFileToDelete] = useState(null);
  const [toastOpen, setToastOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Normalize uploaded documents
  const [uploadedDocuments, setUploadedDocuments] = useState(() => {
    return (userDetails?.documents || []).map((doc, index) => {
      if (typeof doc === "object" && doc.file) {
        return {
          id: doc.id ?? index,
          name: doc.file.split("/").pop(),
          url: doc.file,
        };
      }
      if (typeof doc === "string") {
        return {
          id: index,
          name: doc.split("/").pop(),
          url: doc,
        };
      }
      return doc;
    });
  });

  useEffect(() => {
    if (userDetails?.mail_verified === false) {
      setToastOpen(true);
    } else {
      setToastOpen(false);
    }
  }, [userDetails]);

  // File select validation
  const handleFileSelect = (file) => {
    if (
      file.type === "application/pdf" ||
      file.type === "application/msword" ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      setSelectedFile(file);
      setUploadError("");
    } else {
      setUploadError("Only PDF and DOC/DOCX files are allowed.");
      setSelectedFile(null);
    }
  };

  // Upload file to API
  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadError("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("files", selectedFile);

    try {
      setUploading(true);
      const res = await axios.post(
        `${API_BASE}/tutor/documents/upload/`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const uploaded = res.data?.uploaded?.[0];
      if (uploaded) {
        const newDoc = {
          id: uploaded.id,
          name: uploaded.file.split("/").pop(),
          url: uploaded.file,
        };
        setUploadedDocuments((prev) => [...prev, newDoc]);
        setShowUploadPopup(true);
        setSelectedFile(null);
        setUploadError("");
      } else if (res.data?.skipped?.length > 0) {
        setUploadError(
          `File name already exists. Please rename and try again.`
        );
      }
    } catch (error) {
      console.error("Upload failed");
      setUploadError(error.message || "Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  // View file
  const handleView = (file) => {
    const fileURL = file.url || file.file;
    if (fileURL) {
      // Ensure MEDIS_URL is prepended if fileURL is relative
      const fullURL = fileURL.startsWith("http")
        ? fileURL
        : `${MEDIA_URL}${fileURL}`;
      window.open(fullURL, "_blank");
    } else {
      setNoPreviewPopupOpen(true);
    }
  };

  // Delete logic
  const handleDeleteClick = (file) => {
    setFileToDelete(file);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!fileToDelete) return;
    try {
      await axios.delete(
        `${API_BASE}/tutor/documents/${fileToDelete.id}/delete/`,
        {
          withCredentials: true,
        }
      );

      setFiles((prev) => prev.filter((f) => f.id !== fileToDelete.id));
      setUploadedDocuments((prev) =>
        prev.filter((f) => f.id !== fileToDelete.id)
      );

      setDeleteConfirmOpen(false);
      setFileToDelete(null);
    } catch (err) {
      console.error("Delete failed");
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmOpen(false);
    setFileToDelete(null);
  };

  // File preview
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
    }
    if (file.name.endsWith(".doc") || file.name.endsWith(".docx")) {
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
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-0 lg:w-64 xl:w-72">
        <DashboardSidebar
          role={role}
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
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
              <Menu size={27} />
            </button>
            <h1 className="text-xl sm:text-3xl font-bold text-gray-800">
              Tutor Documents
            </h1>
          </div>

          {/* Upload Section */}
          <div className="bg-white rounded-md shadow-sm p-4 sm:p-6">
            <h2 className="text-sm sm:text-lg font-semibold text-gray-800 mb-4">
              Upload Document
            </h2>
            <DocumentUpload
              onUpload={handleFileSelect}
              uploadError={uploadError}
            />

            {selectedFile && (
              <div className="mt-4 w-full md:w-80 bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden relative mx-auto">
                {/* Header */}
                <div className="px-4 py-2 bg-gray-100 flex flex-col gap-1 border-b border-gray-200 text-sm sm:text-lg">
                  <p className="text-gray-800 font-medium truncate">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>

                {/* Close */}
                <button
                  onClick={() => setSelectedFile(null)}
                  className="absolute top-3 right-3 bg-red-500 text-white text-xs sm:text-sm h-5 w-5 sm:w-8 sm:h-8 flex items-center justify-center rounded-full shadow-sm hover:bg-red-600 transition"
                >
                  ✕
                </button>

                {/* Preview */}
                <div className="h-60 bg-gray-50 flex items-center justify-center p-2">
                  {renderFilePreview(selectedFile)}
                </div>

                {/* Upload */}
                <div className="p-4 flex justify-end">
                  <button
                    onClick={handleUpload}
                    disabled={uploading}
                    className={`flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-md shadow-sm text-xs sm:text-sm transition-all duration-200
      ${
        uploading
          ? "bg-green-400 cursor-not-allowed opacity-70"
          : "bg-green-600 hover:bg-green-700 text-white"
      }`}
                  >
                    {uploading ? (
                      <>
                        <svg
                          className="animate-spin h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                          ></path>
                        </svg>
                        <span className="text-white">Uploading...</span>
                      </>
                    ) : (
                      <>
                        <Upload size={15} /> Upload
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Uploaded Documents */}
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <h2 className="text-sm sm:text-lg font-semibold text-gray-800 mb-4">
              Uploaded Documents
            </h2>
            {uploadedDocuments.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {uploadedDocuments.map((file) => (
                  <DocumentCard
                    key={file.id}
                    file={file}
                    onView={() => handleView(file)}
                    onDelete={() => handleDeleteClick(file)}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No documents uploaded yet.</p>
            )}
          </div>
        </div>
        {toastOpen && (
          <ToastMessage
            message={isMailVerified}
            isOpen={toastOpen}
            onClose={() => setToastOpen(false)}
            type="warning"
          />
        )}
      </main>

      {/* Popups */}
      {showUploadPopup && (
        <ConfirmMessagePopup
          isOpen={true}
          type="alert"
          message="Document uploaded successfully!"
          onClose={() => setShowUploadPopup(false)}
        />
      )}
      {deleteConfirmOpen && (
        <ConfirmMessagePopup
          isOpen={true}
          type="confirm"
          message="Are you sure you want to delete this document?"
          onYes={confirmDelete}
          onNo={cancelDelete}
        />
      )}
      {noPreviewPopupOpen && (
        <ConfirmMessagePopup
          isOpen={true}
          type="alert"
          message="No preview available for this document."
          onClose={() => setNoPreviewPopupOpen(false)}
        />
      )}
    </div>
  );
}

export default TutorDocumentPage;
