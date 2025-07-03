// src/components/TaskFilter.js
export default function TaskFilter({ filter, setFilter, tasks }) {
  const counts = {
    All: tasks.length,
    Completed: tasks.filter((t) => t.completed).length,
    Pending: tasks.filter((t) => !t.completed).length,
  };

  return (
    <div className="flex gap-2 mb-4">
      {["All", "Completed", "Pending"].map((status) => (
        <button
          key={status}
          onClick={() => setFilter(status)}
          className={`px-3 py-1 rounded border ${
            filter === status ? "bg-blue-600 text-white" : "bg-white"
          }`}
        >
          {status} ({counts[status]})
        </button>
      ))}
    </div>
  );
}
