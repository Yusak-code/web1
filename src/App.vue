<template>
  <div class="todo-app">
    <h1>Haii Yusak Ardianto!!</h1>
    <form @submit.prevent="add">
      <input type="text" v-model="newTodo" placeholder="Tambahkan todo baru..." />
      <button type="submit">Tambah</button>
    </form>

    <div>
      <button @click="filter = 'all'">Show All</button>
      <button @click="filter = 'done'">Done Only</button>
      <button @click="filter = 'undone'">Undone Only</button>
    </div>

    <ul>
      <li v-for="item in filtered" :key="item.id">
        <span :style="{ textDecoration: item.isDone ? 'line-through' : 'none' }">
          {{ item.name }}
        </span>
        <button v-if="!item.isDone" @click="todoStore.setAsDone(item.id)">Set as done</button>
        <button v-if="item.isDone" @click="todoStore.setAsUnDone(item.id)">Set as undone</button>
        <button @click="todoStore.deleteTodo(item.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useTodoStore } from '@/stores/todoStore'

const todoStore = useTodoStore()
const newTodo = ref('')
const filter = ref('all')

onMounted(() => {
  todoStore.fetchTodos()
})

function add() {
  if (newTodo.value.trim() !== '') {
    todoStore.addTodo(newTodo.value.trim())
    newTodo.value = ''
  }
}

const filtered = computed(() => {
  if (filter.value === 'done') return todoStore.doneOnly
  if (filter.value === 'undone') return todoStore.undoneOnly
  return todoStore.showAll
})
</script>

<style scoped>
.todo-app {
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
  padding: 20px;
}
.form {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}
.input {
  padding: 10px;
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.add-btn {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.title {
  margin-bottom: 10px;
  font-weight: bold;
}
.filter-buttons button {
  margin: 0 5px;
  padding: 8px 16px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid black;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
}
.todo-actions button {
  margin-left: 5px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.done-btn {
  background-color: #28a745;
  color: white;
}
.undone-btn {
  background-color: #ffc107;
  color: black;
}
.delete-btn {
  background-color: #dc3545;
  color: white;
}
</style>
