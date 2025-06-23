    import { defineStore } from 'pinia'

    export const useTodoStore = defineStore('todo', {
    state: () => ({
        todoList: []
    }),
    getters: {
        showAll: state => state.todoList,
        doneOnly: state => state.todoList.filter(t => t.isDone),
        undoneOnly: state => state.todoList.filter(t => !t.isDone)
    },
    actions: {
        async fetchTodos() {
        const res = await fetch('https://yusak-todolist.yusakardianto19.workers.dev/api/todos')
        this.todoList = await res.json()
        },
        async addTodo(name) {
        const exists = this.todoList.some(t => t.name === name)
        if (exists) {
            alert('Todo sudah ada.')
            return
        }
        const res = await fetch('https://yusak-todolist.yusakardianto19.workers.dev/api/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        })
        const newTodo = await res.json()
        this.todoList.push(newTodo)
        },
        async deleteTodo(name) {
        await fetch(`https://yusak-todolist.yusakardianto19.workers.dev/api/todos/${encodeURIComponent(name)}`, {
            method: 'DELETE'
        })
        this.todoList = this.todoList.filter(t => t.name !== name)
        },
        async setAsDone(name) {
        await fetch(`https://yusak-todolist.yusakardianto19.workers.dev/api/todos/${encodeURIComponent(name)}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ isDone: true })
        })
        const todo = this.todoList.find(t => t.name === name)
        if (todo) todo.isDone = true
        },
        async setAsUnDone(name) {
        await fetch(`https://yusak-todolist.yusakardianto19.workers.dev/api/todos/${encodeURIComponent(name)}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ isDone: false })
        })
        const todo = this.todoList.find(t => t.name === name)
        if (todo) todo.isDone = false
        }
    }
    })
