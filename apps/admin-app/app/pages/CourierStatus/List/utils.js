import moment from 'moment';

import { getLimitAndOffset } from '@shared/utils/common';
import {
  COURIER_STATUS_FREE,
  COURIER_STATUS_BUSY,
} from '@shared/shared/constants';

export const vehicleStatusAndBusyRequestParams = ({ domains, status, warehouse, reason, fields, rowsPerPage, currentPage }) => {
  const params = {};
  const { limit, offset } = getLimitAndOffset({ rowsPerPage, currentPage });

  if (domains.length > 0) {
    params.domainTypes = domains;
  }

  if (status) {
    params.statuses = [status];
  }

  if (warehouse && warehouse.length > 0) {
    params.warehouseIds = warehouse;
  }

  if (reason) {
    params.lastBusyOption = reason;
  }
  params.limit = limit;
  params.offset = offset;
  params.fields = fields;
  params.withTotalCount = true;
  return params;
};

export const getStatusColorForList = status => {
  if (status === COURIER_STATUS_FREE) return 'green';
  if (status === COURIER_STATUS_BUSY) return 'red';

  return 'orange';
};

export const calculateTimeSpent = (t, lastDate) => {
  if (lastDate) {
    const old = moment(lastDate);
    const hrs = moment().diff(old, 'hours');
    return <div>{Math.trunc(hrs)} {t('courierStatusAndBusy:HOURS')}</div>;
  }
  return null;
};
