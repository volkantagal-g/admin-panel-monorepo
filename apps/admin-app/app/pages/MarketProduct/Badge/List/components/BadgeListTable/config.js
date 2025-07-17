import { Row, Col, Button, Tag } from 'antd';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import { getLangKey, t } from '@shared/i18n';
import { ROUTE } from '@app/routes';
import Image from '@shared/components/UI/Image';
import { badgePositions } from '@shared/shared/constantValues';
import { getirMarketDomainTypes } from '@app/pages/MarketProduct/constantValues';

export const getTableColumns = ({ handleBringProductsClick }) => {
  const columns = [
    {
      title: t('marketProductBadgePage:BADGE'),
      dataIndex: 'picUrl',
      key: 'picUrl',
      width: 60,
      render: (picUrl, { _id }) => {
        const image = _.get(picUrl, [getLangKey()], '');
        return (
          <Image src={image} height={32} alt={`badgeImage-${_id}`} />
        );
      },
    },
    {
      title: t('global:NAME_1'),
      dataIndex: 'name',
      key: 'name',
      width: 160,
      render: name => {
        return name;
      },
    },
    {
      title: t('global:DESCRIPTION'),
      dataIndex: 'description',
      key: 'description',
      width: 240,
      render: description => {
        return description;
      },
    },
    {
      title: t('marketProductBadgePage:POSITION'),
      dataIndex: 'position',
      key: 'position',
      width: 80,
      render: position => {
        const positionName = _.get(badgePositions, [position, getLangKey()]);
        return positionName;
      },
    },
    {
      title: t('global:DOMAIN_TYPES'),
      dataIndex: 'domainTypes',
      key: 'domainTypes',
      width: 200,
      render: (domainTypes = []) => {
        return domainTypes.map(domainType => {
          const domainTypeText = _.get(getirMarketDomainTypes, [domainType, getLangKey()], '');
          return (
            <Tag key={domainType} color="processing">{domainTypeText}</Tag>
          );
        });
      },
    },
    {
      title: t('marketProductBadgePage:STATUS'),
      dataIndex: 'isActive',
      key: 'isActive',
      width: 80,
      render: isActive => {
        const text = isActive ? t('global:ACTIVE') : t('global:INACTIVE');
        const color = isActive ? 'success' : 'error';
        return (
          <Tag color={color}>
            {text}
          </Tag>
        );
      },
    },
    {
      title: t('global:ACTION'),
      align: 'right',
      width: 80,
      render: record => {
        const badgeId = _.get(record, '_id', '');
        const action = { onBringClick: () => handleBringProductsClick(record) };
        const path = ROUTE.MARKET_PRODUCT_BADGE_DETAIL.path.replace(':id', badgeId);

        return (
          <Row gutter={[8]}>
            <Col>
              <Button type="default" size="small" onClick={action.onBringClick}>
                {t('marketProductBadgePage:BRING_PRODUCTS')}
              </Button>
            </Col>
            <Col>
              <Link to={path}>
                <Button type="default" size="small">
                  {t('global:DETAIL')}
                </Button>
              </Link>
            </Col>
          </Row>
        );
      },
    },
  ];
  return columns;
};
