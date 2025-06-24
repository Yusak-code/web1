import { Hono } from 'hono'

const app = new Hono()

app.get('/api', (c) => c.text('API OK'))

app.get('/api/todos', async (c) => {
  const { results } = await c.env.DB.prepare('SELECT * FROM todos').all()
  return c.json(results)
})

app.post('/api/todos', async (c) => {
  const input = await c.req.json()
  const result = await c.env.DB.prepare('INSERT INTO todos (name, is_done) VALUES (?, ?)').bind(input.name, 0).run()
  return c.json({ success: true, id: result.lastRowId })
})

app.put('/api/todos/:id', async (c) => {
  const id = c.req.param('id')
  const input = await c.req.json()
  await c.env.DB.prepare('UPDATE todos SET name = ?, is_done = ? WHERE id = ?')
    .bind(input.name, input.is_done, id).run()
  return c.json({ success: true })
})

app.delete('/api/todos/:id', async (c) => {
  const id = c.req.param('id')
  await c.env.DB.prepare('DELETE FROM todos WHERE id = ?').bind(id).run()
  return c.json({ success: true })
})

export default app
