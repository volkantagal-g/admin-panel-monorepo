import courierMituGreen from '@shared/assets/markers/marker_mitu_green.png';
import courierMituRed from '@shared/assets/markers/marker_mitu_red.png';
import courierMituPrimary from '@shared/assets/markers/marker_mitu_primary.png';
import courierMituYellow from '@shared/assets/markers/marker_mitu_yellow.png';
import courierMarkerPrimary from '@shared/assets/markers/marker_moto_primary.png';
import courierMarkerGreen from '@shared/assets/markers/marker_moto_green.png';
import courierMarkerYellow from '@shared/assets/markers/marker_moto_yellow.png';
import courierMarkerRed from '@shared/assets/markers/marker_moto_red.png';
import {
  COURIER_STATUS_RETURNING,
  COURIER_STATUS_BUSY,
  COURIER_STATUS_FREE,
  COURIER_STATUS_ONWAY,
  COURIER_STATUS_VERIFYING,
  COURIER_STATUS_REACHED,
  COURIER_STATUS_GATHERING,
  COURIER_STATUS_REACHED_TO_RESTAURANT, COURIER_STATUS_PREPARING,
} from '@shared/shared/constants';

export const dedicatedCourierMarker = {
  [COURIER_STATUS_FREE]: courierMituGreen,
  [COURIER_STATUS_BUSY]: courierMituRed,
  [COURIER_STATUS_RETURNING]: courierMituYellow,
  [COURIER_STATUS_VERIFYING]: courierMituPrimary,
  [COURIER_STATUS_PREPARING]: courierMituPrimary,
  [COURIER_STATUS_REACHED_TO_RESTAURANT]: courierMituPrimary,
  [COURIER_STATUS_REACHED]: courierMituPrimary,
  [COURIER_STATUS_GATHERING]: courierMituPrimary,
  [COURIER_STATUS_ONWAY]: courierMituPrimary,
};

export const poolCourierMarker = {
  [COURIER_STATUS_FREE]: courierMarkerGreen,
  [COURIER_STATUS_BUSY]: courierMarkerRed,
  [COURIER_STATUS_RETURNING]: courierMarkerYellow,
  [COURIER_STATUS_VERIFYING]: courierMarkerPrimary,
  [COURIER_STATUS_PREPARING]: courierMarkerPrimary,
  [COURIER_STATUS_REACHED_TO_RESTAURANT]: courierMarkerPrimary,
  [COURIER_STATUS_GATHERING]: courierMarkerPrimary,
  [COURIER_STATUS_REACHED]: courierMarkerPrimary,
  [COURIER_STATUS_ONWAY]: courierMarkerPrimary,
};
