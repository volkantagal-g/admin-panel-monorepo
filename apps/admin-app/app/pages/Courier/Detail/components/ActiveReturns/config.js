import moment from 'moment';

import { getLocalDateTimeFormat } from '@shared/utils/localization';
import { GETIR_LOCALS_DOMAIN_TYPE } from '@shared/shared/constants';
import { domainTypes } from '@shared/shared/constantValues';
import { getLangKey } from '@shared/i18n';

import { imgArray } from '@app/pages/ArtisanOrder/Detail/util';
import { ROUTE } from '@app/routes';
import { DetailButton } from '@shared/components/UI/List';

export const tableColumns = t => [
  {
    title: t('RESERVED_DATE'),
    dataIndex: 'requestedDate',
    width: 100,
    key: 'requestedDate',
    render: requestedDate => moment(requestedDate).format(getLocalDateTimeFormat()),
  },
  {
    title: t('global:DOMAIN_TYPE'),
    width: 75,
    render: () => domainTypes[GETIR_LOCALS_DOMAIN_TYPE][getLangKey()],
  },
  {
    title: t('BATCH_INDEX'),
    width: 75,
    dataIndex: 'batchIndex',
    key: 'batchIndex',
    align: 'right',
    render: batchIndex => {
      const imgSrc = imgArray[batchIndex - 1];
      return (
        <span>
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
    dataIndex: 'orderId',
    key: 'orderId',
    width: 50,
    render: orderId => {
      return DetailButton({
        _id: orderId,
        urlPath: ROUTE.ARTISAN_ORDER_DETAIL.path.replace(':orderDetailId', ''),
      });
    },
  },
];
