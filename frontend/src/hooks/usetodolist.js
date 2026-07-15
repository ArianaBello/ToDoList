import { useRef, useState } from "react";

export default function useToDoList() {

    const [task, setTask] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newDate, setNewDate] = useState("");
    const [editingTaskId, setEditingTaskId] = useState(null);
    const nextId = useRef(1);

    const localToday = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .split("T")[0];

    const resetForm = () => {
        setNewTask("");
        setNewDescription("");
        setNewDate("");
        setEditingTaskId(null);
    }

    const createTask = () => {
        const trimmedTask = newTask.trim();
        const trimmedDescription = newDescription.trim();

        if (trimmedTask === "" || trimmedDescription === "" || newDate === "" || newDate < localToday) return;

        setTask((prevTasks) => [
            ...prevTasks,
            {
                id: nextId.current++,
                name: trimmedTask,
                description: trimmedDescription,
                dueDate: newDate,
                completed: false
            }
        ]);

        resetForm();
    }

    const editTask = (taskToEdit) => {
        setEditingTaskId(taskToEdit.id);
        setNewTask(taskToEdit.name);
        setNewDescription(taskToEdit.description);
        setNewDate(taskToEdit.dueDate);
    }

    const saveEdit = () => {
        const trimmedTask = newTask.trim();
        const trimmedDescription = newDescription.trim();

        if (!editingTaskId || trimmedTask === "" || trimmedDescription === "" || newDate === "" || newDate < localToday) return;

        setTask((prevTasks) =>
            prevTasks.map((item) =>
                item.id === editingTaskId
                    ? { ...item, name: trimmedTask, description: trimmedDescription, dueDate: newDate }
                    : item
            )
        );

        resetForm();
    }

    const cancelEdit = () => {
        resetForm();
    }

    const deleteTask = (id) => {
        setTask((prevTasks) => prevTasks.filter((item) => item.id !== id));
        if (editingTaskId === id) cancelEdit();
    }

    const toggleTaskCompletion = (id) => {
        setTask((prevTasks) =>
            prevTasks.map((item) => item.id === id ? { ...item, completed: !item.completed } : item)
        );
    }

    return {
        task,
        newTask,
        setNewTask,
        newDescription,
        setNewDescription,
        newDate,
        setNewDate,
        editingTaskId,
        setEditingTaskId,
        createTask,
        editTask,
        saveEdit,
        cancelEdit,
        deleteTask,
        toggleTaskCompletion
    }
}

