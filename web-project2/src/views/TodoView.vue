<template>
    <h1>test halaman todo list</h1>

    <ul>
        <li v-for="list in todoStore.todoList">
            {{ list.name }}

        </li>
    </ul>
</template>

<script>
import {useTodoStore} from '../stores/todoStore'

export default {
    setup() {
        const todoStore = useTodoStore()

        return { todoStore }
    }
}
</script>