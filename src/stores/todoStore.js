import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todoList: []
  }),
  getters: {
    showAll(state) {
      return state.todoList
    },
    doneOnly(state) {
      return state.todoList.filter(item => item.isDone)
    },
    undoneOnly(state) {
      return state.todoList.filter(item => !item.isDone)
    }
  },
  actions: {
    async fetchTodos() {
      const res = await fetch('https://yusak-todolist.yusakardianto19.workers.dev/api/todos');
      const data = await res.json();
      this.todoList = data.map(item => ({
        id: item.id,
        name: item.name,
        isDone: item.is_done === 1
      }));
    },

    async addTodo(name) {
      const exist = this.todoList.some(item => item.name === name);
      if (exist) {
        alert('Todo already exists');
        return;
      }

      const res = await fetch('https://yusak-todolist.yusakardianto19.workers.dev/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });
      const result = await res.json();

      this.todoList.push({ id: result.id, name, isDone: false });
    },

    async deleteTodo(id) {
      await fetch(`https://yusak-todolist.yusakardianto19.workers.dev/api/todos/${id}`, {
        method: 'DELETE'
      });
      this.todoList = this.todoList.filter(item => item.id !== id);
    },

    async setAsDone(id) {
      const todo = this.todoList.find(item => item.id === id);
      if (todo) {
        todo.isDone = true;
        await fetch(`https://yusak-todolist.yusakardianto19.workers.dev/api/todos/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: todo.name, is_done: 1 })
        });
      }
    },

    async setAsUnDone(id) {
      const todo = this.todoList.find(item => item.id === id);
      if (todo) {
        todo.isDone = false;
        await fetch(`https://yusak-todolist.yusakardianto19.workers.dev/api/todos/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: todo.name, is_done: 0 })
        });
      }
    }
  }
});
