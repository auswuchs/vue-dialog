<template>
  <transition-group>
    <component
      v-for="dialog in dialogsStore" :key="dialog.id"
      v-show="dialog.revealed.value"
      :is="dialog.component"
      v-bind="dialog.props"
      @confirm="dialog.confirm"
      @cancel="dialog.cancel"
    ></component>
  </transition-group>
</template>

<script lang="ts" setup>
import { useDialogContainer } from '../useDialogContainer'
const { dialogsStore } = useDialogContainer()
</script>