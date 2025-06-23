<template>
    <div class="header">
        <h1>
            Haii Yusak Ardianto!!
        </h1>
    </div>

    <form @submit.prevent="todoStore.addTodo(newTodo)">
        <input type="text" v-model="newTodo" placeholder="add new todo...">
        <input type="submit" value="Add">
    </form>

    <div class="list-title">
        <h3>
            My To Do List
        </h3>
    </div>
    
    <div class="getters-button">
        <button @click="show= 'all'">Show All</button>
        <button @click="show= 'done only'">Done Only</button>
        <button @click="show= 'undone only'">Undone Only</button>
    </div>
    
    <li
    v-for="list in todoStore.todoList.filter(todo =>
    show === 'all' ||
    (show === 'done only' && todo.isDone) ||
    (show === 'undone only' && !todo.isDone)
    )"
    :key="list.name"
    :class="list.isDone ? 'done' : 'undone'">
        <span>{{ list.name }}</span>
        <span>
            <button v-if="!list.isDone" @click="todoStore.setAsDone(list.name)">Set as done</button>
            <button v-if="list.isDone" @click="todoStore.setAsUnDone(list.name)">Set as undone</button>
            <button @click="todoStore.deleteTodo(list.name)" style="background-color: #dc3545; color: white;">Delete</button>
        </span>
    </li>

</template>

<style scoped>
    .header {
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 20px 0;
    }

    h1 {
    font-size: 24px;
    color: #333;
    }

    .list-title {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    }

    .getters-button {
    display: flex;
    justify-content: center;
    flex-wrap: wrap; 
    gap: 10px;
    margin: 10px auto 30px auto;
    max-width: 500px;
    }

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

    form input {
        padding: 10px;
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

    form {
    width: 500px;
    margin: 20px auto;
    display: flex;
    gap: 10px;
    justify-content: center;
    }

    form input[type="text"] {
    flex: 1;
    padding: 10px;
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