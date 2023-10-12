import { Ref, Component, VNodeProps, AllowedComponentProps } from 'vue'


export type ComponentProps<C extends Component> = C extends new (...args: any) => any
  ? Omit<InstanceType<C>['$props'], keyof VNodeProps | keyof AllowedComponentProps>
  : never

  
export type UseDialogContainerReturn = {
  dialogsStore: DialogData<any>[]
  addDialog: (dialogData: DialogData<any>) => void,
  removeDialog: (id: number) => void,
  removeAll: () => void
}

export type DialogData<C extends Component> = {
  id: number
  component: C
  isRevealed: Ref<boolean>
  revealed: Ref<boolean>
  props: ComponentProps<C>,
  confirm: (props?: ComponentProps<C>) => void
  cancel: (props?: ComponentProps<C>) => void
  close: () => void,
}