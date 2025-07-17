import { get } from 'lodash';
import { Col, Row } from 'antd';

import { Link } from 'react-router-dom';

import { ROUTE } from '@app/routes';
import { MARKET_PRODUCT_STATUS } from '@shared/shared/constants';
import { marketProductStatuses } from '@shared/shared/constantValues';
import { getLangKey } from '@shared/i18n';
import { Tag } from '@shared/components/GUI';

import externalLink from '@shared/assets/GUI/Icons/Outline/external-link.svg';

export const getBundleProductsTableColumns = t => (
  [
    {
      title: t('PRODUCT_SETTINGS.BUNDLE_PRODUCTS_MODAL.NAME'),
      dataIndex: 'name',
      key: 'name',
      width: '100%',
      render: (nameObj, row) => {
        const name = get(nameObj, getLangKey(), '');
        const id = row._id;
        const path = ROUTE.MARKET_PRODUCT_DETAIL.path.replace(':id', id);

        return (
          <Row>
            <Col flex={1}>{name}</Col>
            <Col flex={0}>
              <Link to={path} target="_blank" rel="noopener noreferrer">
                <img src={externalLink} alt="" />
              </Link>
            </Col>
          </Row>
        );
      },
    },
    {
      title: t('PRODUCT_SETTINGS.BUNDLE_PRODUCTS_MODAL.STATUS'),
      dataIndex: 'status',
      key: 'status',
      render: status => {
        const statusText = get(marketProductStatuses, [status, getLangKey()], '');
        const tagColor = MARKET_PRODUCT_STATUS.ACTIVE === status ? 'active' : 'danger';

        return (
          <Tag key={status} color={tagColor}>
            {statusText}
          </Tag>
        );
      },
    },
  ]
);
