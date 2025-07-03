// src/components/TaskForm.js
import { useState } from "react";

export default function TaskForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("General");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({ title, description: desc, priority, category, dueDate });
    setTitle("");
    setDesc("");
    setPriority("Medium");
    setCategory("General");
    setDueDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 mb-6">
      <input
        className="w-full p-2 border rounded"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        className="w-full p-2 border rounded"
        placeholder="Description (optional)"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <div className="flex flex-col sm:flex-row gap-3">
        <select
          className="flex-1 p-2 border rounded"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <select
          className="flex-1 p-2 border rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Work</option>
          <option>Fitness</option>
          <option>Personal</option>
          <option>General</option>
        </select>
        <input
          type="date"
          className="flex-1 p-2 border rounded"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
      <button className="w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded">
        Add Task
      </button>
    </form>
  );
}
