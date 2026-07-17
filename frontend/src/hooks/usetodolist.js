import { useRef, useState } from "react";

export default function useToDoList() {

    const [task, setTask] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newDate, setNewDate] = useState("");
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [newPriority, setNewPriority] = useState("LOW");

    const localToday = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .split("T")[0];

    const resetForm = () => {
        setNewTask("");
        setNewDescription("");
        setNewDate("");
        setEditingTaskId(null);
        setNewPriority("LOW");
    }

    const getAllTasks = async () => {
        const response = await fetch(
            "http://localhost:3000/tasks",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        const tasks = await response.json();
        const normalizedTasks = tasks.map((task) => ({
            ...task,
            priority: task.priority ? String(task.priority).toUpperCase() : "LOW",
        }));
        setTask(normalizedTasks);
    }

    const createTask = async () => {
        const trimmedTask = newTask.trim();
        const trimmedDescription = newDescription.trim();

        if (trimmedTask === "" || trimmedDescription === "" || newDate === "" || newDate < localToday) return;

        const model = {
            name: trimmedTask,
            description: trimmedDescription,
            date: newDate,
            completed: false,
            priority: String(newPriority || "LOW").toUpperCase(),
        }

        await saveTask(model);
        await getAllTasks();
        resetForm();
    }

    const saveTask = async (model) => {
        const response = await fetch(
            "http://localhost:3000/tasks",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(model)
            }
        );
        return response.json();
    }

    const getById = async (id) => {
        const response = await fetch(`http://localhost:3000/tasks/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();
        return data;

    }

    const editTask = async (id) => {
        const response = await getById(id);
        setEditingTaskId(id);
        setNewTask(response.name);
        setNewDescription(response.description);
        setNewDate(response.date);
        setNewPriority(response.priority ? String(response.priority).toUpperCase() : "LOW");
    }

    const saveEdit = async () => {
        const trimmedTask = newTask.trim();
        const trimmedDescription = newDescription.trim();

        if (!editingTaskId || trimmedTask === "" || trimmedDescription === "" || newDate === "" || newDate < localToday) return;

        const model = {
            name: trimmedTask,
            description: trimmedDescription,
            date: newDate,
            completed: false,
            priority: String(newPriority || "LOW").toUpperCase(),
        }

        await updateTask(editingTaskId, model);
        await getAllTasks();
        resetForm();
    }

    const updateTask = async (id, model) => {
        const response = await fetch(`http://localhost:3000/tasks/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(model)
        });
        return response.json();
    }

    const cancelEdit = () => {
        resetForm();
    }

    const deleteTask = async (id) => {
       const response = await fetch(`http://localhost:3000/tasks/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        });
        await getAllTasks();
        return response.json();
    }

    const toggleTaskCompletion = async (id,completed) => {
        const response = await fetch(`http://localhost:3000/tasks/completed/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ completed})
        });
        await getAllTasks();
        return response.json();
    }

    const priorityTask = async (id, priority) => {
        const response = await fetch(`http://localhost:3000/tasks/priority/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ priority})
        });
        await getAllTasks();
        return response.json();
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
        toggleTaskCompletion,
        localToday,
        getAllTasks,
        priorityTask,
        newPriority,
        setNewPriority,
    }
}

