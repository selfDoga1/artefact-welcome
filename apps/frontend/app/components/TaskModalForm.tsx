'use client'
import Modal from "react-modal"
import TaskSchema from "@backend/server/schemas/task"
import { z } from "zod"

type Task = z.infer<typeof TaskSchema>

function TaskModalForm({ isOpen, onClose, onSubmit, task }: {
    isOpen: boolean,
    onClose: () => void,
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
    task?: Task | null,
}) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            appElement={typeof window !== "undefined" ? document.body : undefined}
            style={{
                overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                },
                content: {
                    top: "50%",
                    left: "50%",
                    right: "auto",
                    bottom: "auto",
                    transform: "translate(-50%, -50%)",
                    width: "100%",
                    maxWidth: 480,
                    borderRadius: 8,
                    padding: 24,
                    border: "1px solid #e5e7eb",
                },
            }}
        >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <h2 style={{ fontSize: 18, fontWeight: 600 }}>{task ? "Edit Task" : "New Task"}</h2>
                <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, color: "#6b7280" }}>✕</button>
            </div>

            <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>

                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <label htmlFor="title" style={{ fontSize: 14, fontWeight: 500, color: "#374151" }}>Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        // required
                        placeholder="Task title"
                        defaultValue={task?.title ?? ""}
                        key={task?.id ?? "new"}
                        style={{ padding: "8px 12px", borderRadius: 6, border: "1px solid #d1d5db", fontSize: 14, outline: "none" }}
                    />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <label htmlFor="description" style={{ fontSize: 14, fontWeight: 500, color: "#374151" }}>Description</label>
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Task description"
                        rows={4}
                        defaultValue={task?.description ?? ""}
                        key={task?.id ? `${task.id}-desc` : "new-desc"}
                        style={{ padding: "8px 12px", borderRadius: 6, border: "1px solid #d1d5db", fontSize: 14, outline: "none", resize: "vertical" }}
                    />
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 4 }}>
                    <button
                        type="button"
                        onClick={onClose}
                        style={{ padding: "8px 16px", borderRadius: 6, border: "1px solid #d1d5db", background: "white", fontSize: 14, cursor: "pointer", color: "#374151" }}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        style={{ padding: "8px 16px", borderRadius: 6, border: "none", background: "#2563eb", color: "white", fontSize: 14, cursor: "pointer", fontWeight: 500 }}
                    >
                        {task ? "Update" : "Create"}
                    </button>
                </div>

            </form>
        </Modal>
    )
}

export default TaskModalForm
