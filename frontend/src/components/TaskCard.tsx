import type { Task } from "../types/task";
interface TaskCardProps {
  task: Task;
  onDelete: (id: number) => void;
  onEdit: (task: Task) => void;
}
export default function TaskCard({ task, onDelete, onEdit }: TaskCardProps) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{task.title}</h2>

        <span
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            task.isCompleted
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {task.isCompleted ? "Selesai" : "Belum"}
        </span>
      </div>

      {task.description && (
        <p className="mt-3 text-gray-600">{task.description}</p>
      )}

      <div className="mt-5 flex gap-3">
        <button
          onClick={() => onEdit(task)}
          className="rounded-lg bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
        >
          Edit
        </button>   

        <button
          onClick={() => onDelete(task.id)}
          className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Hapus
        </button>
      </div>
    </div>
  );
}
