import useToDoList from "../hooks/usetodolist"
import '../index.css'
import { EditIcon, TrashIcon } from "../shared/icons/trash"

export default function ToDoList() {

    const {
        task,
        newTask,
        setNewTask,
        newDescription,
        setNewDescription,
        newDate,
        setNewDate,
        editingTaskId,
        createTask,
        editTask,
        saveEdit,
        cancelEdit,
        deleteTask,
        toggleTaskCompletion
    } = useToDoList();

    const localToday = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .split("T")[0];
    const isDateValid = newDate === "" || newDate >= localToday;

    return (
        <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-4"> ToDoList </h1>
            <div className="mb-4 space-y-3">
                <input
                    type="text"
                    placeholder="Task Name"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    className="w-full p-2 border border-pink-300 rounded-lg focus:outline-none"
                />
                <textarea
                    placeholder="Description"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="w-full p-2 border border-pink-300 rounded-lg focus:outline-none"
                    rows={3}
                />
                <input
                    type="date"
                    value={newDate}
                    min={localToday}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full p-2 border accent-pink-500 border-pink-300 rounded-lg focus:outline-none"
                />
                <div className="flex gap-2">
                    <button
                        className="flex-1 p-2 bg-pink-400 text-white rounded-lg hover:bg-pink-500 disabled:opacity-50"
                        onClick={editingTaskId ? saveEdit : createTask}
                        disabled={!newTask.trim() || !newDescription.trim() || !newDate || !isDateValid}
                    >
                        {editingTaskId ? "Save Task" : "Add Task"}
                    </button>
                    {editingTaskId && (
                        <button
                            className="flex-1 p-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400"
                            onClick={cancelEdit}
                        >Cancel
                        </button>
                    )}
                </div>
            </div>
            <ul className="space-y-2">
                {task.map((task) => (
                    <li
                        key={task.id}
                        className={`flex items-start justify-between pd-2 border border-pink-300 rounded-lg ${task.completed ? "bg-black-100 line-through" : ""}`}>
                        <div className="flex-1">
                            <div className="flex items-center mb-2">
                                <input type="checkbox"
                                    checked={task.completed}
                                    onChange={() => toggleTaskCompletion(task.id)}
                                    className="mr-2 accent-pink-500 focus:ring-pink-500"
                                />
                                <span className="font-medium">{task.name}</span>
                            </div>
                            <p className="text-sm text-black">{task.description}</p>
                            <p className="text-xs text-black mt-1"> Fecha: <time dateTime={task.dueDate}>{task.dueDate}</time></p>
                        </div>
                        <div className="flex items-center gap-2 ml-3">
                            <EditIcon
                                onClick={() => editTask(task)}
                                width={20}
                                height={20}
                                fill="currentColor"
                                className="cursor-pointer text-pink-500 hover:text-pink-800"
                            />
                            <TrashIcon
                                onClick={() => deleteTask(task.id)}
                                width={20}
                                height={20}
                                fill="currentColor"
                                className="cursor-pointer text-pink-500 hover:text-pink-800"
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
