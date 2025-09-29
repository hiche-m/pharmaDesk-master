import React from "react";
import { GoPin } from "react-icons/go";

const TailwindCommentModal = ({
  title,
  comment,
  onCommentChange,
  isPinned,
  actionLabel = "Continuer",
  cancelLabel = "Annuler",
  color = "green-600",
  actionFunction,
  cancelAction,
}) => {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-4">
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full bg-${color}/10`}
          >
            <GoPin className={`text-xl text-${color}`} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>

        {/* Body */}
        {!isPinned && (
          <textarea
            className="w-full rounded-md border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
            placeholder="Ajouter un commentaire..."
            value={comment}
            onChange={(e) => onCommentChange(e.target.value)}
            rows={3}
          />
        )}

        {/* Footer */}
        <div className="flex justify-between space-x-3 mt-6">
          <button
            type="button"
            className="w-full mr-2 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100"
            onClick={cancelAction}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            className={`w-full px-4 py-2 text-sm font-semibold text-white rounded-md bg-${color} hover:opacity-90`}
            onClick={actionFunction}
          >
            {actionLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TailwindCommentModal;
