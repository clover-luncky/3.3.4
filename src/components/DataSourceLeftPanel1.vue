<template>
  <div class="ds-left-panel-wrapper">
    <div class="ds-left-panel-content">
      <router-link
        v-for="item in dataLists"
        :key="item.id"
        :class="['ds-item', activeLink.includes(item.id) && 'active']"
        :to="`/app/dataSource/${item.id}`"
      >
        <data-sheet />
        <div class="item-label">{{ item.id }} 100w 行数据，非常流畅</div>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DataSheet } from '@icon-park/vue-next'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const activeLink = computed(() => route.path)

type dataType = {
  id: string
  name: string
}
let dataLists: dataType[] = []
for (let i = 1; i <= 5; i++) {
  dataLists.push({
    id: `${i}`,
    name: `数据源${i}`
  })
}
</script>

<style scoped>
.ds-wrapper {
  display: flex;
  height: 100%;
}
</style>

<style scoped>
.ds-left-panel-wrapper {
  position: relative;
  display: flex;
  z-index: 4;
  height: 100%;
  box-shadow: var(--color-gray-300) 1px 0 0;
}

.ds-left-panel-content {
  width: calc(var(--panel-width) - 60px);
  height: 100%;
  box-shadow: var(--color-gray-300) 1px 0 0;
  padding: 20px 10px 10px;
}

.ds-item {
  display: flex;
  align-items: center;
  height: 36px;
  padding: 0 12px;
  border-radius: 8px;
  cursor: pointer;
  color: var(--color-text);
  background-color: var(--color-white);
}

.ds-item.active {
  background-color: var(--color-gray-200);
}

.item-label {
  margin-left: 8px;
  font-size: var(--font-size-normal);
}
</style>
