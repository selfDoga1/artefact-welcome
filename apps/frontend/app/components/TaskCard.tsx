"use client";
import TaskSchema from "@backend/server/schemas/task";
import { z } from "zod";

type Task = z.infer<typeof TaskSchema>;

const buttonStyle = {
    padding: "4px 10px",
    borderRadius: 6,
    border: "1px solid #e5e7eb",
    fontSize: 12,
    cursor: "pointer",
    background: "white",
}

export default function TaskCard({ task, onEdit, onDelete, isPending }: { task: Task, onEdit: (task: Task) => void, onDelete: () => void, isPending?: boolean }) {
    return (
        <div
            style={{
                border: "1px solid #e5e7eb",
                borderRadius: 8,
                padding: 16,
                display: "flex",
                flexDirection: "column",
                gap: 8,
            }}
        >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: "#111827" }}>
                    {task.title}
                </h3>
                <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => onEdit(task)} style={{ ...buttonStyle, color: "#2563eb" }}>Edit</button>
                    <button onClick={onDelete} disabled={isPending} style={{ ...buttonStyle, color: "#dc2626", opacity: isPending ? 0.6 : 1, cursor: isPending ? "not-allowed" : "pointer" }}>Delete</button>
                </div>
            </div>

            {task.description && (
                <p style={{ fontSize: 14, color: "#6b7280" }}>
                    {task.description}
                </p>
            )}

            <span style={{ fontSize: 12, color: "#9ca3af" }}>
                {new Date(task.createdAt).toLocaleDateString()}
            </span>
        </div>
    );
}
