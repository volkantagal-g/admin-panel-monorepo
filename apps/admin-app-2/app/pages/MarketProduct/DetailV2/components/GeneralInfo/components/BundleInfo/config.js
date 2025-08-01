import { Row, Col } from 'antd';
import { get } from 'lodash';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { getLangKey, t } from '@shared/i18n';
import { ROUTE } from '@app/routes';
import { Button, Image } from '@shared/components/GUI';

export const getTableColumns = (handleEdit, handleRemove, isTableEditable) => {
  const columns = [
    { key: 'sort', align: 'center', width: 20 },
    {
      title: t('global:IMAGE'),
      width: 60,
      render: ({ product }) => {
        const image = get(product, ['picURL', getLangKey()]);
        return (
          <Image src={image} height={32} alt={`marketProductImage-${product._id}`} />
        );
      },
    },
    {
      title: t('global:NAME_1'),
      width: 200,
      render: ({ product }) => {
        const path = ROUTE.MARKET_PRODUCT_DETAIL.path.replace(':id', product?._id);
        const productName = get(product, ['fullName'])
          ? get(product, ['fullName', getLangKey()]) :
          get(product, ['name', getLangKey()]);
        return (
          <Link to={path} target="blank">
            {productName}
          </Link>
        );
      },
    },
    {
      title: t('marketProductPageV2:BUNDLE_INFO.COUNT'),
      width: 80,
      render: ({ count }) => {
        return count;
      },
    },
    {
      title: t('marketProductPageV2:BUNDLE_INFO.SORT'),
      width: 40,
      render: ({ sort }) => {
        return sort;
      },
    },
    {
      title: t('global:ACTION'),
      align: 'right',
      width: 80,
      render: record => {
        return (
          <Row>
            <Col span={12}>
              <Button
                size="small"
                color="secondary"
                disabled={!isTableEditable}
                icon={<EditOutlined />}
                onClick={() => handleEdit(record)}
              />
            </Col>
            <Col span={12}>
              <Button
                size="small"
                color="danger"
                disabled={!isTableEditable}
                icon={<DeleteOutlined />}
                onClick={() => handleRemove(record)}
              />
            </Col>
          </Row>
        );
      },
    },
  ];

  return columns;
};
