export default {
    async fetch(request: Request, env: any, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const { pathname } = url;

    // GET: ambil semua to-do
    if (pathname === "/api/todos" && request.method === "GET") {
      const todos = await env.DB.prepare("SELECT * FROM todos ORDER BY id DESC").all();
        return Response.json(todos.results);
    }

    // POST: tambah to-do baru
    if (pathname === "/api/todos" && request.method === "POST") {
        const { name } = await request.json();
        if (!name) return new Response("Missing name", { status: 400 });
        await env.DB.prepare("INSERT INTO todos (name) VALUES (?)").bind(name).run();
        return new Response("Todo added", { status: 201 });
    }

    // DELETE: hapus to-do
    if (pathname.startsWith("/api/todos/") && request.method === "DELETE") {
        const id = pathname.split("/").pop();
        await env.DB.prepare("DELETE FROM todos WHERE id = ?").bind(id).run();
        return new Response("Todo deleted", { status: 200 });
    }

    // PUT: toggle isDone true/false
    if (pathname.startsWith("/api/todos/") && pathname.endsWith("/toggle") && request.method === "PUT") {
        const id = pathname.split("/")[3];
        const current = await env.DB.prepare("SELECT isDone FROM todos WHERE id = ?").bind(id).first();
        const newValue = !current?.isDone;
        await env.DB.prepare("UPDATE todos SET isDone = ? WHERE id = ?").bind(newValue, id).run();
        return new Response("Todo toggled", { status: 200 });
    }

    return new Response("Not Found", { status: 404 });
    },
};
