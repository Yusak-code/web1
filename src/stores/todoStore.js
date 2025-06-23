import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todoList: []
  }),
  actions: {
    async fetchTodos() {
      const res = await fetch('/api/todos');
      if (res.ok) {
        this.todoList = await res.json();
      }
    },

    async addTodo(name) {
      const exists = this.todoList.some(item => item.name === name);
      if (exists) {
        alert('Todo already exists');
        return;
      }
      const res = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });
      if (res.ok) {
        await this.fetchTodos();
      }
    },

    async deleteTodo(id) {
      const res = await fetch(`/api/todos/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        this.todoList = this.todoList.filter(item => item.id !== id);
      }
    },

    async toggleTodo(id) {
      const res = await fetch(`/api/todos/${id}/toggle`, {
        method: 'PUT'
      });
      if (res.ok) {
        this.todoList = this.todoList.map(item =>
          item.id === id ? { ...item, isDone: !item.isDone } : item
        );
      }
    }
  },
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
  }
});
