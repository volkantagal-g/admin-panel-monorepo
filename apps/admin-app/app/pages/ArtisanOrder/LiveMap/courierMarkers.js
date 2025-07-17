import motoCourierFree from '@shared/assets/markers/artisan_moto_courier_free.png';
import motoCourierBusy from '@shared/assets/markers/artisan_moto_courier_busy.png';
import motoCourierLongBusy from '@shared/assets/markers/artisan_moto_courier_long_busy.png';
import motoCourierLongCancelled from '@shared/assets/markers/artisan_moto_courier_long_cancelled.png';
import motoCourierOnOrder from '@shared/assets/markers/artisan_moto_courier_on_order.png';
import motoCourierReturning from '@shared/assets/markers/artisan_moto_courier_returning.png';
import motoCourierSteady from '@shared/assets/markers/artisan_moto_courier_steady.png';
import motoCourierLongAvailable from '@shared/assets/markers/artisan_moto_courier_long_available.png';
import vanCourierFree from '@shared/assets/markers/artisan_van_courier_free.png';
import vanCourierBusy from '@shared/assets/markers/artisan_van_courier_busy.png';
import vanCourierLongBusy from '@shared/assets/markers/artisan_van_courier_long_busy.png';
import vanCourierLongCancelled from '@shared/assets/markers/artisan_van_courier_long_cancelled.png';
import vanCourierOnOrder from '@shared/assets/markers/artisan_van_courier_on_order.png';
import vanCourierReturning from '@shared/assets/markers/artisan_van_courier_returning.png';
import vanCourierSteady from '@shared/assets/markers/artisan_van_courier_steady.png';
import vanCourierLongAvailable from '@shared/assets/markers/artisan_van_courier_long_available.png';
import returnMotoCourierSteady from '@shared/assets/markers/artisan_return_moto_courier_alert.png';
import returnMotoCourierCancelled from '@shared/assets/markers/artisan_return_moto_courier_cancel.png';
import returnMotoCourierOnReturn from '@shared/assets/markers/artisan_return_moto_courier_on_return.png';
import returnVanCourierSteady from '@shared/assets/markers/artisan_return_van_courier_alert.png';
import returnVanCourierCancelled from '@shared/assets/markers/artisan_return_van_courier_cancel.png';
import returnVanCourierOnReturn from '@shared/assets/markers/artisan_return_van_courier_on_return.png';

import {
  COURIER_STATUS_RETURNING,
  COURIER_STATUS_BUSY,
  COURIER_STATUS_FREE,
  COURIER_STATUS_ONWAY,
  COURIER_STATUS_VERIFYING,
  COURIER_STATUS_REACHED,
  COURIER_STATUS_GATHERING,
  COURIER_STATUS_REACHED_TO_RESTAURANT,
  COURIER_STATUS_PREPARING,
  COURIER_STATUS_STEADY,
  COURIER_STATUS_STEADY_RETURN,
  COURIER_STATUS_LONG_BUSY,
  COURIER_STATUS_LONG_CANCELLED,
  COURIER_STATUS_LONG_AVAILABLE,
  COURIER_RETURN_STATUS_SLOT_VERIFY,
  COURIER_RETURN_STATUS_ONWAY_TO_PICKUP,
  COURIER_RETURN_STATUS_PICKUP_FROM_CLIENT,
  COURIER_RETURN_STATUS_ONWAY_TO_DELIVER,
  COURIER_RETURN_STATUS_DELIVER_TO_SHOP,
  COURIER_RETURN_STATUS_SLOT_DELIVER_AND_WAIT,
  COURIER_RETURN_STATUS_CANCELED,
  VEHICLE_TYPE,
  COURIER_STATUS_CANCELED,
} from '@shared/shared/constants';

export const artisanCourierMarkers = {
  [VEHICLE_TYPE.MOTO]: {
    [COURIER_STATUS_FREE]: motoCourierFree,
    [COURIER_STATUS_BUSY]: motoCourierBusy,
    [COURIER_STATUS_LONG_BUSY]: motoCourierLongBusy,
    [COURIER_STATUS_LONG_CANCELLED]: motoCourierLongCancelled,
    [COURIER_STATUS_RETURNING]: motoCourierReturning,
    [COURIER_STATUS_VERIFYING]: motoCourierOnOrder,
    [COURIER_STATUS_PREPARING]: motoCourierOnOrder,
    [COURIER_STATUS_REACHED_TO_RESTAURANT]: motoCourierOnOrder,
    [COURIER_STATUS_REACHED]: motoCourierOnOrder,
    [COURIER_STATUS_GATHERING]: motoCourierOnOrder,
    [COURIER_STATUS_ONWAY]: motoCourierOnOrder,
    [COURIER_STATUS_CANCELED]: motoCourierOnOrder,
    [COURIER_STATUS_STEADY]: motoCourierSteady,
    [COURIER_STATUS_STEADY_RETURN]: returnMotoCourierSteady,
    [COURIER_STATUS_LONG_AVAILABLE]: motoCourierLongAvailable,
    [COURIER_RETURN_STATUS_SLOT_VERIFY]: returnMotoCourierOnReturn,
    [COURIER_RETURN_STATUS_ONWAY_TO_PICKUP]: returnMotoCourierOnReturn,
    [COURIER_RETURN_STATUS_PICKUP_FROM_CLIENT]: returnMotoCourierOnReturn,
    [COURIER_RETURN_STATUS_ONWAY_TO_DELIVER]: returnMotoCourierOnReturn,
    [COURIER_RETURN_STATUS_DELIVER_TO_SHOP]: returnMotoCourierOnReturn,
    [COURIER_RETURN_STATUS_SLOT_DELIVER_AND_WAIT]: returnMotoCourierOnReturn,
    [COURIER_RETURN_STATUS_CANCELED]: returnMotoCourierCancelled,
  },
  [VEHICLE_TYPE.MOTO_50CC]: {
    [COURIER_STATUS_FREE]: motoCourierFree,
    [COURIER_STATUS_BUSY]: motoCourierBusy,
    [COURIER_STATUS_LONG_BUSY]: motoCourierLongBusy,
    [COURIER_STATUS_LONG_CANCELLED]: motoCourierLongCancelled,
    [COURIER_STATUS_RETURNING]: motoCourierReturning,
    [COURIER_STATUS_VERIFYING]: motoCourierOnOrder,
    [COURIER_STATUS_PREPARING]: motoCourierOnOrder,
    [COURIER_STATUS_REACHED_TO_RESTAURANT]: motoCourierOnOrder,
    [COURIER_STATUS_REACHED]: motoCourierOnOrder,
    [COURIER_STATUS_GATHERING]: motoCourierOnOrder,
    [COURIER_STATUS_ONWAY]: motoCourierOnOrder,
    [COURIER_STATUS_CANCELED]: motoCourierOnOrder,
    [COURIER_STATUS_STEADY]: motoCourierSteady,
    [COURIER_STATUS_STEADY_RETURN]: returnMotoCourierSteady,
    [COURIER_STATUS_LONG_AVAILABLE]: motoCourierLongAvailable,
    [COURIER_RETURN_STATUS_SLOT_VERIFY]: returnMotoCourierOnReturn,
    [COURIER_RETURN_STATUS_ONWAY_TO_PICKUP]: returnMotoCourierOnReturn,
    [COURIER_RETURN_STATUS_PICKUP_FROM_CLIENT]: returnMotoCourierOnReturn,
    [COURIER_RETURN_STATUS_ONWAY_TO_DELIVER]: returnMotoCourierOnReturn,
    [COURIER_RETURN_STATUS_DELIVER_TO_SHOP]: returnMotoCourierOnReturn,
    [COURIER_RETURN_STATUS_SLOT_DELIVER_AND_WAIT]: returnMotoCourierOnReturn,
    [COURIER_RETURN_STATUS_CANCELED]: returnMotoCourierCancelled,
  },
  [VEHICLE_TYPE.VAN]: {
    [COURIER_STATUS_FREE]: vanCourierFree,
    [COURIER_STATUS_BUSY]: vanCourierBusy,
    [COURIER_STATUS_LONG_BUSY]: vanCourierLongBusy,
    [COURIER_STATUS_LONG_CANCELLED]: vanCourierLongCancelled,
    [COURIER_STATUS_RETURNING]: vanCourierReturning,
    [COURIER_STATUS_VERIFYING]: vanCourierOnOrder,
    [COURIER_STATUS_PREPARING]: vanCourierOnOrder,
    [COURIER_STATUS_REACHED_TO_RESTAURANT]: vanCourierOnOrder,
    [COURIER_STATUS_REACHED]: vanCourierOnOrder,
    [COURIER_STATUS_GATHERING]: vanCourierOnOrder,
    [COURIER_STATUS_ONWAY]: vanCourierOnOrder,
    [COURIER_STATUS_CANCELED]: vanCourierOnOrder,
    [COURIER_STATUS_STEADY]: vanCourierSteady,
    [COURIER_STATUS_STEADY_RETURN]: returnVanCourierSteady,
    [COURIER_STATUS_LONG_AVAILABLE]: vanCourierLongAvailable,
    [COURIER_RETURN_STATUS_SLOT_VERIFY]: returnVanCourierOnReturn,
    [COURIER_RETURN_STATUS_ONWAY_TO_PICKUP]: returnVanCourierOnReturn,
    [COURIER_RETURN_STATUS_PICKUP_FROM_CLIENT]: returnVanCourierOnReturn,
    [COURIER_RETURN_STATUS_ONWAY_TO_DELIVER]: returnVanCourierOnReturn,
    [COURIER_RETURN_STATUS_DELIVER_TO_SHOP]: returnVanCourierOnReturn,
    [COURIER_RETURN_STATUS_SLOT_DELIVER_AND_WAIT]: returnVanCourierOnReturn,
    [COURIER_RETURN_STATUS_CANCELED]: returnVanCourierCancelled,
  },
};
