import { FileText, Eye, Trash2 } from "lucide-react";

function DocumentCard({ file, onView, onDelete }) {
  return (
    <div className="p-4 bg-white rounded-md shadow hover:shadow-md transition flex items-center justify-between gap-4">
      {/* Icon + Info */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-green-100">
          <FileText className="text-green-600" size={24} />
        </div>
        <div>
          <p className="font-semibold text-gray-800">{file.name}</p>
          <p className="text-xs text-gray-500">
            {(file.size / 1024).toFixed(1)} KB
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => onView(file)}
          className="text-blue-600 hover:text-blue-800"
        >
          <Eye size={20} />
        </button>
        <button
          onClick={() => onDelete(file)}
          className="text-red-600 hover:text-red-800"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
}

export default DocumentCard;
