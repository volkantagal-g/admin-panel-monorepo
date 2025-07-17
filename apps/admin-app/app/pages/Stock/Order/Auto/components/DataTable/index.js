import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Row, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import moment from 'moment';

import { getMarketProductsSelector } from '@shared/redux/selectors/common';
import { DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { Creators } from '@app/pages/Stock/Order/Auto/redux/actions';
import { supplierIdSelector } from '@app/pages/Stock/Order/Auto/redux/selectors';
import { generateColumns } from './config';
import useStyles from './styles';

const PARAMS_DEFAULT_VALUES = {
  DEMAND_RANGE: {
    startDate: moment().startOf('isoWeek').subtract(1, 'week'),
    endDate: moment().endOf('isoWeek').subtract(1, 'week'),
  },
  MAIN_STOCK_DAY: 14,
  MAIN_LEAD_DAY: 5,
  STORE_STOCK_DAY: 7,
  IGNORE_CURRENT_STOCK: false,
  PAST_STOCK_ORDER_DAY: moment().subtract(7, 'days').startOf('day'),
  PAST_STOCK_TRANSFER_DAY: moment().subtract(7, 'days').startOf('day'),
  DEMAND_MULTIPLIER: 7,
};

const DataTable = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation('stockOrderAuto');
  const marketProducts = useSelector(getMarketProductsSelector.getData);
  const marketProductsPending = useSelector(
    getMarketProductsSelector.getIsPending,
  );
  const supplierId = useSelector(
    supplierIdSelector.getSupplierId,
  );
  const [wrappedProducts, setWrappedProducts] = useState([]);

  const getMarketProductsMemo = useMemo(
    () => debounce(() => {
      const params = {
        fields: ['fullName barcodes suppliers isEnabled'],
        shouldGetSuppliersAndManufacturerFromNewPricingService: true,
      };

      dispatch(
        CommonCreators.getMarketProductsRequest(params),
      );
    }, DEFAULT_DEBOUNCE_MS),
    [dispatch],
  );

  useEffect(() => {
    if (marketProducts) {
      const updatedProducts = marketProducts.map(marketProduct => ({
        ...marketProduct,
        demandDates: {
          startDate: PARAMS_DEFAULT_VALUES.DEMAND_RANGE.startDate,
          endDate: PARAMS_DEFAULT_VALUES.DEMAND_RANGE.endDate,
        },
        mainStockDay: PARAMS_DEFAULT_VALUES.MAIN_STOCK_DAY,
        mainLeadDay: PARAMS_DEFAULT_VALUES.MAIN_LEAD_DAY,
        storeStockDay: PARAMS_DEFAULT_VALUES.STORE_STOCK_DAY,
        ignoreStock: PARAMS_DEFAULT_VALUES.IGNORE_CURRENT_STOCK,
        activeStockOrderDate: PARAMS_DEFAULT_VALUES.PAST_STOCK_ORDER_DAY,
        activeStockTransferDate: PARAMS_DEFAULT_VALUES.PAST_STOCK_TRANSFER_DAY,
        growRate: PARAMS_DEFAULT_VALUES.DEMAND_MULTIPLIER,
      }));
      setWrappedProducts(updatedProducts);
    }
  }, [marketProducts]);

  useEffect(() => {
    dispatch(Creators.setItemParams({ data: wrappedProducts.filter(wrappedProduct => wrappedProduct.itemParamEnabled) }));
  }, [dispatch, wrappedProducts]);

  useEffect(() => {
    getMarketProductsMemo();
  }, [getMarketProductsMemo]);

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Table
          className={classes.tableWrapper}
          dataSource={wrappedProducts.filter(
            wrappedProduct => wrappedProduct?.isEnabled && wrappedProduct?.suppliers?.some(supplier => supplier._id === supplierId),
          )}
          columns={generateColumns(t, wrappedProducts, setWrappedProducts)}
          loading={marketProductsPending}
          bordered
          scroll={{ x: 1200 }}
          size="small"
          pagination={false}
          data-testid="stock-order-auto-table"
        />
      </Col>
    </Row>
  );
};

export default DataTable;
