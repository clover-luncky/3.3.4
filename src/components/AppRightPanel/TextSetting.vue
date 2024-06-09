<template>
    <div class="text-setting">
        <div>{{ props.block.type }}</div>
        <input class="content-input" v-bind="content" />
        <input v-for="field in fields" :key="field.key" class="content-input" v-model="field.value" />
        <button class="add-button" @click="push(new Date().toLocaleTimeString())">添加</button>
        <vue-json-pretty 
            showIcon
            showLineNumber
            editable
            :data="block"
        />
    </div>
</template>
<script setup lang="ts">
import { useFieldArray, useForm } from 'vee-validate'
import { watch } from 'vue';

import type { TextBlock } from '@/types/block'
const props = defineProps<{
    block: TextBlock
}>()

const { fields, push } = useFieldArray('blocks')

const { values,  defineInputBinds } = useForm({
    initialValues: {
        content: props.block.props.content
    }
})

const content = defineInputBinds('content')

// eslint-disable-next-line no-unused-vars
const emit = defineEmits<{(event: 'change', block: TextBlock): void}>()
watch([values], ([newValues]) => {
    emit('change', { ...props.block, props: {
        ...props.block.props, ...newValues
    } })
})

</script>
<style>
.text-setting {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 8px;
    font-size: var(--font-size-large);
    border-radius: 8px;
}
.content-input {
    width: 100%;
    height: 32px;
    padding: 0 8px;
    border: 1px solid var(--color-gray-300);
    border-radius: 8px;
    outline-style: none;
    color: var(--color-gray-800);
}
.add-button {
    margin-top: 6px;
    padding: 4px 12px;
    border-radius: 8px;
    background-color: var(--color-white);
    border: 1px solid var(--color-gray-300);
    cursor: pointer;
}
</style>