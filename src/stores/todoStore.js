import { defineStore } from 'pinia'

const API_BASE = "https://yusak-todolist.yusakardianto19.workers.dev/api";

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todoList: []
  }),

  actions: {
    async fetchTodos() {
      const res = await fetch(`${API_BASE}/todos`);
      this.todoList = await res.json();
    },

    async addTodo(name) {
      await fetch(`${API_BASE}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });
      await this.fetchTodos();
    },

    async deleteTodo(id) {
      await fetch(`${API_BASE}/todos/${id}`, { method: 'DELETE' });
      await this.fetchTodos();
    },

    async toggleTodo(id) {
      await fetch(`${API_BASE}/todos/${id}/toggle`, { method: 'PUT' });
      await this.fetchTodos();
    }
  }
});

