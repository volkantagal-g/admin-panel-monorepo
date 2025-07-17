import moment from 'moment';

import { getLocalDateTimeFormat } from '@shared/utils/localization';
import {
  GETIR_FOOD_DOMAIN_TYPE,
  GETIR_LOCALS_DOMAIN_TYPE,
  GETIR_10_DOMAIN_TYPE,
  GETIR_MARKET_DOMAIN_TYPE,
  GETIR_FINANCE_DOMAIN_TYPE,
  GETIR_VOYAGER_DOMAIN_TYPE,
} from '@shared/shared/constants';
import { domainTypes } from '@shared/shared/constantValues';
import { getLangKey } from '@shared/i18n';

import { imgArray } from '@app/pages/ArtisanOrder/Detail/util';
import { ROUTE } from '@app/routes';
import { DetailButton } from '@shared/components/UI/List';

const findDomainTypeColumnName = domainType => {
  if (domainType === GETIR_LOCALS_DOMAIN_TYPE) return domainTypes[GETIR_LOCALS_DOMAIN_TYPE][getLangKey()];
  if (domainType === GETIR_10_DOMAIN_TYPE) return domainTypes[GETIR_10_DOMAIN_TYPE][getLangKey()];
  if (domainType === GETIR_MARKET_DOMAIN_TYPE) return domainTypes[GETIR_MARKET_DOMAIN_TYPE][getLangKey()];
  if (domainType === GETIR_FINANCE_DOMAIN_TYPE) return domainTypes[GETIR_FINANCE_DOMAIN_TYPE][getLangKey()];
  if (domainType === GETIR_FOOD_DOMAIN_TYPE) return domainTypes[GETIR_FOOD_DOMAIN_TYPE][getLangKey()];
  if (domainType === GETIR_VOYAGER_DOMAIN_TYPE) return domainTypes[GETIR_VOYAGER_DOMAIN_TYPE][getLangKey()];
  return '-';
};

const findDetailButtonUrl = domainType => {
  if (domainType === GETIR_LOCALS_DOMAIN_TYPE) return ROUTE.ARTISAN_ORDER_DETAIL.path.replace(':orderDetailId', '');
  if (domainType === GETIR_FOOD_DOMAIN_TYPE) return ROUTE.GETIR_FOOD_ORDER_DETAIL.path.replace(':orderDetailId', '');
  if (domainType === GETIR_FINANCE_DOMAIN_TYPE) return ROUTE.GETIR_FINANCE_ORDER_DETAIL.path.replace(':orderId', '');
  if (domainType === GETIR_10_DOMAIN_TYPE ||
    domainType === GETIR_MARKET_DOMAIN_TYPE ||
    domainType === GETIR_VOYAGER_DOMAIN_TYPE
  ) return ROUTE.GETIR_MARKET_ORDER_DETAIL.path.replace(':orderId', '');

  return '-';
};

export const tableColumns = t => [
  {
    title: t('global:DATE'),
    dataIndex: 'checkoutDate',
    width: 100,
    key: 'checkoutDate',
    render: date => moment(date).format(getLocalDateTimeFormat()),
  },
  {
    title: t('global:DOMAIN_TYPE'),
    dataIndex: 'domainType',
    width: 75,
    render: domainType => findDomainTypeColumnName(domainType),
  },
  {
    title: t('BATCH_INDEX'),
    width: 75,
    dataIndex: 'batchIndex',
    key: 'batchIndex',
    align: 'right',
    render: (batchIndex, { isActive }) => {
      const imgSrc = imgArray[batchIndex - 1];
      return (
        <span style={isActive ? { fontWeight: 'bold' } : undefined}>
          {batchIndex}
          <span className="pl-2">
            <img src={imgSrc} alt="Logo" />
          </span>
        </span>
      );
    },
  },
  {
    title: '#',
    dataIndex: 'id',
    key: 'domainType',
    width: 50,
    render: (id, { domainType }) => {
      const urlPath = findDetailButtonUrl(domainType);
      let idWithDomainType = id;

      if (domainType === GETIR_VOYAGER_DOMAIN_TYPE) {
        idWithDomainType = `${id}?domainType=${domainType}`;
      }

      return DetailButton({
        _id: idWithDomainType,
        urlPath,
      });
    },
  },
];
