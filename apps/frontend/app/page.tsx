import { trpcServer } from "@/lib/trpc/server"
import TasksClient from "./components/TasksClient"

export default async function Home() {

    const tasks = await trpcServer.tasks.list({limit: 10, cursor: null})

    return (
        <main>
            <TasksClient initialTasks={tasks} />
        </main>
    )
}
