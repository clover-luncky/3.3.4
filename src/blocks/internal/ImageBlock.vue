<template>
    <div>
        <img :src="props.block.props.src" :alt="props.block.props.alt" />
    </div>
</template>
<script setup lang="ts">
import type { ImageBlock } from '@/types/block';

const props = defineProps<{
    block: ImageBlock
}>()
</script>
