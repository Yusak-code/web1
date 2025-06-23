<template>
    <div class="header">
        <h1>Haii Yusak Ardianto!!</h1>
    </div>

    <form @submit.prevent="todoStore.addTodo(newTodo)">
        <input type="text" v-model="newTodo" placeholder="add new todo...">
        <input type="submit" value="Add">
    </form>

    <div class="list-title">
        <h3>My To Do List</h3>
    </div>

    <div class="getters-button">
        <button @click="show = 'all'">Show All</button>
        <button @click="show = 'done only'">Done Only</button>
        <button @click="show = 'undone only'">Undone Only</button>
    </div>

    <li
        v-for="list in filteredTodos"
        :key="list.id"
        :class="list.isDone ? 'done' : 'undone'">
        <span>{{ list.name }}</span>
        <span>
        <button @click="todoStore.toggleTodo(list.id)">
            {{ list.isDone ? 'Set as undone' : 'Set as done' }}
        </button>
        <button @click="todoStore.deleteTodo(list.id)" style="background-color: #dc3545; color: white;">Delete</button>
        </span>
    </li>
    </template>

    <script>
    import { onMounted, computed } from 'vue'
    import { useTodoStore } from '../stores/todoStore'

    export default {
    setup() {
        const todoStore = useTodoStore()

        onMounted(() => {
        todoStore.fetchTodos()
        })

        const filteredTodos = computed(() => {
        if (show.value === 'done only') return todoStore.doneOnly
        if (show.value === 'undone only') return todoStore.undoneOnly
        return todoStore.showAll
        })

        const show = ref('all')
        const newTodo = ref('')

        return {
        todoStore,
        newTodo,
        show,
        filteredTodos
        }
    }
    }
    </script>