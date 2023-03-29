import { ref, watch, computed, Component, VNodeProps, AllowedComponentProps } from 'vue'
import type { ComputedRef } from 'vue'
import { EventHookOn, useConfirmDialog, UseConfirmDialogRevealResult } from '@vueuse/core'

import { useDialogWrapper } from './useDialogWrapper'

export type ComponentProps<C extends Component> = C extends new (...args: any) => any
  ? Omit<InstanceType<C>['$props'], keyof VNodeProps | keyof AllowedComponentProps>
  : never

type PropsBehaviorOptions = {
  clear: boolean,
  keepInitial: boolean
}

let dialogNumber = 0

function getDialogId() {
    return ++dialogNumber
}

/**
 * @param dialog - a component that used for modal dialog
 * @param initialAttrs - new props data for dialog component, optional
 * @param options - props behavior settings, optional
 * @returns `{ reveal, isRevealed, onConfirm, onCancel, close, closeAll }` -
 * `reveal` - shows the component
 * `isRevealed` - return computed mark if the component is shown
 * `onConfirm` - hook that gets a callback for user's confirmation
 * `onCancel` - hook that gets a callback for user's canceling
 * `close` - close the dialog without triggering any hook and don't change `isRevealed`
 * `closeAll` - close all open dialogs
 */
export function useDialog <C extends Component> (
  dialog: C,
  initialAttrs: ComponentProps<C> = {} as ComponentProps<C>,
  options: PropsBehaviorOptions = { clear: false, keepInitial: false }
): {
  close: () => void
  closeAll: () => void
  reveal: (props?: ComponentProps<C>) => Promise<UseConfirmDialogRevealResult<any, boolean>>

  isRevealed: ComputedRef<boolean>
  onConfirm: EventHookOn
  onCancel: EventHookOn
} {

  const setAttrs = (attrs: ComponentProps<C> | null) => {
    if(!attrs) {
      propsRef.value = {}
      return
    }
    for (const prop in attrs) {
      propsRef.value[prop] = attrs[prop]
    }
   }

  const propsRef = ref({} as ComponentProps<C>)
  setAttrs(initialAttrs)
  const revealed = ref(false)

  const close = () => {
    revealed.value = false
    removeDialog(DIALOG_ID)
  }

  const {
    addDialog,
    removeDialog,
    removeAll,
    dialogsStore
  } = useDialogWrapper()

  const { 
    reveal,
    isRevealed, 
    onConfirm, 
    onReveal, 
    onCancel, 
    confirm, 
    cancel 
  } = useConfirmDialog()

  const DIALOG_ID = getDialogId()

  onReveal((props?: ComponentProps<C>) => {

    revealed.value = true
    if(props) setAttrs(props as ComponentProps<C>)

    addDialog({
      id: DIALOG_ID,
      dialog,
      isRevealed,
      confirm,
      cancel,
      props: propsRef.value,
      close,
      revealed
    })
  })

  watch(isRevealed, (value) => {
    if (value) return

    if (options.clear) {
      setAttrs(options.keepInitial ? initialAttrs : null)
    }

    removeDialog(DIALOG_ID)
  })

  const closeAll = () =>{
    dialogsStore.forEach(dialog => {
      dialog.revealed.value = false
    })
    removeAll()
  }

  return {
    close,
    closeAll,
    reveal,
    isRevealed: computed(() => isRevealed.value && revealed.value),
    onConfirm,
    onCancel,
  }
}