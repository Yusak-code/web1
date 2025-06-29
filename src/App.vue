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
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  margin-bottom: 10px;
}
button {
  margin-left: 5px;
}
</style>
