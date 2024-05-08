<template>
    <div class="block-wrapper" ref="blockWrapperRef" @click.stop="selectBlock(block.id)">
        <!-- @vue-ignore -->
        <component :is="$blocksMap[block.type].material" :block="block"></component>
    </div>
</template>
<script setup lang="ts">
    // import { computed, inject } from 'vue';
    // import { dropHandlers, smoothDnD } from 'smooth-dnd'

    import { useEditorStore } from '@/stores/editor'
    import type { Block } from '@/types/block';

    // import ChartBlock from './internal/ChartBlock.vue';
    // import FallbackBlock from './internal/FallbackBlock.vue';
    // import ImageBlock from './internal/ImageBlock.vue';
    // import TextBlock from './internal/TextBlock.vue';
    defineProps<{
        block: Block
    }>()

    const editorStore = useEditorStore()
    const { selectBlock } = editorStore
    // let blockMaterial = computed(() => {
    //     switch (props.block.type) {
    //         case 'chart':
    //             return ChartBlock
    //         case 'image':
    //             return ImageBlock
    //         case 'text':
    //             return TextBlock
    //         default: 
    //             return FallbackBlock
    //     }
    // })

    // console.log('block', props.block)

    // console.log('$blocksMap', inject('blocksMap'))

    
</script>