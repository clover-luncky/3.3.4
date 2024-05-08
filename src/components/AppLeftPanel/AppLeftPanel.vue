<script setup lang="ts">
import { Lightning, Share } from '@icon-park/vue-next'
import { ref } from 'vue'

import BlocksDrawer from '@/components/AppLeftPanel/BlocksDrawer.vue'
import OutlineDrawer from '@/components/AppLeftPanel/OutlineDrawer.vue'

// outline: 大纲；blocks：组件
type Mode = 'outline' | 'blocks' | null
const mode = ref<Mode>('blocks')
const toggleMode = (newMode: Mode = null) => {
    if(mode.value === newMode) {
        mode.value = null
        return
    } 
    mode.value = newMode
}
</script>
<template>
    <div class="left-panel-wrapper">
        <div class="left-panel-left">
            <div :class="['btn', mode === 'outline' && 'active' ]" @click="toggleMode('outline')">
                <Lightning />
            </div>
            <div class="btn" :class="['btn', mode === 'blocks' && 'active' ]" @click="toggleMode('blocks')">
                <Share />
            </div>
        </div>
        <Transition name="app-left-panel-drawer">
            <div v-if="!!mode" class="app-left-panel-drawer">
                <div class="app-left-panel-drawer-content">
                    <component v-if="!!mode" :is="mode === 'outline' ? OutlineDrawer : BlocksDrawer"></component>
                </div>
            </div>
        </Transition>
    </div>
</template>
<style scoped>
.left-panel-wrapper {
    position: relative;
    display: flex;
    z-index: 4;
    height: 100%;
    box-shadow: var(--color-gray-300) 1px 0 0;
}
.left-panel-left {
    width: 60px;
    height: 100%;
    padding-top: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: var(--color-gray-300) 1px 0px 0px;
}
.btn {
    display: flex;
    margin: 8px 0;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    border-radius: 8px;
    font-weight: var(--font-weight-bold);
    color: var(--color-gray-700);
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    user-select: none;
}
.btn:hover {
    background-color: var(--color-gray-200);
    transition: all 0.2s ease-in-out
}
.btn.active {
    color: var(--color-text);
    background-color: var(--color-gray-200);
}
.left-panel-content {
    flex: 1;
    width: 280px;
    height: 100%;
    background-color: #f5f5f5;
    overflow: hidden
}

.app-left-panel-drawer {
  width: calc(var(--panel-width) - 60px);
  height: 100%;
  box-shadow: var(--color-gray-300) 1px 0 0;
  overflow: hidden;
}

/* 下面我们会解释这些 class 是做什么的 */
.app-left-panel-drawer-enter-active,
.app-left-panel-drawer-leave-active {
  transition: width 0.1s cubic-bezier(0.3, 0.1, 0.3, 1);
}

.app-left-panel-drawer-enter-from,
.app-left-panel-drawer-leave-to {
  width: 0;
}

.app-left-panel-drawer-content {
  width: calc(var(--panel-width) - 60px);
  height: 100%;
  padding: 16px;
}

.block-group {
    padding: 8px;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.block-item {
    width: 40px;
    height: 40px;
    background-color: #ffffff;
    border: 1px solid #e8e8e8;
    margin-bottom: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: move;
    transition: background-color 0.3s;
}
</style>