export async function onRequest(context) {
const { request, env } = context
const url = new URL(request.url)
const pathname = url.pathname

if (pathname === '/api/todos' && request.method === 'GET') {
    const { results } = await env.DB.prepare('SELECT name, isDone FROM todos').all()
    return Response.json(results)
}

if (pathname === '/api/todos' && request.method === 'POST') {
    const { name } = await request.json()
    await env.DB.prepare('INSERT INTO todos (name, isDone) VALUES (?, 0)').bind(name).run()
    return Response.json({ name, isDone: false })
}

if (pathname.startsWith('/api/todos/') && request.method === 'DELETE') {
    const name = decodeURIComponent(pathname.split('/').pop())
    await env.DB.prepare('DELETE FROM todos WHERE name = ?').bind(name).run()
    return new Response('Deleted', { status: 200 })
}

if (pathname.startsWith('/api/todos/') && request.method === 'PUT') {
    const name = decodeURIComponent(pathname.split('/').pop())
    const { isDone } = await request.json()
    await env.DB.prepare('UPDATE todos SET isDone = ? WHERE name = ?').bind(isDone ? 1 : 0, name).run()
    return new Response('Updated', { status: 200 })
}

return new Response('Not Found', { status: 404 })
}
