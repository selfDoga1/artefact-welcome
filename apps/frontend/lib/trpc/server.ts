import { createCallerFactory } from '@backend/server/trpc'
import { appRouter } from '@backend/server/routers/_app'

const createCaller = createCallerFactory(appRouter)

export const trpcServer = createCaller({})
