import {
  COURIER_STATUS_VERIFYING,
  COURIER_STATUS_REACHED,
} from '@shared/shared/constants';

export const getIsCourierOnDuty = status => (
  status && status >= COURIER_STATUS_VERIFYING && status <= COURIER_STATUS_REACHED
);
