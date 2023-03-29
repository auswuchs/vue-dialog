<template>
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
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
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