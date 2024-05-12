<template>
    <div class="block-wrapper" ref="blockWrapperRef" @click.stop="selectBlock(block.id)">
        <!-- @vue-ignore -->
        <component class="block" :is="$blocksMap[block.type].material" :block="block"></component>
        <div v-if="editable" :class="['block-wrapper-indicator', {
            shown: envStore.debug, selected: activeBlockId === block.id
        }]">
            <div v-if="activeBlockId === block.id" class="block-toolbar">
                <div class="block-toolbar-item handle">
                    <Drag />
                </div>
                <div class="block-toolbar-item" @click="blocks.splice(i, 1)">
                    <Delete />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { Delete, Drag } from '@icon-park/vue-next'
    import { storeToRefs } from 'pinia';
    import { inject } from 'vue';

    import { useEnvStore } from '@/stores/debug'
    import { useEditorStore } from '@/stores/editor'
    import type { Block } from '@/types/block';
    defineProps<{
        block: Block
        i: number
    }>()

    const editorStore = useEditorStore()
    const { selectBlock } = editorStore
    const { activeBlockId, blocks } = storeToRefs(editorStore)
    const editable = inject('editable', true)
    const envStore = useEnvStore()
</script>
<style scoped>
    .block-wrapper {
        position: relative;
        display: flex;
        width: 100%;
        margin-top: 16px;
        padding: 6px 4px;
        border-radius: 8px;
        background-color: var(--color-white);
        transition: box-shadow 0.2s ease-in-out;
    }

    .block {
        position: relative;
        z-index: 1;
    }

    .block-wrapper-indicator {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        border-radius: 8px;
        pointer-events: none;
        user-select: none;
    }

    .block-wrapper-indicator.shown {
        border: 1px dashed var(--color-gray-300);
    }

    .block-wrapper-indicator.selected {
        border: 1px solid var(--color-primary);
    }

    .block-toolbar {
        display: flex;
        align-items: center;
        position: absolute;
        left: 0;
        top: -36px;
        z-index: 1;
        padding: 4px 8px;
        gap: 4px;
        background-color: var(--color-black);
        border-radius: 6px;
        pointer-events: visible;
    }

    .block-toolbar-item {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 22px;
        height: 22px;
        border-radius: 4px;
        color: var(--color-white);
        cursor: pointer;
    }

    .block-toolbar-item:nth-of-type(1) {
        cursor: grab;
    }

    .block-toolbar-item:hover {
        background-color: var(--color-gray-800);
        transition: all 0.2s ease-in-out;
    }

    .block-wrapper.debug:hover .block-wrapper-senior {
        border-style: solid;
        transition: box-shadow 0.2s ease-in-out;
    }


</style>
<style lang="css">
.smooth-dnd-draggable-wrapper {
  overflow: visible !important;
}
</style>