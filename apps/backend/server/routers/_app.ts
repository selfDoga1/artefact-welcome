import { z } from 'zod'
import { router, publicProcedure } from '../trpc'
import { taskRouter } from './task'

export const appRouter = router({
  tasks: taskRouter
})

export type AppRouter = typeof appRouter
