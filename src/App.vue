<script setup>
import { ref, onMounted } from 'vue'
import { useTodoStore } from '@/stores/todoStore'

const todoStore = useTodoStore()
const newTodo = ref('')

const tambah = async () => {
  await todoStore.addTodo(newTodo.value)
  newTodo.value = ''
}

onMounted(() => {
  todoStore.fetchTodos()
})
</script>

<template>
  <div class="container">
    <h1>Haii Yusak Ardianto!!</h1>

    <form @submit.prevent="tambah">
      <input type="text" v-model="newTodo" placeholder="Tambah todo baru..." />
      <button type="submit">Tambah</button>
    </form>

    <ul>
      <li v-for="todo in todoStore.showAll" :key="todo.id">
        <label>
          <input
            type="checkbox"
            :checked="todo.is_done"
            @change="todo.is_done ? todoStore.setAsUnDone(todo.name) : todoStore.setAsDone(todo.name)"
          />
          {{ todo.name }}
        </label>
        <button @click="todoStore.deleteTodo(todo.name)">❌</button>
      </li>
    </ul>
  </div>
</template>


  <style scoped>
    header {
      line-height: 1.5;
      max-height: 100vh;
    }

    .logo {
      display: block;
      margin: 0 auto 2rem;
    }

    nav {
      width: 100%;
      font-size: 12px;
      text-align: center;
      margin-top: 2rem;
    }

    nav a.router-link-exact-active {
      color: var(--color-text);
    }

    nav a.router-link-exact-active:hover {
      background-color: transparent;
    }

    nav a {
      display: inline-block;
      padding: 0 1rem;
      border-left: 1px solid var(--color-border);
    }

    nav a:first-of-type {
      border: 0;
    }

    @media (min-width: 1024px) {
      header {
        display: flex;
        place-items: center;
        padding-right: calc(var(--section-gap) / 2);
      }

      .logo {
        margin: 0 2rem 0 0;
      }

      header .wrapper {
        display: flex;
        place-items: flex-start;
        flex-wrap: wrap;
      }

      nav {
        text-align: left;
        margin-left: -1rem;
        font-size: 1rem;

        padding: 1rem 0;
        margin-top: 1rem;
      }
    }
  </style>
