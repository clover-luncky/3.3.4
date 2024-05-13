<template>
  <div class="data-source-content-wrapper">
    <div class="data-source-render">
      <r-dataSource />
      <!-- <ReactDataSource /> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { applyPureReactInVue } from 'veaury'

// @ts-ignore
import ReactDataSource from './react_app/ReactDataSource'
const RDataSource = applyPureReactInVue(ReactDataSource)
</script>

<style scoped>
.data-source-content-wrapper {
  width: 100%;
  background-color: var(--color-gray-100);
}

.data-source-render {
  height: calc(100% - 40px);
  margin: 20px;
  padding: 12px;
  background-color: var(--color-white);
  border-radius: 8px;
  overflow: hidden;
}
</style>
