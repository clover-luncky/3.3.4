<template>
  <div class="app-wrapper">
    <header>
      <AppNavigator msg="hello" />
    </header>
    <main>
      <RouterView />
    </main>
  </div>
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router'

import AppNavigator from '@/components/AppNavigator.vue'
</script>
<style scoped>
.app-wrapper {
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

main {
  height: calc(100% - 48px);
}
</style>
