import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter } from '@/server/routers/_app'

const corsHeaders = {
    'Access-Control-Allow-Origin': 'http://localhost:3001',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
}

export function OPTIONS() {
    return new Response(null, { status: 204, headers: corsHeaders })
}

const handler = async (req: Request) => {
    const response = await fetchRequestHandler({
        endpoint: '/api/trpc',
        req,
        router: appRouter,
        createContext: () => ({}),
    })

    Object.entries(corsHeaders).forEach(([key, value]) => {
        response.headers.set(key, value)
    })

    return response
}

export { handler as GET, handler as POST }
