import { defineStore } from 'pinia'
import { computed,ref } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)

  const double = computed(() => count.value * 2)
  const increment = () => {
    count.value++
  }

  const decrement = () => {
    count.value--
  }

  return {
    count,
    double,
    increment,
    decrement
  }
})
