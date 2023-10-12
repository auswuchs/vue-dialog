import { ref, watch, computed, Component, shallowRef } from 'vue'
import { EventHookOn, useConfirmDialog, UseConfirmDialogRevealResult } from '@vueuse/core'

import type { ComputedRef } from 'vue'
import type { ComponentProps } from './types'

import { useDialogContainer } from './useDialogContainer'

let initialDialogId = 0

const getDialogId = () => {
  return ++initialDialogId
}

/**
 * @param dialog - a component that used for modal dialog
 * @param initialAttrs - new props data for dialog component, optional
 * @param options - props behavior settings, optional
 * @returns `{ reveal, isRevealed, onConfirm, onCancel, close, closeAll }`
 * `reveal` - shows the component
 * `isRevealed` - return computed mark if the component is shown
 * `onConfirm` - hook that gets a callback for user's confirmation
 * `onCancel` - hook that gets a callback for user's canceling
 * `close` - close the dialog without triggering any hook and don't change `isRevealed`
 * `closeAll` - close all open dialogs
 */
export const useDialog = <C extends Component>(
  component: C,
  initialAttrs: ComponentProps<C> = {} as ComponentProps<C>,
): {
  close: () => void
  closeAll: () => void
  reveal: (props?: ComponentProps<C>) => Promise<UseConfirmDialogRevealResult<any, boolean>>

  isRevealed: ComputedRef<boolean>
  onConfirm: EventHookOn
  onCancel: EventHookOn
} => {
  const propsRef = shallowRef<ComponentProps<C>>({} as ComponentProps<C>)
  const revealed = ref(false)

  const {
    addDialog,
    removeDialog,
    removeAll,
    dialogsStore
  } = useDialogContainer()

  const { 
    reveal,
    isRevealed, 
    onConfirm, 
    onCancel, 
    onReveal, 
    confirm, 
    cancel 
  } = useConfirmDialog()

  const DIALOG_ID = getDialogId()

  const setAttrs = (attrs: ComponentProps<C> | null) => {
    if(!attrs) {
      propsRef.value = {}
      return
    }
    for (const prop in attrs) {
      propsRef.value[prop] = attrs[prop]
    }
  }
  setAttrs(initialAttrs)


  const close = () => {
    revealed.value = false
    removeDialog(DIALOG_ID)
  }

  const closeAll = () =>{
    dialogsStore.forEach(comp => {
      comp.revealed.value = false
    })
    removeAll()
  }


  onReveal((props?: ComponentProps<C>) => {
    revealed.value = true
    if (props) setAttrs(props)

    addDialog({
      id: DIALOG_ID,
      component,
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
    removeDialog(DIALOG_ID)
  })

  return {
    close,
    closeAll,
    reveal,
    isRevealed: computed(() => isRevealed.value && revealed.value),
    onConfirm,
    onCancel,
  }
}