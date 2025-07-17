import { get } from 'lodash';

import { getLangKey } from '@shared/i18n';
import { ROUTE } from '@app/routes';
import { marketProductStatuses } from '@shared/shared/constantValues';
import { MARKET_PRODUCT_STATUS } from '@shared/shared/constants';
import { getirMarketDomainTypes } from '@app/pages/MarketProduct/constantValues';
import { Button, Tag } from '@shared/components/GUI';

const statusTagColor = {
  [MARKET_PRODUCT_STATUS.ACTIVE]: 'active',
  [MARKET_PRODUCT_STATUS.INACTIVE]: 'danger',
  [MARKET_PRODUCT_STATUS.ARCHIVED]: 'inactive',
};

export const tableColumns = t => {
  return [
    {
      title: t('global:NAME_1'),
      dataIndex: 'fullName',
      key: 'fullName',
      width: 200,
      render: fullName => {
        return get(fullName, [getLangKey()], '');
      },
    },
    {
      title: t('SERVICE_TARGETS'),
      dataIndex: 'domainTypes',
      key: 'domainTypes',
      width: 200,
      render: (domainTypes = []) => {
        return domainTypes.map(domainType => {
          const domainTypeText = get(getirMarketDomainTypes, [domainType, getLangKey()], '');
          return (
            <Tag key={domainType} color="secondary">{domainTypeText}</Tag>
          );
        });
      },
    },
    {
      title: t('BARCODES'),
      dataIndex: 'barcodes',
      key: 'barcodes',
      width: 80,
      render: (barcodes = []) => {
        return barcodes.join(' ');
      },
    },
    {
      title: t('STATUS'),
      dataIndex: 'status',
      key: 'status',
      width: 60,
      render: status => {
        const tagColor = get(statusTagColor, status, 'default');
        const statusText = get(marketProductStatuses, [status, getLangKey()], '');
        return (
          <Tag key={status} color={tagColor}>
            {statusText}
          </Tag>
        );
      },
    },
    {
      title: t('global:ACTION'),
      align: 'center',
      fixed: 'right',
      width: 80,
      render: record => {
        const action = {
          onDetailClick: () => {
            const marketProductId = get(record, '_id', '');
            const path = ROUTE.MARKET_PRODUCT_DETAIL.path.replace(':id', marketProductId);
            window.open(path, '_blank');
          },
        };

        return (
          <Button type="default" size="small" onClick={action.onDetailClick}>
            {t('global:DETAIL')}
          </Button>
        );
      },
    },
  ];
};
