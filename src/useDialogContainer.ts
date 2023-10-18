import { markRaw, reactive } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import type { UseDialogContainerReturn, DialogData } from './types'

const sharedUseDialogContainer = (): UseDialogContainerReturn => {
  const dialogsStore: DialogData<any>[] = reactive([])

  const dialogAdd = (dialogData: DialogData<any>) => {
    dialogsStore.push(markRaw(dialogData))

    const lastDialogIdx = dialogsStore.length - 1
    
    dialogsStore.forEach((el, idx) => {
      if (idx === lastDialogIdx) return
      el.revealed.value = false
    })
  }

  const dialogRemove = (id: number | string) => {
    const index = dialogsStore.findIndex(dialog => dialog.id == id)
    dialogsStore.splice(index, 1)
        
    const lastDialog = dialogsStore?.at(-1)
    if (lastDialog) {
      lastDialog.revealed.value = true
    }
  }

  const removeAll = () => {
    dialogsStore.splice(0)
  }

  return {
    dialogsStore,
    dialogAdd,
    dialogRemove,
    removeAll,
  }
}

export const useDialogContainer = createSharedComposable(sharedUseDialogContainer)