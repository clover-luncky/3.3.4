<template>
    <input 
        class="content" 
        type="text" 
        :value="props.block.props.src" 
        @change="(e) => handleChange((e.target as HTMLInputElement).value)" 
    />
</template>
<script setup lang="ts">
import type { ImageBlock } from '@/types/block'
const props = defineProps<{
    block: ImageBlock
}>()

// eslint-disable-next-line no-unused-vars
const emit = defineEmits<{(event: 'change', block: ImageBlock): void}>()

const handleChange = (src: string) => {
    const block = {...props.block, props: { ...props.block.props, src }}
    emit('change', block)
}
</script>
<style>
.content {
    width: 100%;
}
</style>