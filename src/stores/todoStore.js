import { defineStore } from 'pinia';

const API_BASE = 'https://yusak-todolist.yusakardianto19.workers.dev/api';

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todoList: []
  }),

  getters: {
    showAll(state) {
      return state.todoList;
    },
    doneOnly(state) {
      return state.todoList.filter(item => item.isDone);
    },
    undoneOnly(state) {
      return state.todoList.filter(item => !item.isDone);
    }
  },

  actions: {
    async fetchTodos() {
      const res = await fetch(`${API_BASE}/todos`);
      this.todoList = await res.json();
    },

    async addTodo(name) {
      const exists = this.todoList.some(item => item.name === name);
      if (exists) {
        alert('Todo sudah ada');
        return;
      }

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
