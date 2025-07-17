import { Button, Tag, Row } from 'antd';
import { Link } from 'react-router-dom';
import { get } from 'lodash';

import { getLangKey } from '@shared/i18n';
import { ROUTE } from '@app/routes';
import { CopyToClipboard } from '@shared/components/UI/CopyToClipboard';
import { getirMarketDomainTypes } from '@app/pages/MarketProduct/constantValues';

export const getTableColumns = ({ t }) => [
  {
    title: t('global:NAME_1'),
    dataIndex: 'name',
    key: 'name',
    width: 200,
    render: name => {
      return (
        <Row>
          {get(name, [getLangKey()], '')}
        </Row>
      );
    },
  },
  {
    width: 100,
    dataIndex: 'activeness',
    key: 'activeness',
    render: activeness => {
      return (
        <Row>
          {activeness
            ? <Tag color="success">{t('global:ACTIVE')}</Tag>
            : <Tag color="error">{t('global:INACTIVE')}</Tag>}
        </Row>
      );
    },
  },
  {
    title: t('global:DOMAIN_TYPES'),
    dataIndex: 'domainTypes',
    key: 'domainTypes',
    width: 200,
    render: (domainTypes = []) => {
      return domainTypes.map(domainType => {
        const domainTypeText = get(getirMarketDomainTypes, [domainType, getLangKey()], '');
        return (
          <Tag key={domainType} color="processing">{domainTypeText}</Tag>
        );
      });
    },
  },
  {
    title: t('GROUP_ORDER'),
    dataIndex: 'order',
    key: 'order',
    width: 60,
    render: order => order,
  },
  {
    title: t('PRODUCT_COUNT'),
    dataIndex: 'productCount',
    key: 'productCount',
    width: 80,
    render: productCount => {
      return productCount;
    },
  },
  {
    title: t('USER_ID'),
    dataIndex: 'userId',
    key: 'userId',
    width: 200,
    render: userId => {
      return (
        <Row>
          {userId && <CopyToClipboard message={userId}>C</CopyToClipboard>}
        </Row>
      );
    },
  },
  {
    title: t('global:ACTION'),
    align: 'right',
    width: 80,
    render: record => {
      const path = ROUTE.MARKET_PRODUCT_GROUP_DETAIL.path.replace(':id', record?._id);

      return (
        <Link to={path}>
          <Button type="default" size="small">
            {t('global:DETAIL')}
          </Button>
        </Link>
      );
    },
  },
];
