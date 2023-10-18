import { useDialog } from './useDialog'
import { useDialogContainer } from './useDialogContainer'
import DialogContainer from './components/DialogContainer.vue'

import { App } from 'vue'

const install = (app: App) => {
  app.component('DialogContainer', DialogContainer)
}
  
export {
  install as default,
  useDialog,
  useDialogContainer
}

