<template>
  <div class="layout-wrapper" :class="{ debug }">
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
        <SmoothDndDraggable v-for="(block, index) in blocks" :key="block.id">
            <!-- <div 
              :class="{'block-wrapper' : true, debug: debug || activeBlockId === block.id }" 
              :data-block-type="block.type" 
              :data-block-id="block.id" 
              @click="() => editorStore.selectBlock(block)"> -->
              <BlockRenderer :block="block" :i="index"></BlockRenderer>
            <!-- </div> -->
        </SmoothDndDraggable>
      </SmoothDndContainer>
    </div>
    <div>
      <AppRightPanel />
    </div>
  </div>
</template>
<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import type { DropResult } from 'smooth-dnd';

  import BlockRenderer from '@/blocks/BlockRenderer.vue';
  import AppLeftPanel from '@/components/AppLeftPanel/AppLeftPanel.vue';
  import AppRightPanel from '@/components/AppRightPanel/AppRightPanel.vue';
  import { SmoothDndContainer } from '@/components/SmoothDnd/SmoothDndContainer';
  import {SmoothDndDraggable} from '@/components/SmoothDnd/SmoothDndDraggable';
  import { useEnvStore } from '@/stores/debug';
  import { useEditorStore } from '@/stores/editor';
  import { arrayMove } from '@/utils/array';

  const store = useEnvStore()
  const editorStore = useEditorStore()
  const { debug } = storeToRefs(store)
  // const { blocks, activeBlockId } = storeToRefs(editorStore)
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
  margin: 20px;
}

.block-wrapper {
  padding: 20px;
  border-radius: 4px;
  border: 2px dashed transparent;
  margin: 20px 0;
}
.block-wrapper.debug {
  border-color: #3eaf7c;
}
</style>
  