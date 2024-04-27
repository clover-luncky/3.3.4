<template>
    <component :is="blockMaterial"></component>
</template>
<script setup lang="ts">
    import type { Block } from '@/types/block'
    import ChartBlock from './internal/ChartBlock.vue'
    import ImageBlock from './internal/ImageBlock.vue'
    import TextBlock from './internal/TextBlock.vue'
    import FallbackBlock from './internal/FallbackBlock.vue'

    const props = defineProps<{
        block: Block
    }>()

    let blockMaterial:any

    switch (props.block.type) {
        case 'chart':
            blockMaterial = ChartBlock
            break
        case 'image':
            blockMaterial = ImageBlock
            break
        case 'text':
            blockMaterial = TextBlock
            break
        default: 
            blockMaterial = FallbackBlock
    }
</script>