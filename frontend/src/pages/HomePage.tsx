import { useEffect, useState } from "react";
import api from "../services/api";
import type { Task } from "../types/task";
import TaskCard from "../components/TaskCard";

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    try {
      const response = await api.get("/task");
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async () => {
    if (!title.trim()) {
      alert("Judul task wajib diisi.");
      return;
    }

    try {
      await api.post("/task", {
        title,
        description,
      });

      resetForm();
      getTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const saveTask = async () => {
    if (editingId === null) return;

    if (!title.trim()) {
      alert("Judul task wajib diisi.");
      return;
    }

    try {
      await api.patch(`/task/${editingId}`, {
        title,
        description,
      });

      resetForm();
      getTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (id: number) => {
    const confirmDelete = window.confirm(
      "Apakah Anda yakin ingin menghapus task ini?",
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/task/${id}`);
      getTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const editTask = (task: Task) => {
    setEditingId(task.id);
    setEditingTask(task);

    setTitle(task.title);
    setDescription(task.description ?? "");

    setShowForm(true);
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");

    setEditingId(null);
    setEditingTask(null);

    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Task Management</h1>

          {!showForm && (
            <button
              onClick={() => {
                setEditingId(null);
                setEditingTask(null);

                setTitle("");
                setDescription("");

                setShowForm(true);
              }}
              className="rounded bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
            >
              + Tambah Task
            </button>
          )}
        </div>

        {showForm && (
          <div className="mb-6 rounded-lg bg-white p-5 shadow">
            {editingId !== null && editingTask && (
              <div className="mb-5 rounded-lg border border-yellow-300 bg-yellow-50 p-4">
                <h2 className="text-lg font-semibold text-yellow-700">
                  ✏️ Sedang Mengedit Task
                </h2>

                <div className="mt-2 text-sm text-gray-700">
                  <p>
                    <span className="font-semibold">ID :</span> {editingTask.id}
                  </p>

                  <p>
                    <span className="font-semibold">Judul Lama :</span>{" "}
                    {editingTask.title}
                  </p>

                  <p>
                    <span className="font-semibold">Deskripsi Lama :</span>{" "}
                    {editingTask.description || "-"}
                  </p>
                </div>
              </div>
            )}
            <input
              type="text"
              placeholder="Judul Task"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mb-3 w-full rounded border p-3"
            />

            <textarea
              placeholder="Deskripsi"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mb-4 w-full rounded border p-3"
            />

            {editingId === null ? (
              <div className="flex gap-2">
                <button
                  onClick={createTask}
                  className="rounded bg-green-600 px-5 py-2 text-white hover:bg-green-700"
                >
                  Tambah
                </button>

                <button
                  onClick={resetForm}
                  className="rounded bg-gray-500 px-5 py-2 text-white hover:bg-gray-600"
                >
                  Batal
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={saveTask}
                  className="rounded bg-yellow-500 px-5 py-2 text-white hover:bg-yellow-600"
                >
                  Simpan
                </button>

                <button
                  onClick={resetForm}
                  className="rounded bg-gray-500 px-5 py-2 text-white hover:bg-gray-600"
                >
                  Batal
                </button>
              </div>
            )}
          </div>
        )}

        {!showForm && (
          <>
            {tasks.length === 0 ? (
              <div className="rounded-lg bg-white p-6 text-center shadow">
                Belum ada task.
              </div>
            ) : (
              <div className="space-y-4">
                {tasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={editTask}
                    onDelete={deleteTask}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
