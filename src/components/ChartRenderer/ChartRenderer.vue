<template>
    <component :is="renderer" :block="block" class="chart-container"/>
</template>

<script setup lang='ts'>
import { computed } from 'vue';

import type { ChartBlock } from '@/types/block'

import CanvasChartRenderer from './CanvasChartRenderer/CanvasChartRenderer.vue'
import EchartsRenderer from './EchartsRenderer/EchartsRenderer.vue'
import SVGChartRenderer from './SVGChartRenderer/SVGChartRenderer.vue'
const props = defineProps<{
    block: ChartBlock
}>()
const renderer = computed(() => {
    if(!props.block) {
        return ''
    }
    switch(props.block.props.chartType) {
        case 'echarts': {
            return EchartsRenderer
        }
        case 'canvas' : {
            return CanvasChartRenderer
        }
        case 'svg': {
            return SVGChartRenderer
        }
        default: 
            return ''
    }
})
</script>
