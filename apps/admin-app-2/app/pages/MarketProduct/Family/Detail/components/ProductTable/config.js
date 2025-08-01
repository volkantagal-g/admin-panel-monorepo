import { get } from 'lodash';
import { StarFilled } from '@ant-design/icons';

import { getLangKey } from '@shared/i18n';
import { getirMarketDomainTypes } from '@app/pages/MarketProduct/constantValues';
import { marketProductStatuses } from '@shared/shared/constantValues';
import { MARKET_PRODUCT_STATUS } from '@shared/shared/constants';
import { Tag, Button } from '@shared/components/GUI';
import { ROUTE } from '@app/routes';

const statusTagColor = {
  [MARKET_PRODUCT_STATUS.ACTIVE]: 'active',
  [MARKET_PRODUCT_STATUS.INACTIVE]: 'danger',
  [MARKET_PRODUCT_STATUS.ARCHIVED]: 'inactive',
};

export const tableColumns = t => {
  return [
    {
      title: t('PRODUCT_TABLE.PRODUCT_NAME'),
      key: 'productName',
      render: ({ name, isLeadProduct }) => {
        const productName = get(name, [getLangKey()], '');
        const content = isLeadProduct ? <><span>{productName ?? '-'}</span> <StarFilled /></> : <span>{productName ?? '-'}</span>;
        return content;
      },
    },
    {
      title: t('PRODUCT_TABLE.SERVICE_TARGETS'),
      key: 'domainTypes',
      dataIndex: 'domainTypes',
      render: (domainTypes = []) => {
        return domainTypes?.map(domainType => {
          const domainTypeText = get(getirMarketDomainTypes, [domainType, getLangKey()], '');
          return (
            <Tag key={domainType} color="secondary">{domainTypeText}</Tag>
          );
        });
      },
    },
    {
      title: t('PRODUCT_TABLE.KVI_LABEL'),
      key: 'kviLabel',
      render: ({ kviLabel }) => kviLabel ?? '-',
    },
    {
      title: t('PRODUCT_TABLE.CATEGORY_ROLE'),
      key: 'categoryRole',
      render: ({ categoryRole }) => categoryRole ?? '-',
    },
    {
      title: t('PRODUCT_TABLE.KVI_SCORE'),
      key: 'kviScore',
      render: ({ kviScore }) => kviScore ?? '-',
    },
    {
      title: t('PRODUCT_TABLE.STATUS'),
      dataIndex: 'status',
      key: 'status',
      render: status => {
        const tagColor = statusTagColor[status] ?? 'default';
        const statusText = get(marketProductStatuses, [status, getLangKey()], '');
        return (
          <Tag key={status} color={tagColor}>
            {statusText}
          </Tag>
        );
      },
    },
    {
      title: t('PRODUCT_TABLE.RECOMMENDATION_PRICE'),
      key: 'recommendationPrice',
      render: ({ recommendationPrice }) => recommendationPrice ?? '-',
    },
    {
      title: t('PRODUCT_TABLE.PRICE'),
      key: 'price',
      render: ({ price }) => price?.price ?? '-',
    },
    {
      title: t('global:ACTION'),
      key: 'action',
      align: 'center',
      fixed: 'right',
      width: 80,
      render: record => {
        const action = {
          onDetailClick: () => {
            const marketProductId = get(record, 'productId', '');
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
