"use client"
import useTaskActions from "../hooks/useTaskActions"
import TaskModalForm from "./TaskModalForm"
import TaskCard from "./TaskCard"
import TaskSchema from "@backend/server/schemas/task";
import { z } from "zod";

type Task = z.infer<typeof TaskSchema>;

export default function TasksClient({initialTasks} : {initialTasks: Task[]}) {
    const { list, isOpen, editingTask, handleOpenModal, handleClose, handleSubmit, handleDelete, isPending} = useTaskActions(initialTasks)

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
                {list.data?.length === 0 && (
                    <p style={{ color: "#9ca3af", fontSize: 14, textAlign: "center", padding: "40px 0" }}>No tasks yet. Create one!</p>
                )}
                {list.data?.map((task) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onEdit={(task) => handleOpenModal(task)}
                        onDelete={() => handleDelete(task.id)}
                        isPending={isPending}
                    />
                ))}
            </div>

            <TaskModalForm
                isOpen={isOpen}
                onClose={handleClose}
                onSubmit={handleSubmit}
                task={editingTask}
                isPending={isPending}
            />
        </div>
    )
}
