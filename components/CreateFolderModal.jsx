import React, { useState } from "react";

export default function CreateFolderModal({ open, onClose, onCreate }) {
  const [folderName, setFolderName] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Create New Folder</h2>

        <input
          type="text"
          placeholder="Enter folder name"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          className="w-full border rounded-md px-3 py-2 mb-4"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              if (!folderName.trim()) return;
              onCreate(folderName);
              setFolderName("");
              onClose();
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
