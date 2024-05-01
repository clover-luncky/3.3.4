<template>
    <input type="text" :value="props.block.props.content" />
</template>
<script setup lang="ts">
import type { TextBlock } from '@/types/block'
const props = defineProps<{
    block: TextBlock
}>()
</script>