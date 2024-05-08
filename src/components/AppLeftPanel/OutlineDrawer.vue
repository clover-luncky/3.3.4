<template>
    <div class="outline-drawer-wrapper">
        <h3 class="drawer-title">大纲</h3>
        <ul class="outline-list">
            <li v-for="block in blocks" :key="block.type" class="outline-item">
                <component :is="blocksBaseMeta[block.type].icon"></component>
                <span class="outline-item-name">{{ blocksBaseMeta[block.type].label }}</span>
                <span class="outline-item-tip">{{ block.label }}</span>
            </li>
        </ul>
    </div>
</template>

<script setup lang='ts'>
import { storeToRefs } from 'pinia';

import { blocksBaseMeta } from '@/constants/blocksBaseMeta'
import { useEditorStore } from '@/stores/editor';
const editorStore = useEditorStore()
const { blocks } = storeToRefs(editorStore)


</script>

<style scoped>
.outline-drawer-wrapper {
    width: 100%;
}
.drawer-title {
    font-size: var(--font-size-large);
    font-weight: var(--font-weight-bolder);
    margin-bottom: 8px
}
.outline-list {
    margin-top: 8px;
}
.outline-item {
    display: flex;
    align-items: center;
    padding: 6px 0;
    color: var(--color-text);
}
.outline-item-name {
    margin-left: 8px;
    font-size: var(--font-size-normal);
}
.outline-item-tip {
    flex: 1;
    text-align: right;
    margin-left: 8px;
    font-size: var(--font-size-small);
    color: var(--color-gray-700)
}
</style>