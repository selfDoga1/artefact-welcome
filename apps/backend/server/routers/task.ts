import { z } from "zod"
import { publicProcedure, router } from "../trpc";
import Task from "../schemas/task";

type Task = z.infer<typeof Task>

const tasks: Task[] = [
    { id: crypto.randomUUID(), title: "Setup the project", description: "Initialize the monorepo with backend and frontend", createdAt: new Date().toISOString() },
    { id: crypto.randomUUID(), title: "Create the tRPC router", description: "Define procedures for the task entity", createdAt: new Date().toISOString() },
    { id: crypto.randomUUID(), title: "Build the frontend", description: "Connect the React app to the backend via tRPC", createdAt: new Date().toISOString() },
]

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

            if (!input.title) throw new Error("Task title is missing")

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

    remove: publicProcedure
        .input(z.object({ id: z.string() }))
        .mutation(({ input }) => {
            const index = tasks.findIndex(task => task.id === input.id)
            if (index === -1) throw new Error('Task not found')
            tasks.splice(index, 1)
            return {success: true}
        })

})
