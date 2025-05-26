<template>
    <h1>test halaman todo list</h1>

    <ul>
        <li v-for="(list, index) in todoStore.todoList">
            <span>
                {{ list.name }}
            </span>
            <span>
                <button v-if="!list.isDone" @click="todoStore.setAsDone(index)">set as done</button>
                <button v-if="list.isDone" @click="todoStore.setAsUnDone(index)">set as undone</button>

            </span>
        </li>
    </ul>
</template>

<style scoped>

    ul {
        list-style: none;
        width: 500px;
    }

    li {
        border: solid 2px;
        margin: 10px;
        padding: 10px;
        display: flex;
        justify-content: space-between;
    }

</style>

<script>
import {useTodoStore} from '../stores/todoStore'

export default {
    setup() {
        const todoStore = useTodoStore()

        return { todoStore }
    }
}
</script>