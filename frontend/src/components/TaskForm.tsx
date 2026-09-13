interface TaskFormProps {
  title: string;
  description: string;
  setTitle: (value: string) => void;
  setDescription: (value: string) => void;
  onSubmit: () => void;
  isEditing: boolean;
}

export default function TaskForm({
  title,
  description,
  setTitle,
  setDescription,
  onSubmit,
  isEditing,
}: TaskFormProps) {
  return (
    <div className="mb-6 rounded-lg bg-white p-5 shadow">
      <input
        type="text"
        placeholder="Judul Task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-3 w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500"
      />

      <textarea
        placeholder="Deskripsi"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="mb-3 w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500"
      />

      <button
        onClick={onSubmit}
        className="rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
      >
        {isEditing ? "Update Task" : "Tambah Task"}
      </button>
    </div>
  );
}
