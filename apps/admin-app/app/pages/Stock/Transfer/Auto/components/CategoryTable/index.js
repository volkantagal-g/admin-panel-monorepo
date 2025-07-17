import { useEffect, useState } from 'react';
import { Row, Col, Table, Collapse } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { forEach } from 'lodash';

import { Creators } from '@app/pages/Stock/Transfer/Auto/redux/actions';
import { getMarketProductMasterCategoriesOldSelector } from '@app/pages/Stock/Transfer/Auto/redux/selectors';
import { PRODUCT_CATEGORY_STATUS_ACTIVE } from '@app/pages/Stock/Transfer/constants';
import { generateColumns } from './config';

const PARAMS_DEFAULT_VALUES = {
  STOCK_DAY: 21,
  IGNORE_CURRENT_STOCK: false,
  DEMAND_MULTIPLIER: 7,
};

const { Panel } = Collapse;

const CategoryTable = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('stockTransferAuto');
  const productCategories = useSelector(getMarketProductMasterCategoriesOldSelector.getMarketProductMasterCategoriesOld);

  const [wrappedCategories, setWrappedCategories] = useState([]);

  useEffect(() => {
    if (productCategories) {
      const updatedProductCategories = productCategories
        .filter(pCategory => pCategory.status === PRODUCT_CATEGORY_STATUS_ACTIVE)
        .map(productCategory => ({
          ...productCategory,
          stockDay: PARAMS_DEFAULT_VALUES.STOCK_DAY,
          ignoreStock: PARAMS_DEFAULT_VALUES.IGNORE_CURRENT_STOCK,
          growRate: PARAMS_DEFAULT_VALUES.DEMAND_MULTIPLIER,
        }));
      setWrappedCategories(updatedProductCategories);
    }
  }, [productCategories]);

  useEffect(() => {
    const wrappedCategoryParams = {};
    const filteredCategories = wrappedCategories.filter(wrappedCategory => wrappedCategory.itemParamEnabled);
    forEach(filteredCategories, category => {
      if (
        !category.isSubCategory &&
        category.status === PRODUCT_CATEGORY_STATUS_ACTIVE
      ) {
        wrappedCategoryParams[category._id] = {
          name: category.name,
          isSelected: false,
          stockDay: category.stockDay,
          ignoreStock: category.ignoreStock,
          growRate: category.growRate,
        };
      }
    });
    dispatch(Creators.setCategoryParams({ data: wrappedCategoryParams }));
  }, [dispatch, wrappedCategories]);

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Collapse accordion>
          <Panel header={t('CATEGORY')} key="1">
            <Table
              dataSource={wrappedCategories}
              columns={generateColumns(t, wrappedCategories, setWrappedCategories)}
              bordered
              scroll={{ x: 1000 }}
              size="small"
              pagination={false}
            />
          </Panel>
        </Collapse>
      </Col>
    </Row>
  );
};

export default CategoryTable;
