<template>
  <div class="layout-wrapper" :class="{ debug }" @click="store.toggle">
    <AppLeftPanel />
    <div class="layout-painter">
      <SmoothDndContainer 
        class="block-group" 
        group-name="blocks"
        orientation="vertical"
        tag="div"
        @drop="(payload) => {
        const newBlocks = applyDrag(blocks, payload)
          editorStore.updateBlocks(newBlocks)
        }"
      >
        <SmoothDndDraggable v-for="block in blocks" :key="block.id">
            <BlockRenderer :block="block"></BlockRenderer>
        </SmoothDndDraggable>
      </SmoothDndContainer>
    </div>
    <div>
      <RightPanel />
    </div>
  </div>
</template>
<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import type { DropResult } from 'smooth-dnd'

  import BlockRenderer from '@/blocks/BlockRenderer.vue'
  import AppLeftPanel from '@/components/AppLeftPanel/AppLeftPanel.vue'
  import RightPanel from '@/components/RightPanel.vue'
  import { SmoothDndContainer } from '@/components/SmoothDnd/SmoothDndContainer'
  import {SmoothDndDraggable} from '@/components/SmoothDnd/SmoothDndDraggable'
  import { useEnvStore } from '@/stores/debug'
  import { useEditorStore } from '@/stores/editor'
  import { arrayMove } from '@/utils/array'

  const store = useEnvStore()
  const editorStore = useEditorStore()
  const { debug } = storeToRefs(store)
  const { blocks } = storeToRefs(editorStore)

  const applyDrag = <T extends any[]>(arr: T, dragResult: DropResult) => {
    const { removedIndex, addedIndex, payload } = dragResult
    const result = [...arr]

    if(addedIndex === null) return result

    // 添加
    if(addedIndex !== null && removedIndex === null) {
      result.splice(addedIndex, 0, payload)
    }

    // 移动
    if(addedIndex !== null && removedIndex !== null) {
      return arrayMove(result, removedIndex, addedIndex)
    }
    return result
  }
  
</script>
<style scoped>
.layout-wrapper {
  display: flex;
  flex-direction: row;
  height: 100%;
}
.layout-painter{
  width: 100%;
  overflow-y: auto;
  background-color: #f5f5f5;
  margin: 20px;
}
</style>
  