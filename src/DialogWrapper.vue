<template>
  <component
    v-for="dialog in dialogsStore" :key="dialog.id"
    :is="dialog.dialog"
    :="dialog.props"
    @confirm="dialog.confirm"
    @cancel="dialog.cancel"
  ></component>
</template>

<script lang="ts" setup>
import { useDialogWrapper } from './useDialogWrapper'

const { dialogsStore } = useDialogWrapper()
</script>

<script lang="ts">
export default {
  name: 'Dialog-Wrapper'
}
</script>