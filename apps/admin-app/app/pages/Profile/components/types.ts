export type ActionButtonPropTypes = {
  isFormEditable: boolean,
  isPending: boolean,
  onCancel: () => void,
  onEdit: () => void,
  onSave: () => void,
  editBtnText?: string
}
