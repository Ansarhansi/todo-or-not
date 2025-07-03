import { useState, useEffect } from "react";
import { getTasks, saveTasks, getUsername } from "../utils/localStorage";

import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import TaskFilter from "./TaskFilter";
import EditModal from "./EditModal";
import Toast from "./Toast";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [editingTask, setEditingTask] = useState(null);
  const [toast, setToast] = useState(null);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  useEffect(() => {
    setTasks(getTasks());
  }, []);

  const handleAdd = (task) => {
    const newTask = {
      id: Date.now(),
      ...task,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    const updated = [newTask, ...tasks];
    setTasks(updated);
    saveTasks(updated);
    showToast("Task added!");
  };

  const handleEditSave = (updatedTask) => {
    const updated = tasks.map((t) =>
      t.id === updatedTask.id ? updatedTask : t
    );
    setTasks(updated);
    saveTasks(updated);
    showToast("Task updated!");
    setEditingTask(null);
  };

  const handleDelete = (id) => {
    const updated = tasks.filter((t) => t.id !== id);
    setTasks(updated);
    saveTasks(updated);
    showToast("Task deleted!");
  };

  const toggleComplete = (id) => {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTasks(updated);
    saveTasks(updated);
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  const filteredTasks = tasks
    .filter((t) => {
      if (filter === "All") return true;
      if (filter === "Completed") return t.completed;
      return !t.completed;
    })
    .filter(
      (t) =>
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.description?.toLowerCase().includes(search.toLowerCase())
    )
    .filter((t) =>
      categoryFilter === "All" ? true : t.category === categoryFilter
    );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Hi, {getUsername()} 👋</h1>
        </div>

        <div className="bg-white border p-3 rounded-md mb-4 text-sm flex justify-between flex-wrap gap-2">
          <div>📋 Total Tasks: {tasks.length}</div>
          <div>✅ Completed: {tasks.filter((t) => t.completed).length}</div>
          <div>
            📊 Progress:{" "}
            {tasks.length === 0
              ? "0%"
              : `${Math.round(
                  (tasks.filter((t) => t.completed).length / tasks.length) * 100
                )}%`}
          </div>
        </div>

        <input
          type="text"
          placeholder="🔍 Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        <div className="mb-4">
          <select
            className="p-2 border rounded"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Work">💼 Work</option>
            <option value="Fitness">🏋️ Fitness</option>
            <option value="Personal">👤 Personal</option>
            <option value="General">🗂️ General</option>
          </select>
        </div>

        <TaskForm onSubmit={handleAdd} />
        <TaskFilter filter={filter} setFilter={setFilter} tasks={tasks} />
        <TaskList
          tasks={filteredTasks}
          onDelete={handleDelete}
          onEdit={setEditingTask}
          onToggle={toggleComplete}
        />
        {editingTask && (
          <EditModal
            task={editingTask}
            onClose={() => setEditingTask(null)}
            onSave={handleEditSave}
          />
        )}
        {toast && <Toast message={toast} />}
      </div>
    </div>
  );
}
