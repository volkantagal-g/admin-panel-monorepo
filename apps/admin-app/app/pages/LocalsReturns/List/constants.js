export const GROUP_STATUS_LIST = [
  { tr: 'Aktif İadeler', en: 'Active Returns', value: 'active' },
  { tr: 'Tamamlanmış İadeler', en: 'Completed Returns', value: 'completed' },
  { tr: 'Ret İadeler', en: 'Rejected Returns', value: 'reject' },
  { tr: 'İptal İadeler', en: 'Canceled Returns', value: 'cancel' },
];

export const LOCALS_RETURN_DELIVERY_TYPES = [
  { tr: 'Kuryeye Teslim', en: 'Courier Delivery', hint: 'REFUND_TO_COURIER', value: '1' },
  { tr: 'Mağazaya Teslim', en: 'Store Delivery', hint: 'REFUND_TO_SHOP', value: '2' },
  { tr: 'Anında Para İadesi', en: 'Instant Money Refund', hint: 'INSTANT_MONEY_REFUND', value: '3' },
];

export const LOCALS_RETURN_USER_TYPES = [
  { tr: 'Getir', en: 'Getir', hint: 'User Type Admin', value: '1' },
  { tr: 'Müşteri', en: 'Customer', hint: 'User Type Customer', value: '3' },
];

export const SORT_OPTIONS = {
  requestedDate_descend: 'REQUESTED_DATE_DESC',
  requestedDate_ascend: 'REQUESTED_DATE_ASC',
  selectedSlotDate_descend: 'RETURN_SLOT_DESC',
  selectedSlotDate_ascend: 'RETURN_SLOT_ASC',
};
