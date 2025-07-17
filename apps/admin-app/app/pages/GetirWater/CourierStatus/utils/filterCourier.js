import moment from 'moment';
import { isArray } from 'lodash';

export const filterCouriers = (couriers, filter) => {
  const nowDate = moment();
  const minLastStatusMinute = 120;

  if (isArray(couriers) && couriers.length > 0) {
    const isCouriersAvaiable = couriers.filter(courier => {
      const lastStatusDate = moment(courier.statusLastChangedAt);
      const diff = nowDate.diff(lastStatusDate, 'minutes');
      return diff <= minLastStatusMinute && courier.isActivated && courier.isLoggedIn && (filter.length > 0 ? filter.includes(courier.status) : true);
    });

    return isCouriersAvaiable;
  }
  return [];
};
