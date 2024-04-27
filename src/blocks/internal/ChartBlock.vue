<template>
    <div>{{ chart.type }}</div>
</template>
<script setup lang="ts">
const chart = {
    type: 'chart',
    props: {
        xAxis: ['Man', 'Tue', 'Wed'],
        yAxis: [820, 932, 901]
    }
}
</script>
