import { Row, Col } from 'antd';
import { get } from 'lodash';
import { Link } from 'react-router-dom';

import { getLangKey, t } from '@shared/i18n';
import { ROUTE } from '@app/routes';
import { Button, Tag } from '@shared/components/GUI';

import trash from '@shared/assets/GUI/Icons/Solid/Trash.svg';
import externalLink from '@shared/assets/GUI/Icons/Outline/external-link.svg';
import { MARKET_PRODUCT_CATEGORY_STATUS } from '@shared/shared/constants';
import { marketProductCategoryStatuses } from '@shared/shared/constantValues';

export const getPositionTableColumns = ({
  isMainCategoryFunc,
  makeMainCategory,
  deleteCategoryPosition,
  isTableEditable,
}) => {
  const columns = [
    {
      title: t('marketProductPageV2:POSITION_INFO.CATEGORY'),
      dataIndex: 'category',
      key: 'category',
      width: 160,
      render: category => {
        const marketProductCategoryId = get(category, '_id', '');
        const status = get(category, 'status');
        const path = ROUTE.MARKET_PRODUCT_CATEGORY_DETAIL.path.replace(':id', marketProductCategoryId);
        const tagColor = MARKET_PRODUCT_CATEGORY_STATUS.ACTIVE === status ? 'active' : 'danger';
        const statusText = get(marketProductCategoryStatuses, [status, getLangKey()], '');

        return (
          <Link to={path}>
            {get(category, ['name', getLangKey()], '')}
            <Tag style={{ marginLeft: '1em' }} key={status} color={tagColor}>
              {statusText}
            </Tag>
          </Link>
        );
      },
    },
    {
      title: t('marketProductPageV2:POSITION_INFO.SUB_CATEGORY'),
      dataIndex: 'subCategory',
      key: 'subCategory',
      width: 160,
      render: subCategory => {
        const marketProductCategoryId = get(subCategory, '_id', '');
        const status = get(subCategory, 'status');
        const path = ROUTE.MARKET_PRODUCT_CATEGORY_DETAIL.path.replace(':id', marketProductCategoryId);
        const tagColor = MARKET_PRODUCT_CATEGORY_STATUS.ACTIVE === status ? 'active' : 'danger';
        const statusText = get(marketProductCategoryStatuses, [status, getLangKey()], '');

        return (
          <Link to={path}>
            {get(subCategory, ['name', getLangKey()], '')}
            <Tag style={{ marginLeft: '1em' }} key={status} color={tagColor}>
              {statusText}
            </Tag>
          </Link>
        );
      },
    },
    {
      title: t('marketProductPageV2:POSITION_INFO.POSITION'),
      dataIndex: 'productPosition',
      key: 'productPosition',
      width: 60,
      render: (productPosition, row) => {
        const categoryId = row.category?._id;
        const subCategoryId = row.subCategory?._id;
        const path = ROUTE.MARKET_PRODUCT_SORT.path
          .replace(':subCategoryId', categoryId)
          .concat(`?scrollTo=subCategory-${subCategoryId}`);

        return (
          <Row gutter={8}>
            <Col flex={2}>{productPosition}</Col>
            <Col flex={0}>
              <Link to={path}>
                <img src={externalLink} alt="product sorting page" />
              </Link>
            </Col>
          </Row>
        );
      },
    },
    {
      title: t('global:ACTION'),
      align: 'right',
      width: 70,
      render: record => {
        const categoryId = get(record, 'category._id');
        const subCategoryId = get(record, 'subCategory._id');
        const subItemPosition = record.productPosition;
        const isMainCategory = isMainCategoryFunc(record);
        return (
          <Row gutter={12} align="end">
            <Col>
              {(isMainCategory || isTableEditable) && (
                <Button
                  size="small"
                  disabled={isMainCategory}
                  color="defaultWithoutBorder"
                  onClick={() => {
                    makeMainCategory(categoryId, subCategoryId, subItemPosition);
                  }}
                >
                  {isMainCategory ? t('marketProductPageV2:MAIN_CATEGORY') : t('marketProductPageV2:MAKE_MAIN_CATEGORY')}
                </Button>
              )}
            </Col>
            <Col>
              {!isMainCategory && isTableEditable && (
                <Button
                  noBackground
                  size="small"
                  color="danger"
                  icon={(<img src={trash} alt="trash-icon" />)}
                  onClick={() => {
                    deleteCategoryPosition(categoryId, subCategoryId);
                  }}
                />
              )}
            </Col>
          </Row>
        );
      },
    },
  ];
  return columns;
};
