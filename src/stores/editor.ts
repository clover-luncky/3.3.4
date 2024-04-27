import { defineStore } from 'pinia'
import { ref } from 'vue'

import { blocks as mockBlocks } from '@/mock/blocks'
import type { Block } from '@/types/block'

export const useEditorStore = defineStore('editor', () => {
  const blocks = ref<Block[]>(mockBlocks)
  const addBlock = (block: any) => {
    blocks.value.push(block)
  }

  const updateBlocks = (newBlocks: Block[]) => {
    blocks.value = newBlocks
  }

  return {
    blocks,
    addBlock,
    updateBlocks
  }
})
