import React from "react";

const DeleteAlert = ({
  content,
  onDelete,
  onCancel,
  showYesNo = false,
  deleteButtonText = "Delete",
  // cancelButtonText = "Cancel",
}) => {
  return (
    <div>
      <p className="text-sm">{content}</p>

      <div className="flex justify-end gap-3 mt-6">
        {showYesNo ? (
          <>
            {/* No Button - Default focused */}
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:ring-2 focus:ring-gray-300 focus:outline-none"
              onClick={onCancel}
              autoFocus // This makes "No" selected by default
            >
              No
            </button>
            {/* Yes Button */}
            <button
              type="button"
              className="add-btn add-btn-fill"
              onClick={onDelete}
            >
              Yes
            </button>
          </>
        ) : (
          <>
            {/* Original single Delete button for backward compatibility */}
            <button
              type="button"
              className="add-btn add-btn-fill"
              onClick={onDelete}
            >
              {deleteButtonText}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default DeleteAlert;
