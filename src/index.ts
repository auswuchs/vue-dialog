import { useDialog } from './useDialog'
import DialogWrapper from './DialogWrapper.vue'

import type { UseDialogWrapperReturn, DialogData } from './useDialogWrapper'
import type { ComponentProps } from './useDialog'
import { App } from 'vue'


function install(app: App) {
  app.component('DialogWrapper', DialogWrapper)
}


export { ComponentProps, UseDialogWrapperReturn, DialogData, useDialog, DialogWrapper, install }

