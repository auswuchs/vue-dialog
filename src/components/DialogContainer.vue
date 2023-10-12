<template>
  <transition :name="transitionName">
    <div 
      v-if="dialogsStore.length"
      class="dialog-container">
      <component
        v-for="dialog in dialogsStore" :key="dialog.id"
        :is="dialog.component"
        v-bind="dialog.props"
        @confirm="dialog.confirm"
        @cancel="dialog.cancel"
    ></component>
  </div>
</transition>
</template>

<script lang="ts" setup>
import { useDialogContainer } from '../useDialogContainer'

interface Props {
  transitionName?: string
}
withDefaults(defineProps<Props>(), {
  transitionName: 'fade',
})

const { dialogsStore } = useDialogContainer()
</script>

<style scoped>
.dialog-container {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(200,215,255, .5);
  backdrop-filter: blur(3px);
  z-index: 10000;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
