<template>
    <div class="app-right-panel-wrapper">
        <template v-if="currentBlockInfo">
            <div class="app-right-panel-header">
                {{ blocksBaseMeta[currentBlockInfo.type].label }}
            </div>
            <div class="app-right-panel-content">
                <component
                    :is="blockSetting"
                    :block="currentBlockInfo"
                    @change="(block: Block) => editorStore.updateBlock(block.id, block)"
                />
                <SchemaExporter :currentBlockInfo="currentBlockInfo" />
            </div>
        </template>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';

import { blocksBaseMeta } from '@/constants/blocksBaseMeta'
import { useEditorStore } from '@/stores/editor';
import type { Block } from '@/types/block';

import ChartSetting  from './ChartSetting.vue'
import SchemaExporter  from './SchemaExporter.vue'
import TextSetting  from './TextSetting.vue'
const editorStore = useEditorStore()
const blocksMap = computed(() => {
    const { blocks } = editorStore
    return blocks.reduce<Record<string, (typeof blocks)[0]>>((acc, cur) => {
        acc[cur.id] = cur
        return acc
    }, {})
})

const currentBlockInfo = computed(() => {
    return editorStore.activeBlockId ? blocksMap.value[editorStore.activeBlockId] :  null
})

const blockSetting = computed(() => {
    switch (currentBlockInfo.value?.type) {
        case 'text': {
            return TextSetting
        }
        case 'chart': {
            return ChartSetting
        }
        default:
            return ''
    }
})
</script>
<style scoped>
.app-right-panel-wrapper {
   position: relative;
   z-index: 4;
   width: var(--panel-width);
   height: 100%;
   box-shadow: var(--color-gray-300) 1px 0 0;
}
.app-right-panel-header {
    font-size: var(--font-size-normal);
    font-weight: var(--font-weight-bolder);
    height: 44px;
    line-height: 44px;
    padding: 0 16px 0 20px;
}

.app-right-panel-content {
    padding: 0 16px 0 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
}
</style>