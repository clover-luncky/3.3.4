import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { blocks as mockBlocks } from '@/mock/blocks'
import type { Block } from '@/types/block'

export const useEditorStore = defineStore('editor', () => {
  const blocks = ref<Block[]>(mockBlocks)

  const activeBlockId = ref<string | null>(null)

  // 我们需要从 active id 派生
  const selectedBlock = computed(() => {
    return blocks.value.find((block) => block.id === activeBlockId.value) || null
  })

  const addBlock = (block: any) => {
    blocks.value.push(block)
  }

  const updateBlocks = (newBlocks: Block[]) => {
    blocks.value = newBlocks
  }

  const updateBlock = (id: string, newBlock: Block) => {
    // const index = blocks.value.findIndex((b) => b.id === block.id)
    // if(index !== -1) {
    //   blocks.value.splice(index, 1, block)
    // }
    for (const block of blocks.value) {
      if (block.id === id) {
        Object.assign(block, newBlock)
        break
      }
    }
  }

  const selectBlock = (id: string) => {
    activeBlockId.value = id
  }

  return {
    blocks,
    addBlock,
    updateBlocks,
    selectBlock,
    selectedBlock,
    updateBlock,
    activeBlockId
  }
})
