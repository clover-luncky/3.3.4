import { useVueFlow } from '@vue-flow/core'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

import { initialElements as elements1 } from './initial-elements'

const id = 0

export const useDragAndDrop = defineStore('drag', () => {
  const elements = ref(elements1)
  const state = {
    draggedType: ref(null),
    isDragOver: ref(false),
    isDragging: ref(false)
  }
  // const id = ref(0)
  function getId() {
    // return `dndnode_${id++}`
    return elements.value.length.toString()
  }

  const { draggedType, isDragOver, isDragging } = state

  const { addNodes, screenToFlowCoordinate, onNodesInitialized, updateNode } = useVueFlow()

  watch(isDragOver, (dragging) => {
    document.body.style.userSelect = dragging ? 'none' : ''
  })

  function onDragStart(event: any, type: any) {
    console.log('event', event, type)
    if (event.dataTransfer) {
      event.dataTransfer.setData('application/vueflow', type)
      event.dataTransfer.effectAllowed = 'move'
    }

    draggedType.value = type
    isDragging.value = type

    document.addEventListener('drop', onDragEnd)
  }

  function onDragEnd() {
    isDragging.value = false
    isDragOver.value = false
    draggedType.value = null
    document.removeEventListener('drop', onDragEnd)
  }

  function onDrop(event: any) {
    console.log('screenToFlowCoordinate', event)
    const position = screenToFlowCoordinate({
      // x: event.clientX,
      // y: event.clientY
      x: event.clientX / 2 + 100,
      y: event.clientY / 2
    })

    console.log('onDrop', position, event)

    const id = getId()

    type NewNode = {
      label: string
      id: string
      type: any
      position: any
      class: string
    }

    const newNode: NewNode = {
      id,
      type: draggedType.value,
      position,
      label: `Node ${id}`,
      class: 'light'
    }

    const { off } = onNodesInitialized(() => {
      console.log('这里????')
      updateNode(id, (node: any) => ({
        position: {
          x: node.position.x - node.dimensions.width / 2,
          y: node.position.y - node.dimensions.height / 2
        }
      }))

      off()
    })

    elements.value.push(newNode)
    console.log('newNode', elements, newNode)
    // addNodes(newNode)
  }

  function onDragOver(event: any) {
    event.preventDefault()
    if (draggedType.value) {
      isDragOver.value = true

      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = 'move'
      }
    }
  }

  function onDragLeave() {
    isDragOver.value = false
  }
  return {
    getId,
    onDragStart,
    onDrop,
    onDragOver,
    onDragLeave,
    isDragging,
    draggedType,
    elements
  }
})
