import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', {
    state: () => ({ 
        todoList : [
            { name : 'Belajar HTML', isDone: false},
            { name : 'Belajar CSS', isDone: false},
            { name : 'Belajar JavaScript', isDone: false},
            { name : 'Belajar PHP', isDone: false},
        ]
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
        deleteTodo(name) {
        this.todoList = this.todoList.filter(item => item.name !== name);
        },
        setAsDone(name) {
            this.todoList.find(item => item.name == name).isDone = true
        },
        setAsUnDone(name) {
            this.todoList.find(item => item.name == name).isDone = false
        },
        addTodo(data){

            let exsist = this.todoList.filter(item => item.name == data).length

            if(exsist) {
                alert('new todo is exsisted in data')
                return
            }
            this.todoList.push(
                { name: data, isDone: false }
            )
        }
    },
})