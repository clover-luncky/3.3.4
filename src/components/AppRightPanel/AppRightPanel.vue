<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

import { useEditorStore } from '@/stores/editor';
import type { Block } from '@/types/block';

import ChartSetting  from './ChartSetting.vue'
import ImageSetting from './ImageSetting.vue'
import TextSetting from './TextSetting.vue'
const editorStore = useEditorStore()
const { selectedBlock } = storeToRefs(editorStore)
let blockRightPanel = computed(() => {
    if(!selectedBlock.value) return null
    switch (selectedBlock.value.type) {
    case 'text':
        return TextSetting
    case 'image':
        return ImageSetting
    case 'chart':
        return ChartSetting
    default:
        return null
}
})
const handleUpdateBlock = (block: Block) => {
    editorStore.updateBlock(block)
}
</script>
<template>
    <div class="right-panel-wrapper">
        <div class="right-panel-left">
            <component 
                :is="blockRightPanel" 
                :block="selectedBlock" 
                @change="handleUpdateBlock"
            />
        </div>
    </div>
</template>
<style scoped>
.right-panel-wrapper {
    display: flex;
    width: 280px;
    height: 100%;
    padding: 20px;
    border-right: 1px solid #e8e8e8;
    background-color: #f5f5f5;
}
.right-panel-left {
    width: 100%;
    height: 100%;
}
</style>