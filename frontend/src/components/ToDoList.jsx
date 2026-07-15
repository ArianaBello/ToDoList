import { useEffect } from "react";
import useToDoList from "../hooks/usetodolist"
import '../index.css'
import { EditIcon, TrashIcon } from "../shared/icons/trash"
import Select from "./Select"

const PRIORITY_OPTIONS = [
    { value: 'LOW', label: 'Low Priority' },
    { value: 'MEDIUM', label: 'Medium Priority' },
    { value: 'HIGH', label: 'High Priority' },
];

const PRIORITY_COLORS = {
    LOW: 'bg-green-100 text-green-800 border border-green-300',
    MEDIUM: 'bg-yellow-100 text-yellow-800 border border-yellow-300',
    HIGH: 'bg-red-200 text-red-800 border border-red-300',
};

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
        toggleTaskCompletion,
        localToday,
        getAllTasks,
        newPriority,
        setNewPriority,
        priorityTask,
    } = useToDoList();

    useEffect(() => {
        getAllTasks();
    }, []);

    const isDateValid = newDate === "" || newDate >= localToday;

    return (
        <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-md rounded-lg">
            <h1 className="text-center text-2xl font-bold mb-4"> ToDoList </h1>
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
                <div>
                    <Select
                        label="Priority"
                        value={newPriority}
                        onChange={(e) => setNewPriority(e.target.value)}
                        options={PRIORITY_OPTIONS}
                        placeholder="Select priority level"
                        showPlaceholder={false}
                    />
                    {newPriority && (
                        <div className={`mt-2 inline-block px-3 py-1 rounded-full text-sm font-medium ${PRIORITY_COLORS[newPriority]}`}>
                            {PRIORITY_OPTIONS.find(opt => opt.value === newPriority)?.label}
                        </div>
                    )}
                </div>
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
                                    onChange={() => toggleTaskCompletion(task.id, !task.completed)}
                                    className="mr-2 accent-pink-500 focus:ring-pink-500"
                                />
                                <span className="font-medium">{task.name}</span>
                            </div>
                            <p className="text-sm text-black">{task.description}</p>
                            <p className="text-xs text-black mt-1"> Fecha: <time dateTime={task.date}>{task.date}</time></p>
                            {task.priority && (
                                <div className={`mt-2 inline-block px-2 py-1 rounded-full text-xs font-medium ${PRIORITY_COLORS[String(task.priority).toUpperCase()] || ''}`}>
                                    {PRIORITY_OPTIONS.find(opt => opt.value === String(task.priority).toUpperCase())?.label || task.priority}
                                </div>
                            )}
                        </div>
                        <div className="flex items-center gap-2 ml-3">
                            <EditIcon
                                onClick={() => editTask(task.id)}
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
