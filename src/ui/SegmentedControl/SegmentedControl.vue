<template>
<div ref="observerRef" class="segmented-control">
    <span 
        class="segmented-control-indicator"
        :style="{
            width: `${width}px`,
            height: `${height}px`,
            transform: `translate(${translate[0]}px, ${translate[1]}px)`
        }"
    >
    </span>
    <div 
        class="segmented-control-item" 
        v-for="{ value, label } in data" 
        :key="value">
        <input 
            class="segmented-control-input" 
            type="radio"
            :id="`${id}-${value}`"
            :name="id"
            :value="innerValue"
            @input="() => handleChange(value)"
        />
        <label 
            :for="`${id}-${value}`"
            :ref="(el) => (refs[value] = el as HTMLLabelElement)"
            class="segmented-control-label"
        >
            {{ label }}
        </label>
    </div>
</div>
</template>

<script setup lang='ts'>
import { reactive, ref, toRefs, watch } from 'vue';

import type { SegmentedControlProps } from './types'
const props = defineProps<SegmentedControlProps>()

const activePosition = reactive({
    width: 0,
    height: 0,
    translate: [0,0]
})

// eslint-disable-next-line no-unused-vars
const emit = defineEmits<{ (event: 'input', value: string): void }>()
const { width, height, translate } = toRefs(activePosition)
const innerValue = ref(props.value ?? props.data[0].value)

const id = ref('radio-id')
const refs = ref<Record<string, HTMLLabelElement | null>>({})

const handleChange = (val: string) => {
    innerValue.value = val
    emit('input',val )
}

watch([props], ([p]) => {
    innerValue.value = p.value ?? p.data[0].value
}, {
    immediate: true
})

const observerRef = ref<HTMLDivElement | null>()

watch([innerValue, observerRef], ([v]) => {
    if(v && v in refs.value && observerRef.value) {
        const element = refs.value[v]
        if(!element || !element.parentElement) {
            return
        }
        const elementRect = element.getBoundingClientRect()
        const scaledValue = element.offsetWidth / elementRect.width
        const width = elementRect.width * scaledValue || 0
        const height = elementRect.height || 0
        const { offsetLeft, offsetTop } = element.parentElement
        activePosition.width = width
        activePosition.height = height
        activePosition.translate = [offsetLeft, offsetTop]
    }
}, {
    immediate: true
})
</script>

<style scoped>
.segmented-control {
    position: relative;
    display: inline-flex;
    width: 100%;
    height: 32px;
    padding: 2px;
    border-radius: 8px;
    background-color: var(--color-gray-100);
}
.segmented-control-indicator {
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 8px;
    cursor: pointer;
    background-color: var(--color-white);
    transition: all 0.2s ease-in-out;
}
.segmented-control-item {
    position: relative;
    flex: 1;
}
.segmented-control-input {
    width: 0;
    height: 0;
    overflow: hidden;
    position: absolute;
}
.segmented-control-label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: flex;
    width: 100%;
    height: 28px;
    padding: 0 12px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    user-select: none;
}
</style>