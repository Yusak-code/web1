export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const method = request.method;

    // Routing API
    if (url.pathname === "/api/todos" && method === "GET") {
      return handleGetTodos(env);
    }
    if (url.pathname === "/api/todos" && method === "POST") {
      return handleAddTodo(request, env);
    }
    if (url.pathname.match(/^\/api\/todos\/(\d+)$/) && method === "DELETE") {
      const id = url.pathname.split("/").pop();
      return handleDeleteTodo(id, env);
    }
    if (url.pathname.match(/^\/api\/todos\/(\d+)\/toggle$/) && method === "PUT") {
      const id = url.pathname.split("/")[3];
      return handleToggleTodo(id, env);
    }

    return new Response("Not Found", { status: 404 });
  }
};

async function handleGetTodos(env) {
  const { results } = await env.DB.prepare("SELECT * FROM todos").all();
  return Response.json(results);
}

async function handleAddTodo(request, env) {
  const { name } = await request.json();
  if (!name) return new Response("Missing name", { status: 400 });

  await env.DB.prepare("INSERT INTO todos (name, isDone) VALUES (?, ?) ")
    .bind(name, false)
    .run();

  return new Response("Created", { status: 201 });
}

async function handleDeleteTodo(id, env) {
  await env.DB.prepare("DELETE FROM todos WHERE id = ?")
    .bind(id)
    .run();

  return new Response("Deleted", { status: 200 });
}

async function handleToggleTodo(id, env) {
  const { results } = await env.DB.prepare("SELECT isDone FROM todos WHERE id = ?")
    .bind(id)
    .all();

  if (!results.length) return new Response("Todo not found", { status: 404 });

  const current = results[0].isDone;
  await env.DB.prepare("UPDATE todos SET isDone = ? WHERE id = ?")
    .bind(!current, id)
    .run();

  return new Response("Toggled", { status: 200 });
}
