import { useVueFlow } from '@vue-flow/core'
import { defineStore } from "pinia";
import { ref, watch } from 'vue'

let id = 0

export const useDragAndDrop = defineStore('drag', () => {
    const state = {
        draggedType: ref(null),
        isDragOver: ref(false),
        isDragging: ref(false)
    }
    // const id = ref(0)
    function getId() {
        return `dndnode_${id++}`
    }

    const { draggedType, isDragOver, isDragging } = state

    const { addNodes, screenToFlowCoordinate, onNodesInitialized, updateNode } = useVueFlow()

    watch(isDragOver, (dragging) => {
        document.body.style.userSelect = dragging ? 'none' : ''
    })

    function onDragStart(event: any, type: any) {
        console.log('event', event, type)
        if(event.dataTransfer) {
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
        console.log('screenToFlowCoordinate', useVueFlow())
        const position = screenToFlowCoordinate({
            x: event.clientX,
            y: event.clientY
        })

        console.log('onDrop', position, event)

        const id = getId()

        type NewNode = {
            label: string,
            id: string,
            type: any,
            position: any
        }

        const newNode: NewNode = {
            id,
            type: draggedType.value,
            position,
            label: `[${id}]`
        }

        const { off } = onNodesInitialized(() => {
            updateNode(id, (node: any) => ({
                position: {
                    x: node.position.x - node.dimensions.width / 2,
                    y: node.position.y - node.dimensions.height / 2,
                }
            }))

            off()
        })

        addNodes(newNode)
    }

    function onDragOver(event: any) {
        event.preventDefault()
        if(draggedType.value) {
            isDragOver.value = true

            if(event.dataTransfer) {
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
        draggedType
    }
})