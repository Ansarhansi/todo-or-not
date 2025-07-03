// src/components/TaskList.js
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onDelete, onEdit, onToggle }) {
  if (tasks.length === 0)
    return <p className="text-center text-gray-500">🎉 No tasks found</p>;

  return (
    <div>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onEdit={onEdit}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}
