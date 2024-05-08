<template>
    <div>Button</div>
</template>

<script setup lang='ts'>
defineProps({
    title: {
        type: String,
        required: true
    },
    onClick: {
        type: Function,
        required: true
    }
})
</script>

<style scoped>

</style>