<template>
  <Transition name="app-left-panel-drawer">
    <div class="app-left-panel-drawer">
      <div class="app-left-panel-drawer-content vue-flow-box">
        <slot></slot>
      </div>
    </div>
  </Transition>
</template>
<style scoped>
.app-left-panel-drawer {
  width: 200px;
  height: 100%;
  box-shadow: var(--color-gray-300) 1px 0 0;
  overflow: hidden;
  z-index: 10;
  position: fixed;
  background-color: #fff;
}

/* 下面我们会解释这些 class 是做什么的 */
.app-left-panel-drawer-enter-active,
.app-left-panel-drawer-leave-active {
  transition: width 0.1s cubic-bezier(0.3, 0.1, 0.3, 1);
}

.app-left-panel-drawer-enter-from,
.app-left-panel-drawer-leave-to {
  width: 0;
}

.app-left-panel-drawer-content {
  width: calc(var(--panel-width) - 60px);
  height: 100%;
  padding: 16px;
}
</style>
