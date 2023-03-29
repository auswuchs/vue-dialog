# Programmatically-callable vue-dialog


## Installation

### Install the plugin

```bash
npm i vue-dialog
```

### Add it to your main.js

```js
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import * as VueDialog from 'vue-dialog'

const app = createApp(App)

app.use(VueDialog)

app.mount('#app')
```

### Add `DialogWrapper` to `App.vue` template:

```html
<!-- App.vue -->
<template>
  <div class="app">
    ...
  </div>

  <!-- Don't have to need import the component -->
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
    <button @click="emit('confirm')">Confirm</button>
    <button @click="emit('cancel')">Cancel</button>
  </div>
</template>
```


```html
<script setup>
import Dialog from './Dialog.vue'
import { useDialog } from 'vue-dialog'


const handleDialog = async () => {
  const dialog = useDialog(useDialog)
  const { data, onConfirm, onCancel } = await dialog.reveal()

  onConfirm(() => {
    console.log('Confirmed!')
  })
  onCancel(() => {
    console.log('Canceled!')
  })

  console.log(data)
}
</script>
```

- `onConfirm` - hook gets a callback that runs after the user confirmed the dialog
- `onCancel` - hook gets a callback that runs if user dismissed the dialog



## Passing data from/to dialog

There are several ways to deal with data. First of all, you can pass data to the second argument of the `useDialog` composable. Data must be an object with component props. For example, if a component has a prop with the name `deail` we can pass this `{ detail: { ... } }`.

If you don't set the props behavior options (third argument of `useDialog` composable), then each time you pass values, this data will be saved. For example, if you have an dialog component and you called it some data, then next time if you don't pass a new data, it will show this data again.

- `clear` - if `true` will tell to function reset values after closing dialog
- `keepInitial` - if `true` reset props values to initial values, otherwise to default values of the component

```javascript
  const dialog = useDialog(
    Dialog,
    { detail: { ... } },
    { clear: true, keepInitial: true }
  )
```

## Close dialogs programmable

```javascript
import Dialog from './Dialog.vue'
import { useDialog } from 'vuedialog'

const dialog = useDialog(Dialog)

const openDialog = () => {
  dialog.reveal()
}

const closeDialog = () => {
  dialog.close()
}
```

It doesn't trigger any hooks. If you need to close all dialog just call `dialog.closeAll()`.