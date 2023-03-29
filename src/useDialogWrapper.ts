import { markRaw, Ref, reactive, Component } from 'vue'
import type { ComponentProps } from './useDialog'

export type UseDialogWrapperReturn = {
  dialogsStore: DialogData<any>[]
  addDialog: (dialogData: DialogData<any>) => void,
  removeDialog: (id: number) => void,
  removeAll: () => void
}

export type DialogData<C extends Component> = {
  id: number
  dialog: C
  isRevealed: Ref<boolean>
  revealed: Ref<boolean>
  props: ComponentProps<C>,
  confirm: (props?: ComponentProps<C>) => void
  cancel: (props?: ComponentProps<C>) => void
  close: () => void,
}

const dialogsStore: DialogData<any>[] = reactive([])

export const useDialogWrapper = function (): UseDialogWrapperReturn {

  const addDialog = function (dialogData: DialogData<any>) {
    dialogsStore.push(markRaw(dialogData))
  }

  const removeDialog = function (id: number){
    const index = dialogsStore.findIndex(dialog => dialog.id == id)
      dialogsStore.splice(index, 1)
  }

  const removeAll = function () {
    dialogsStore.splice(0)
  }

  return {
    dialogsStore,
    addDialog,
    removeDialog,
    removeAll
  }
}