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
 * @param props - props for dialog component, optional
 * @returns `{ reveal, isRevealed, onConfirm, onCancel, close, closeAll }`
 * `reveal` - shows dialog, return promise
 * `isRevealed` - return computed boolean if component is shown
 * `hasOpenedDialogs` - return computed boolean if there is at least one open dialog
 * `onConfirm` - hook that gets a callback for dialog confirmation
 * `onCancel` - hook that gets a callback for dialog canceling
 * `close` - close the dialog without triggering any hook
 * `closeAll` - close all dialogs
 */
export const useDialog = <C extends Component>(
  component: C,
  props: ComponentProps<C> = {} as ComponentProps<C>,
): {
  close: () => void
  closeAll: () => void
  reveal: (props?: ComponentProps<C>) => Promise<UseConfirmDialogRevealResult<any, boolean>>
  isRevealed: ComputedRef<boolean>
  hasOpenedDialogs: ComputedRef<boolean>
  onConfirm: EventHookOn
  onCancel: EventHookOn
} => {
  const propsRef = shallowRef<ComponentProps<C>>({} as ComponentProps<C>)
  const revealed = ref(true)

  const {
    dialogAdd,
    dialogRemove,
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

  const setProps = (props: ComponentProps<C> | null) => {
    if(!props) {
      propsRef.value = {}
      return
    }
    for (const prop in props) {
      propsRef.value[prop] = props[prop]
    }
  }
  setProps(props)


  const close = () => {
    revealed.value = false
    dialogRemove(DIALOG_ID)
  }

  const closeAll = () =>{
    dialogsStore.forEach(comp => {
      comp.revealed.value = false
    })
    removeAll()
  }

  // update props in case if the same dialog 
  // called more than once and props changed
  onReveal((props?: ComponentProps<C>) => {
    revealed.value = true
    if (props) setProps(props)

    dialogAdd({
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
    dialogRemove(DIALOG_ID)
  })

  return {
    close,
    closeAll,
    reveal,
    isRevealed: computed(() => revealed.value),
    hasOpenedDialogs: computed(() => dialogsStore.length > 0),
    onConfirm,
    onCancel,
  }
}