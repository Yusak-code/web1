<template>
    <h1>test halaman todo list</h1>

    <form @submit.prevent="todoStore.addTodo(newTodo)">
        <input type="text" v-model="newTodo" placeholder="add new todo...">
        <input type="submit" value="Add">
    </form>

    <div style="width: 500px; padding-inline-start: 40px;">
        <h3 style="text-align: center;">My To Do List</h3>
    </div>

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
    form {
        width: 500px;
        padding-inline-start: 40px;
        margin-bottom: 40px;
    }
    form input {
        padding: 10px;
    }
    form input:first-child {
        width: 80%;
        margin: 0px 10px;
    }

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
    },
    data() {
        return {
            newTodo: ''
        }
    }
}
</script>