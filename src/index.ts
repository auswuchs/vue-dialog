import { useDialog } from './useDialog'
import DialogWrapper from './DialogWrapper.vue'

import type { UseDialogWrapperReturn, DialogData } from './useDialogWrapper'
import type { ComponentProps } from './useDialog'
import { App } from 'vue'

export default {
  install(app: App) {
    app.component('DialogWrapper', DialogWrapper)
  },

  useDialog, 
  DialogWrapper, 
}

export { ComponentProps, UseDialogWrapperReturn, DialogData }

