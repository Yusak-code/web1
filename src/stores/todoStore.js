import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todoList: []
  }),

  actions: {
    async fetchTodos() {
      const res = await fetch('https://<worker-url>/api/todos')
      this.todoList = await res.json()
    },

    async addTodo(name: string) {
      await fetch('https://<worker-url>/api/todos', {
        method: 'POST',
        body: JSON.stringify({ name }),
        headers: { 'Content-Type': 'application/json' }
      })
      await this.fetchTodos()
    }
  }
})
