<template>
    <div>
        <img :src="image.props.src" :alt="image.props.alt" />
    </div>
</template>
<script setup lang="ts">
const image = {
    type: 'image',
    props: {
        src: 'https://www.baidu.com/img/flexible/logo/pc/result.png',
        alt: 'Google'
    }
}
</script>
