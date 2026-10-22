import { z } from "zod"
import { publicProcedure, router } from "../trpc";
import Task from "../schemas/task";

type Task = z.infer<typeof Task>

const tasks: Task[] = [
    { id: crypto.randomUUID(), title: "Setup the project", description: "Initialize the monorepo with backend and frontend", createdAt: new Date().toISOString() },
    { id: crypto.randomUUID(), title: "Create the tRPC router", description: "Define procedures for the task entity", createdAt: new Date().toISOString() },
    { id: crypto.randomUUID(), title: "Build the frontend", description: "Connect the React app to the backend via tRPC", createdAt: new Date().toISOString() },
    { id: crypto.randomUUID(), title: "Add authentication", description: "Implement login and session management", createdAt: new Date().toISOString() },
    { id: crypto.randomUUID(), title: "Write unit tests", description: "Cover all tRPC procedures with tests", createdAt: new Date().toISOString() },
    { id: crypto.randomUUID(), title: "Setup CI/CD pipeline", description: "Automate build and deploy with GitHub Actions", createdAt: new Date().toISOString() },
    { id: crypto.randomUUID(), title: "Add database integration", description: "Replace in-memory storage with PostgreSQL", createdAt: new Date().toISOString() },
    { id: crypto.randomUUID(), title: "Implement pagination", description: "Add cursor-based pagination to the task list", createdAt: new Date().toISOString() },
    { id: crypto.randomUUID(), title: "Design the UI", description: "Create a consistent design system with tokens", createdAt: new Date().toISOString() },
    { id: crypto.randomUUID(), title: "Add dark mode", description: "Support system and manual dark mode toggle", createdAt: new Date().toISOString() },
    { id: crypto.randomUUID(), title: "Optimize bundle size", description: "Analyze and reduce JavaScript bundle", createdAt: new Date().toISOString() },
    { id: crypto.randomUUID(), title: "Add error boundaries", description: "Gracefully handle runtime errors in React", createdAt: new Date().toISOString() },
    { id: crypto.randomUUID(), title: "Implement search", description: "Filter tasks by title or description", createdAt: new Date().toISOString() },
    { id: crypto.randomUUID(), title: "Add task priorities", description: "Allow setting low, medium, or high priority", createdAt: new Date().toISOString() },
    { id: crypto.randomUUID(), title: "Write documentation", description: "Document all API procedures and frontend hooks", createdAt: new Date().toISOString() },
]

export const taskRouter = router({

    list: publicProcedure
        .input(z.object({
            limit: z.number().default(10),
            cursor: z.string().nullish()
        }))
        .query(({ input }) => {

            const { limit, cursor } = input

            const startIndex = cursor
                ? tasks.findIndex(task => task.id === cursor) + 1
                : 0

            const slice = tasks.slice(startIndex, startIndex + limit)
            const nextCursor = slice.length === limit ? slice[slice.length - 1].id : null

            return {tasks: slice, nextCursor}
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
