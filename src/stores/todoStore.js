    import { defineStore } from 'pinia'

    export const useTodoStore = defineStore('todo', {
    state: () => ({
        todoList: [],
        loading: false
    }),

    getters: {
        showAll: (state) => state.todoList,
        doneOnly: (state) => state.todoList.filter(item => item.is_done),
        undoneOnly: (state) => state.todoList.filter(item => !item.is_done),
    },

    actions: {
        async fetchTodos() {
        this.loading = true
        try {
            const res = await fetch('/api/todos')
            this.todoList = await res.json()
        } catch (err) {
            console.error('Gagal mengambil todo:', err)
        } finally {
            this.loading = false
        }
        },

        async addTodo(name) {
        if (!name.trim()) return alert('Todo tidak boleh kosong!')
        if (this.todoList.find(item => item.name === name)) {
            alert('Todo sudah ada')
            return
        }

        try {
            await fetch('/api/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
            })
            await this.fetchTodos()
        } catch (err) {
            console.error('Gagal menambah todo:', err)
        }
        },

        async deleteTodo(name) {
        const item = this.todoList.find(t => t.name === name)
        if (!item) return

        try {
            await fetch(`/api/todos/${item.id}`, { method: 'DELETE' })
            this.todoList = this.todoList.filter(t => t.id !== item.id)
        } catch (err) {
            console.error('Gagal menghapus todo:', err)
        }
        },

        async setAsDone(name) {
        const item = this.todoList.find(t => t.name === name)
        if (!item) return

        try {
            await fetch(`/api/todos/${item.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: item.name, is_done: 1 })
            })
            item.is_done = 1
        } catch (err) {
            console.error('Gagal update ke selesai:', err)
        }
        },

        async setAsUnDone(name) {
        const item = this.todoList.find(t => t.name === name)
        if (!item) return

        try {
            await fetch(`/api/todos/${item.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: item.name, is_done: 0 })
            })
            item.is_done = 0
        } catch (err) {
            console.error('Gagal update ke belum selesai:', err)
        }
        }
    }
    })
