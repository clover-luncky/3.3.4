<template>
    <input 
        class="content" 
        type="text" 
        v-model="content" 
        v-bind="contentAttr"
    />
    <p style="color: red;">
        {{ errors.content  }}
    </p>
    <input 
        v-for="field in fields" 
        :key="field.key"
        v-model="field.value"
    />
    <div>
        <button @click="() => push('')">动态添加</button>
        <button @click="() => console.log(JSON.stringify(values))">查看数据</button>
    </div>
</template>
<script setup lang="ts">
import { defineRule,useFieldArray,useForm } from 'vee-validate'
import { watch } from 'vue';

import type { TextBlock } from '@/types/block'
const props = defineProps<{
    block: TextBlock
}>()

defineRule('required', (value: string) => {
    if(!value || !value.length) {
        return 'This field is required'
    }
    return true
})

// eslint-disable-next-line no-unused-vars
const emit = defineEmits<{(event: 'change', block: TextBlock): void}>()

const { values, errors, defineField,isFieldTouched } = useForm({
    validationSchema: {
        content: 'required'
    },
    initialValues: {
        content: props.block.props.content,
        person: {
            name: '张三',
            info: {
                name: '李四',
                hobby: ['篮球', '足球']
            }
        }
    }
})
const [content, contentAttr] = defineField('content')

watch(content, (newVal) => {
    console.log('isFieldTouched',isFieldTouched('content'))
    const block = {...props.block, props: { ...props.block.props, content: newVal }}
    emit('change', block)
})

const {fields,push} = useFieldArray('person.info.hobby')


</script>
<style>
.content {
    width: 100%;
}
</style>