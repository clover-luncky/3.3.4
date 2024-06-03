<template>
  <div class="layout-runner" ref="runner">
    <div class="layout-runner-navigator">
      <div></div>
      <div class="address-wrapper">https://helloword.com/sdfsfsdf/sggwefwfsdfsdfsdfsdfsf</div>

      <PreviewModeSwitcher
        :preview-mode="props.previewMode"
        @preview-mode-change="greet"
        @full-screen="toggle"
      />
    </div>
    <AppLaptopPreviewer />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { PreviewType } from './type'
import AppLaptopPreviewer from '../AppPreviewer/LaptopPreviewer.vue'
import PreviewModeSwitcher from './PreviewModeSwitcher.vue'
const props = defineProps<{
  previewMode?: PreviewType
}>()

const emit = defineEmits<{
  'preview-mode-change': [mode: PreviewType]
}>()
function greet(mode: PreviewType) {
  emit('preview-mode-change', mode)
}

const runner = ref<HTMLElement | null>()
function toggle() {
  if (!runner.value) return
  if (document.fullscreenElement) {
    document.exitFullscreen()
  } else {
    runner.value.requestFullscreen()
  }
}
</script>
<style scoped>
.layout-runner {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  margin: 8px 40px;
  background-color: var(--color-white);
  border-radius: 8px;
  box-shadow:
    0 0 1px rgb(62 65 86 / 37.5%),
    0 12px 24px rgb(62 65 86 / 15%),
    0 20px 40px rgb(62 65 86 / 10%);
}
.layout-runner-navigator {
}
</style>
