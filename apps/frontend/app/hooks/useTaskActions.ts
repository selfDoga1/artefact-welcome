'use client'
import { useState } from "react"
import toast from "react-hot-toast"
import useModal from "./useModal"
import useTaskService from "./useTaskService"
import TaskSchema from "@backend/server/schemas/task"
import { z } from "zod"

type Task = z.infer<typeof TaskSchema>
type FirstPage = { tasks: Task[], nextCursor: string | null }

// lógica de UI das tarefas: conecta o serviço tRPC com o estado do modal e os toasts
const useTaskActions = (initialTasks?: FirstPage) => {
    const { isOpen, open, close } = useModal()
    const [editingTask, setEditingTask] = useState<Task | null>(null)
    const { list, create, update, remove } = useTaskService(initialTasks)
    
    // taskId controla se o formulário está em modo edição ou criação
    const [taskId, setTaskId] = useState<string | null>(null)
    
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

    // o mesmo formulário serve para criar e editar: taskId decide qual mutação chamar
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

    // trava botões e inputs enquanto qualquer mutação estiver em andamento
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
