import moment from 'moment';
import { get as _get } from 'lodash';

import {
  COURIER_STATUS_BUSY,
  COURIER_STATUS_CANCELED,
  COURIER_STATUS_FREE,
  COURIER_STATUS_REACHED,
  COURIER_STATUS_RETURNING,
  COURIER_STATUS_VERIFYING,
} from '@shared/shared/constants';
import { getLangKey, t } from '@shared/i18n';
import { courierStatuses } from '@shared/shared/constantValues';
import { numberFormatWithoutDecimal } from '@app/pages/ArtisanOrder/LiveMap/utils';

export const getFormattedCouriersAndCalculatedStats = (couriers = []) => {
  const stats = {
    total: 0,
    free: 0,
    busy: 0,
    returning: 0,
    onDuty: 0,
    utilized: 0,
  };

  couriers?.forEach(courier => {
    let tableOrder = 0;
    stats.total += 1;
    if (courier.status === COURIER_STATUS_BUSY) {
      tableOrder = 1;
      stats.busy += 1;
    }
    Object.assign(courier, { tableOrder });

    if (courier.status === COURIER_STATUS_FREE) {
      stats.free += 1;
    }
    if (courier.status === COURIER_STATUS_RETURNING) {
      stats.returning += 1;
      stats.utilized += 1;
    }
    if (
      (courier.status >= COURIER_STATUS_VERIFYING && courier.status <= COURIER_STATUS_REACHED) ||
      courier.status === COURIER_STATUS_CANCELED
    ) {
      stats.onDuty += 1;
      stats.utilized += 1;
    }
  });

  stats.utilizationRate = numberFormatWithoutDecimal.format(((stats.utilized ?? 0) / ((stats.total - stats.busy) ?? 1)) * 100);

  return { couriers, stats };
};

export const getFormattedSelectedPlaceMark = ({ data, type } = {}) => {
  let tableData = [];
  if (type === 'courier') {
    const {
      name,
      gsm,
      status,
      lastBusyOption,
      statusLastChangedAt,
      location,
      fleetVehiclePlate,
    } = data;

    let busyReasonText = null;
    if (status === COURIER_STATUS_BUSY) {
      busyReasonText = _get(lastBusyOption, getLangKey(), '-');
      if (_get(lastBusyOption, 'comment')) {
        busyReasonText = `${busyReasonText} - ${_get(lastBusyOption, 'comment')}`;
      }
    }

    tableData = [
      {
        key: '10',
        name: t('global:NAME_1'),
        detail: name,
      },
      {
        key: '20',
        name: t('global:GSM'),
        detail: gsm,
      },
      {
        key: '30',
        name: t('global:STATUS'),
        detail: courierStatuses[status] && courierStatuses[status][getLangKey()],
      },
      ...(busyReasonText ?
        [
          {
            key: '40',
            name: t('global:REASON'),
            detail: busyReasonText,
          },
        ] :
        []),
      {
        key: '50',
        name: t('global:LAST_STATUS'),
        detail: `${moment(statusLastChangedAt).locale(getLangKey()).fromNow()} (${moment(statusLastChangedAt).format('HH:mm')})`,
      },
      {
        key: '60',
        name: t('global:LAST_COORD_TIME'),
        detail: `${moment(location.time).locale(getLangKey()).fromNow()} (${moment(location.time).format('HH:mm')})`,
      },
      {
        key: '90',
        name: t('global:PLATE'),
        detail: fleetVehiclePlate || '-',
      },
    ];
  }

  return tableData;
};

export const getReverseCoordinate = coords => [...coords].reverse();

export const getReversedCoordinates = (coordinates = []) => {
  const tempCoordinates = [];
  if (coordinates.length > 0) {
    coordinates[0].forEach(coordinate => {
      tempCoordinates.push(getReverseCoordinate(coordinate));
    });
  }
  return [tempCoordinates];
};
