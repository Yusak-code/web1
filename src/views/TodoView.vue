<template>
    <h1 style="text-align: center; width: 500px; inset-inline-start: 40px;">
        Haii Yusak Ardianto!!
    </h1>

    <form @submit.prevent="todoStore.addTodo(newTodo)">
        <input type="text" v-model="newTodo" placeholder="add new todo...">
        <input type="submit" value="Add">
    </form>

    <div style="width: 500px; padding-inline-start: 10px;">
        <h3 style="text-align: center;">My To Do List</h3>
    </div>
    
    <div class="getters-button">
        <button @click="show= 'all'">Show All</button>
        <button @click="show= 'done only'">Done Only</button>
        <button @click="show= 'undone only'">Undone Only</button>
    </div>
    

    <!-- show all todoList -->
    <div v-if="show=='all'">
        <ul>
            <li v-for="(list) in todoStore.todoList">
                <span>
                    {{ list.name }}
                </span>
                <span>
                    <button v-if="!list.isDone" @click="todoStore.setAsDone(list.name)">set as done</button>
                    <button v-if="list.isDone" @click="todoStore.setAsUnDone(list.name)">set as undone</button>
                </span>
            </li>
        </ul>
    </div>

    <!-- show done todoList -->
    <div v-if="show=='done only'">
        <ul>
            <li v-for="(list) in todoStore.doneOnly">
                <span>
                    {{ list.name }}
                </span>
                <span>
                    <button v-if="!list.isDone" @click="todoStore.setAsDone(list.name)">set as done</button>
                    <button v-if="list.isDone" @click="todoStore.setAsUnDone(list.name)">set as undone</button>
                </span>
            </li>
        </ul>
    </div>

<!-- show undone only todoList -->
    <div v-if="show=='undone only'">
        <ul>
            <li v-for="(list) in todoStore.undoneOnly">
                <span>
                    {{ list.name }}
                </span>
                <span>
                    <button v-if="!list.isDone" @click="todoStore.setAsDone(list.name)">set as done</button>
                    <button v-if="list.isDone" @click="todoStore.setAsUnDone(list.name)">set as undone</button>

                </span>
            </li>
        </ul>
    </div>
</template>

<style scoped>
    li {
    transition: transform 0.2s ease, box-shadow 0.3s;
    }

    li:hover {
    transform: scale(1.01);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    * {
    box-sizing: border-box;
    }

    h1, h3 {
    text-align: center;
    color: #333;
    }

    form {
    width: 500px;
    padding-inline-start: 40px;
    margin-bottom: 40px;
    display: flex;
    gap: 10px;
    }

    form input[type="text"] {
    padding: 10px;
    width: 80%;
    border: 1px solid #ccc;
    border-radius: 6px;
    }

    form input[type="submit"] {
    padding: 10px 20px;
    background-color: #007bff;
    border: none;
    color: white;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.3s;
    }

    form input[type="submit"]:hover {
    background-color: #0056b3;
    }

    ul {
    list-style: none;
    width: 500px;
    padding-inline-start: 40px;
    padding: 0;
    }

    li {
    border: 1px solid #ddd;
    border-left: 6px solid #ccc;
    margin: 10px 0;
    padding: 12px 20px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 8px;
    transition: box-shadow 0.3s;
    }

    li:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    li.done {
    border-left-color: #28a745;
    background-color: #e9f7ef;
    }

    li.undone {
    border-left-color: #6c757d;
    }

    li span:first-child {
    flex: 1;
    font-weight: 500;
    color: #333;
    }

    li button {
    padding: 6px 12px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    margin-left: 10px;
    transition: background 0.3s;
    }

    li button:first-of-type {
    background-color: #28a745;
    color: white;
    }

    li button:first-of-type:hover {
    background-color: #218838;
    }

    li button:last-of-type {
    background-color: #ffc107;
    color: black;
    }

    li button:last-of-type:hover {
    background-color: #e0a800;
    }

    .getters-button {
    display: flex;
    justify-content: center;
    gap: 10px;
    width: 500px;
    padding-inline-start: 40px;
    margin-bottom: 20px;
    }

    .getters-button button {
    padding: 8px 16px;
    border: none;
    border-radius: 6px;
    background-color: #6c757d;
    color: white;
    cursor: pointer;
    transition: background 0.3s;
    }

    .getters-button button:hover {
    background-color: #5a6268;
    }
    * {
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
    }


    form {
        width: 500px;
        padding-inline-start: 10px;
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

    .getters-button {
        display: flex;
        justify-content: center;
        gap: 10px;
        width: 500px; padding-inline-start: 10px;
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
                newTodo: '',
                show: 'all'
            }
        }
    }
</script>