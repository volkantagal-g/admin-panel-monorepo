import { isEmpty } from 'lodash';
import moment from 'moment-timezone';

import { getLangKey } from '@shared/i18n';

export const formatMissingProductOrders = (orders = []) => {
  if (orders.length) {
    return orders.map(order => {
      const { client, warehouse, enteredAt, basketAmount, missingProductAmount } = order;
      const { gsmWithoutCountryCode: gsm, name: clientName } = client;
      const { name: warehouseName } = warehouse;
      const waitTime = moment.duration(moment().diff(moment(enteredAt))).humanize();
      return { ...order, clientName, gsm, warehouseName, enteredAt, basketAmount, missingProductAmount, waitTime };
    });
  }
  return orders;
};

export const getFilteredOrders = (orders = [], searchTerm) => {
  return orders.filter(order => {
    const { clientName, warehouseName, mhProblem, missingProducts } = order;
    return warehouseName?.toLowerCase()?.includes(searchTerm?.toLowerCase())
        || mhProblem?.adminUser?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
        || clientName?.toLowerCase()?.includes(searchTerm?.toLowerCase())
        || !isEmpty(missingProducts?.filter(product => product?.name?.[getLangKey()]?.toLowerCase()?.includes(searchTerm?.toLowerCase())))
        || order?._id?.includes(searchTerm);
  });
};
