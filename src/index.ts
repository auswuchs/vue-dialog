import { useDialog } from './useDialog'
import DialogWrapper from './DialogContainer.vue'

import { App } from 'vue'


function install(app: App) {
  app.component('DialogWrapper', DialogWrapper)
}

export default {
  install
}
export { useDialog }

