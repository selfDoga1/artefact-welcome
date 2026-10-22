'use client'
import { useState } from "react"
import toast from "react-hot-toast"
import useModal from "./useModal"
import useTaskService from "./useTaskService"
import TaskSchema from "@backend/server/schemas/task"
import { z } from "zod"

type Task = z.infer<typeof TaskSchema>
type FirstPage = { tasks: Task[], nextCursor: string | null }

const useTaskActions = (initialTasks?: FirstPage) => {
    const { isOpen, open, close } = useModal()
    const [taskId, setTaskId] = useState<string | null>(null)
    const [editingTask, setEditingTask] = useState<Task | null>(null)
    const { list, create, update, remove } = useTaskService(initialTasks)

    const { fetchNextPage, hasNextPage, isFetchingNextPage } = list


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

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const form = e.currentTarget
        const title = (form.elements.namedItem("title") as HTMLInputElement).value
        const description = (form.elements.namedItem("description") as HTMLTextAreaElement).value

        if (taskId) {
            update.mutate(
                { id: taskId, title, description, },
                {
                    onSuccess: () => { handleClose(); toast.success("Task updated!") },
                    onError: (error) => toast.error(error.message),
                },
            )
        } else {
            create.mutate(
                { title, description },
                {
                    onSuccess: () => { handleClose(); toast.success("Task created!") },
                    onError: (error) => toast.error(error.message),
                },
            )
        }
    }

    function handleDelete(id: string) {
        remove.mutate(
            { id },
            {
                onSuccess: () => toast.success("Task deleted!"),
                onError: (error) => toast.error(error.message),
            },
        )
    }

    const isPending = create.isPending || update.isPending || remove.isPending

    return {
        tasks: list.data?.pages.flatMap(page => page.tasks) ?? [],
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        list,
        isOpen,
        isPending,
        editingTask,
        handleOpenModal,
        handleClose,
        handleSubmit,
        handleDelete,
    }
}

export default useTaskActions
