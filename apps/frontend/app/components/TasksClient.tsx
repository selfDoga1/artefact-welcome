"use client";
import { useState } from "react";
import useModal from "../hooks/useModal";
import useTasks from "../hooks/useTasks";
import TaskModalForm from "./TaskModalForm";
import TaskCard from "./TaskCard";
import TaskSchema from "@backend/server/schemas/task";
import { z } from "zod";

type Task = z.infer<typeof TaskSchema>

export default function TasksClient() {
    const { isOpen, open, close } = useModal();
    const [taskId, setTaskId] = useState<string | null>(null);
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    function handleOpenModal(task?: Task) {
        setTaskId(task?.id ?? null)
        setEditingTask(task ?? null)
        open()
    }
    
    function handleClose() {
        setTaskId(null)
        setEditingTask(null)
        close()
    }
    
    const { list, create, update, remove } = useTasks();

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const title = (form.elements.namedItem("title") as HTMLInputElement).value;
        const description = (form.elements.namedItem("description") as HTMLTextAreaElement).value;

        if (taskId) {
            update.mutate(
                { id: taskId, title, description },
                { onSuccess: () => handleClose() },
            )
        } else {
            create.mutate(
                { title, description },
                { onSuccess: () => handleClose() },
            )
        }
    }

    console.log(list)

    return (
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
                <h1 style={{ fontSize: 24, fontWeight: 700, color: "#111827" }}>Tasks</h1>
                <button
                    onClick={() => handleOpenModal()}
                    style={{
                        padding: "8px 16px",
                        borderRadius: 6,
                        border: "none",
                        background: "#2563eb",
                        color: "white",
                        fontSize: 14,
                        fontWeight: 500,
                        cursor: "pointer",
                    }}
                >
                    + New Task
                </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {list.data?.map((task) => (
                    <TaskCard key={task.id} task={task} onEdit={(task) => handleOpenModal(task)} onDelete={() => remove.mutate({ id: task.id })} />
                ))}
            </div>

            <TaskModalForm
                isOpen={isOpen}
                onClose={handleClose}
                onSubmit={handleSubmit}
                task={editingTask}
            />
        </div>
    );
}
