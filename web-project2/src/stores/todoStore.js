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
        
    },
    actions: {
        setAsDone(index) {
            this.todoList[index].isDone = true
         },
        setAsUnDone(index) {
            this.todoList[index].isDone = false
         },
    },
})