<template>
  <transition name="fade">
    <div 
      v-if="dialogsStore.length"
      :class="[$style.container]">
      <component
        v-for="dialog in dialogsStore" :key="dialog.id"
        :is="dialog.dialog"
        :="dialog.props"
        :class="[$style.dialog]"
        @confirm="dialog.confirm"
        @cancel="dialog.cancel"
    ></component>
  </div>
</transition>
</template>

<script lang="ts" setup>
import { useDialogContainer } from './useDialogContainer'

const { dialogsStore } = useDialogContainer()
</script>

<script lang="ts">
export default {
  name: 'DialogContainer'
}
</script>

<style module>
.container {
  position: fixed;
  width: 120%;
  height: 120%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(200,215,255, .5);
  backdrop-filter: blur(3px);
}

.dialog {
  border-radius: 10px;
}

</style>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>