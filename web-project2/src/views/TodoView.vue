<template>
    <h1>test halaman todo list</h1>
    {{ todoStore }}
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