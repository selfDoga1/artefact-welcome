import { trpcServer } from "@/lib/trpc/server"
import TasksClient from "./components/TasksClient"

export default async function Home() {

    const tasks = await trpcServer.tasks.list()

    return (
        <main>
            <TasksClient initialTasks={tasks} />
        </main>
    )
}
