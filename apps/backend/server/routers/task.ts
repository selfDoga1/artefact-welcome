import { z } from "zod"
import { publicProcedure, router } from "../trpc";
import Task from "../schemas/task";
import { create } from "domain";

type Task = z.infer<typeof Task>

const tasks: Task[] = []

export const taskRouter = router({

    list: publicProcedure.query(() => {
        return tasks
    }),

    detail: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(({ input }) => {
            return tasks.find(task => task.id === input.id) ?? null
        }),

    create: publicProcedure
        .input(z.object({
            title: z.string(),
            description: z.string().optional()
        }))
        .mutation(({ input }) => {
            const task = {id: crypto.randomUUID(), ...input, createdAt: new Date().toISOString()}
            tasks.push(task)
            return task
        }),

    update: publicProcedure
        .input(z.object({
            id: z.string(),
            title: z.string(),
            description: z.string().optional()
        }))
        .mutation(({ input }) => {
            const task = tasks.find(task => task.id === input.id)
            if (!task) throw new Error("Task not found")
            Object.assign(task, input)
            return task
        }),

    delete: publicProcedure
        .input(z.object({ id: z.string() }))
        .mutation(({ input }) => {
            const index = tasks.findIndex(task => task.id === input.id)
            if (index === -1) throw new Error('User not found')
            tasks.splice(index, 1)
            return {success: true}
        })

})
