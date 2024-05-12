<template>
    <div class="text" :style="{ backgroundColor: bgColor, color }">
        <component :is="icon"></component>
        <span class="block-text">{{ props.block.props.content }}</span>
    </div>
</template>
<script setup lang="ts">
import { Error, Success, Wallet } from '@icon-park/vue-next'

import type { TextBlock } from '@/types/block';

const props = defineProps<{
    block: TextBlock
}>()

const STATUS_MAP = {
    success: {
        color: '#059669',
        bgColor: '#E4F2E9',
        borderColor: '#79DBA2',
        icon: Success
    },
    warning: {
        color: '#E18F05',
        bgColor: '#F8ECEC',
        borderColor: '#79DBA2',
        icon: Error
    },
    error: {
        color: '#DC2C26',
        bgColor: '#F8ECEC',
        borderColor: '#F3A9A5',
        icon: Wallet
    }
}
// console.log('STATUS_MAP', STATUS_MAP, props.block.props.status)
const { color, bgColor, icon } = STATUS_MAP[props.block.props.status]

console.log('props',props)
</script>
<style scoped>
.text {
    display: flex;
    align-items: center;
    flex: 1;
    font-size: var(--font-size-large);
    padding: 8px 18px;
    border-radius: 8px;
}

.block-text {
    margin-left: 6px;
}
</style>