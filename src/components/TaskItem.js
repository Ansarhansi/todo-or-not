// src/components/TaskItem.js
import { motion } from "framer-motion";

export default function TaskItem({ task, onDelete, onEdit, onToggle }) {
  const categoryIcon =
    task.category === "Work"
      ? "💼"
      : task.category === "Fitness"
      ? "🏋️"
      : task.category === "Personal"
      ? "👤"
      : "🗂️";

  const priorityTag = (
    <span
      className={`px-2 py-0.5 text-xs rounded-full font-semibold ${
        task.priority === "High"
          ? "bg-red-500 text-white"
          : task.priority === "Medium"
          ? "bg-yellow-400 text-black"
          : "bg-green-500 text-white"
      }`}
    >
      {task.priority}
    </span>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-4 border rounded mb-3 bg-white shadow-sm transition-transform duration-300 hover:scale-[1.01]"
    >
      <div className="flex justify-between items-start">
        <h3
          className={`text-lg font-bold flex items-center gap-2 ${
            task.completed ? "line-through text-gray-400" : ""
          }`}
        >
          📝 {task.title}
        </h3>
        <button
          onClick={() => onToggle(task.id)}
          className="text-sm text-blue-600 hover:underline"
        >
          {task.completed ? "Undo" : "Done"}
        </button>
      </div>

      {task.description && (
        <p className="mt-1 text-gray-700">{task.description}</p>
      )}

      <div className="mt-2 text-sm text-gray-600 flex flex-col sm:flex-row sm:items-center sm:gap-6">
        <p className="flex items-center gap-1">Priority: {priorityTag}</p>
        <p className="flex items-center gap-1">
          Category: {categoryIcon} {task.category}
        </p>
        {task.dueDate && (
          <p className="flex items-center gap-1">📅 Due: {task.dueDate}</p>
        )}
      </div>

      <div className="flex gap-4 mt-3 text-sm">
        <button
          onClick={() => onEdit(task)}
          className="text-yellow-600 hover:underline"
        >
          ✏️ Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="text-red-600 hover:underline"
        >
          🗑️ Delete
        </button>
      </div>
    </motion.div>
  );
}
