<script setup lang="ts">
import AppNavigator from '@/components/AppNavigator.vue'
</script>

<template>
  <AppNavigator msg="hello"></AppNavigator>
  <RouterView />
</template>
<style scoped>
.tabs {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
}
 .active {
  background: pink;
 }
</style>