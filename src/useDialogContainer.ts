import { markRaw, reactive } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import type { UseDialogContainerReturn, DialogData } from './types'

const sharedUseDialogContainer = (): UseDialogContainerReturn => {
  const dialogsStore: DialogData<any>[] = reactive([])

  const addDialog = (dialogData: DialogData<any>) => {
    dialogsStore.push(markRaw(dialogData))
  }

  const removeDialog = (id: number) => {
    const index = dialogsStore.findIndex(dialog => dialog.id == id)
      dialogsStore.splice(index, 1)
  }

  const removeAll = () => {
    dialogsStore.splice(0)
  }

  return {
    dialogsStore,
    addDialog,
    removeDialog,
    removeAll
  }
}

export const useDialogContainer = createSharedComposable(sharedUseDialogContainer)