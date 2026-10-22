'use client'
import { trpc } from "@/lib/trpc/client"
import TaskSchema from "@backend/server/schemas/task"
import { z } from "zod"

type Task = z.infer<typeof TaskSchema>

const useTaskService = () => {
    const utils = trpc.useUtils()

    const list = trpc.tasks.list.useQuery()

    const create = trpc.tasks.create.useMutation({
        onSuccess: () => utils.tasks.list.invalidate()
    })

    const update = trpc.tasks.update.useMutation({
        onSuccess: () => utils.tasks.list.invalidate()
    })

    const remove = trpc.tasks.remove.useMutation({
        onSuccess: () => utils.tasks.list.invalidate()
    })

    return {
        list,
        create,
        update,
        remove
    }
}

export default useTaskService
