import * as z from "zod"

const Task = z.object({
    id: z.uuid(),
    title: z.string(),
    description: z.string().optional(),
    createdAt: z.iso.datetime()
})

export default Task