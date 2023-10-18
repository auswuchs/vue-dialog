# Programmatically-callable vue-dialog


## Installation

### Install the plugin

```bash
npm i vue-dialog
```

### Add it to you vue app as a plugin

```ts
// Vue 3
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import VueDialog from 'vue-dialog'
import 'vue-dialog/dist/style.css'

const app = createApp(App)

app.use(VueDialog)

app.mount('#app')
```

```ts
// Nuxt 3
// plugins/vue-dialog.ts

import { defineNuxtPlugin } from 'nuxt/app'
import VueDialog from 'vue-dialog'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueDialog)
})
```


### Add `DialogWrapper` to `App.vue` template:

```html
<!-- App.vue -->
<template>
  <div class="app" ></div>

  <!-- Don't have to import the component -->
  <!-- Just place wherever you want -->
  <DialogWrapper />
</template>
```


## Usage

Dialog component must contain emits `confirm` and `cancel` to work properly.

```html
<!-- Dialog.vue -->
<script setup>
  const emit = defineEmits(['confirm', 'cancel'])
</script>

<template>
  <div>
    <button @click="emit('confirm', { name: 'Auswuchs' })">Confirm</button>
    <button @click="emit('cancel', { number: 123 })">Cancel</button>
  </div>
</template>
```


```html
<script setup>
import Dialog from './Dialog.vue'
import { useDialog } from 'vue-dialog'


const handleDialog = () => {
  const { reveal, onConfirm, onCancel } = useDialog(Dialog)
  reveal()

  onConfirm((data) => {
    console.log(data) // { name: 'Auswuchs' }
  })
  onCancel((data) => {
    console.log(data) // { number: 123 }
  })
}
</script>
```

or

```html
<script setup>
import Dialog from './Dialog.vue'
import { useDialog } from 'vue-dialog'


const handleDialog = async () => {
  const { data, isCanceled } = await useDialog(Dialog).reveal()

  console.log(data) // { name: 'Auswuchs' }
  console.log(isCanceled) // true/false
}
</script>
```

## Passing data from/to dialog

You can pass props to dialog component as the second argument of the `useDialog` composable. Data must be an object with component props. 
For example, if a component has a prop with the name `detail` we can pass it like this `{ detail: { ... } }`.

```javascript
const dialog = useDialog(
  Dialog,
  { detail: { ... } },
)
```
