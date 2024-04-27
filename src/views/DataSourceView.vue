<template>
  <div>
    <h1>dataSource {{ store.count  }}----{{ store.double }}</h1>
    <button @click="store.increment">+</button>
    <button @click="store.decrement">-</button>
  </div>
</template>
<script setup lang="ts">
import {useCounterStore} from '@/stores/counter'
const store = useCounterStore()
</script>
  