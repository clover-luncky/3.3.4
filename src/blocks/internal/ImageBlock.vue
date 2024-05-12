<template>
    <div class="image">
        <img :src="props.block.props.src" :alt="props.block.props.alt" />
    </div>
</template>
<script setup lang="ts">
import type { ImageBlock } from '@/types/block';

const props = defineProps<{
    block: ImageBlock
}>()
</script>
<style scoped>
.image {
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
}
img {
  width: 100%;
}
</style>