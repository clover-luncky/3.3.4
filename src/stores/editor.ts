import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Block } from '@/types/block'
import { blocks as mockBlocks } from '@/mock/blocks'

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
