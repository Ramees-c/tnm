import { FileText, Eye, Trash2 } from "lucide-react";

function DocumentCard({ file, onView, onDelete }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow hover:shadow-md transition flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full">
      {/* Icon + Info */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="w-8 h-8 md:w-12 md:h-12 flex items-center justify-center rounded-lg bg-green-100 flex-shrink-0">
          <FileText className="text-green-600" size={24} />
        </div>
        <div className="truncate">
          <p className="font-semibold text-xs md:text-md lg:text-lg text-gray-800 truncate">{file.name}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 self-end sm:self-auto">
        <button
          onClick={() => onView(file)}
          className="text-blue-600 hover:text-blue-800 transition-colors"
        >
          <Eye size={20} />
        </button>
        <button
          onClick={() => onDelete(file)}
          className="text-red-600 hover:text-red-800 transition-colors"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
}

export default DocumentCard;
