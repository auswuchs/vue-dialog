<template>
  <component
    v-for="dialog in dialogsStore" :key="dialog.id"
    :is="dialog.component"
    v-bind="dialog.props"
    @confirm="dialog.confirm"
    @cancel="dialog.cancel"
  ></component>
</template>

<script lang="ts" setup>
import { useDialogContainer } from '../useDialogContainer'
const { dialogsStore } = useDialogContainer()
</script>