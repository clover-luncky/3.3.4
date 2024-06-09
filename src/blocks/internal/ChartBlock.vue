<template>
    <div class="chart">
        <ChartRenderer :block="block" />
    </div>
</template>
<script setup lang="ts">
import ChartRenderer from '@/components/ChartRenderer/ChartRenderer.vue'
import type { ChartBlock } from '@/types/block'
defineProps<{
  block: ChartBlock
}>()
</script>
<style scoped>
.chart {
  width: 100%;
}
</style>