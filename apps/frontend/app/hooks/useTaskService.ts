'use client'
import { trpc } from "@/lib/trpc/client"
import TaskSchema from "@backend/server/schemas/task"
import { z } from "zod"

type Task = z.infer<typeof TaskSchema>
type FirstPage = { tasks: Task[], nextCursor: string | null }

// camada de dados: só chama o tRPC, sem lógica de UI
const useTaskService = (initialTasks?: FirstPage) => {
    const utils = trpc.useUtils()

    // useInfiniteQuery acumula páginas em vez de substituir a anterior
    const list = trpc.tasks.list.useInfiniteQuery(
        { limit: 10 },
        {
            getNextPageParam: (lastPage) => lastPage.nextCursor,
            // placeholderData exibe os dados do SSR enquanto a primeira requisição não volta
            placeholderData: initialTasks
                ? { pages: [initialTasks], pageParams: [null] }
                : undefined,
        }
    )

    // qualquer mutação bem-sucedida invalida o cache da lista para refletir a mudança
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
