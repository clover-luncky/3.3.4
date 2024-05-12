<template>
  <div class="ds-wrapper">
      <DataSourceLeftPanel />
  </div>
  </template>
  
  <script setup lang='ts'>
  import DataSourceLeftPanel from '@/components/DataSourceLeftPanel.vue'
  </script>
  
  <style scoped>
  .ds-wrapper {
    display: flex;
    height: 100%;
  }
  </style>