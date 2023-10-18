import { Ref, Component, VNodeProps, AllowedComponentProps } from 'vue'


export type ComponentProps<C extends Component> = C extends new (...args: any) => any
  ? Omit<InstanceType<C>['$props'], keyof VNodeProps | keyof AllowedComponentProps>
  : never

  
export type UseDialogContainerReturn = {
  dialogsStore: DialogData<any>[]
  dialogAdd: (dialogData: DialogData<any>) => void,
  dialogRemove: (id: number | string) => void,
  removeAll: () => void
}

export type DialogData<C extends Component> = {
  id: number | string
  component: C
  isRevealed: Ref<boolean>
  revealed: Ref<boolean>
  props: ComponentProps<C>,
  confirm: (props?: ComponentProps<C>) => void
  cancel: (props?: ComponentProps<C>) => void
  close: () => void,
}