// src/components/EditModal.js
import { useState } from "react";

export default function EditModal({ task, onClose, onSave }) {
  const [updated, setUpdated] = useState({ ...task });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(updated);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h3 className="text-xl font-bold mb-4">Edit Task</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            className="w-full p-2 border rounded"
            value={updated.title}
            onChange={(e) => setUpdated({ ...updated, title: e.target.value })}
          />
          <input
            className="w-full p-2 border rounded"
            value={updated.description}
            onChange={(e) =>
              setUpdated({ ...updated, description: e.target.value })
            }
          />
          <div className="flex gap-2">
            <select
              className="flex-1 p-2 border rounded"
              value={updated.priority}
              onChange={(e) =>
                setUpdated({ ...updated, priority: e.target.value })
              }
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
            <select
              className="flex-1 p-2 border rounded"
              value={updated.category}
              onChange={(e) =>
                setUpdated({ ...updated, category: e.target.value })
              }
            >
              <option>Work</option>
              <option>Fitness</option>
              <option>Personal</option>
              <option>General</option>
            </select>
          </div>
          <input
            type="date"
            className="w-full p-2 border rounded"
            value={updated.dueDate}
            onChange={(e) =>
              setUpdated({ ...updated, dueDate: e.target.value })
            }
          />
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>
            <button type="button" onClick={onClose} className="text-red-500">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
