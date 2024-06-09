<template>
    <div>
        {{ props.block.type }}
    </div>
    <segmented-control 
        v-model="chartType"
        :data="data"
        @input="(val) => {
            emit('change', {
                ...props.block,
                props: { ...props.block.props, chartType: val as ChartType }
            })
        }"
    />
</template>
<script setup lang="ts">
import { useForm } from 'vee-validate';
import { watch } from 'vue';

import type { ChartBlock, ChartType } from '@/types/block'
import SegmentedControl from '@/ui/SegmentedControl/SegmentedControl.vue'
const props = defineProps<{
    block: ChartBlock
}>()

// eslint-disable-next-line no-unused-vars
const { values, validate, defineInputBinds } = useForm({
    initialValues: {
        chartType: props.block.props.chartType
    }
})

const chartType = defineInputBinds('chartType')

// eslint-disable-next-line no-unused-vars
const emit = defineEmits<{ (event: 'change', block: ChartBlock): void }>()

watch([values], ([newValues]) => {
    emit('change', { ...props.block, props: { ...props.block.props, ...newValues } })
})

const data = [{
    label: 'Echarts',
    value: 'echarts'
}, {
    label: 'Canvas',
    value: 'canvas'
}, {
    label: 'SVG',
    value: 'svg'
}]
</script>
