import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Row, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import moment from 'moment';

import { getMarketProductsSelector } from '@shared/redux/selectors/common';
import { DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { Creators } from '@app/pages/Stock/Transfer/Auto/redux/actions';
import { supplierIdSelector } from '@app/pages/Stock/Transfer/Auto/redux/selectors';
import { generateColumns } from './config';
import useStyles from './styles';

const PARAMS_DEFAULT_VALUES = {
  STORE_TRANSFER_DAY: 14,
  MAX_STOCK_DAY: 5,
  MAX_COLI_COUNT_EXIST: false,
  MAX_BOX_COUNT: 5,
  PAST_STOCK_ORDER_DAY: moment().subtract(7, 'days').startOf('day'),
  PAST_STOCK_TRANSFER_DAY: moment().subtract(7, 'days').startOf('day'),
  DEMAND_MULTIPLIER: 7,
  DEMAND_RANGE: {
    startDate: moment().startOf('isoWeek').subtract(1, 'week'),
    endDate: moment().endOf('isoWeek').subtract(1, 'week'),
  },
  IGNORE_CURRENT_STOCK: false,
};

const DataTable = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation('stockTransferAuto');
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
        populate: [
          {
            path: 'suppliers',
            select: 'name',
          },
        ],
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
        maxColiBool: PARAMS_DEFAULT_VALUES.MAX_COLI_COUNT_EXIST,
        maxColiCount: PARAMS_DEFAULT_VALUES.MAX_BOX_COUNT,
        mainStockDay: PARAMS_DEFAULT_VALUES.STORE_TRANSFER_DAY,
        activeStockOrderDate: PARAMS_DEFAULT_VALUES.PAST_STOCK_ORDER_DAY,
        activeStockTransferDate: PARAMS_DEFAULT_VALUES.PAST_STOCK_TRANSFER_DAY,
        growRate: PARAMS_DEFAULT_VALUES.DEMAND_MULTIPLIER,
        mainLeadDay: PARAMS_DEFAULT_VALUES.MAX_STOCK_DAY,
        ignoreStock: PARAMS_DEFAULT_VALUES.IGNORE_CURRENT_STOCK,
      }));
      setWrappedProducts(updatedProducts);
    }
  }, [marketProducts]);

  useEffect(() => {
    dispatch(Creators.setProductParams({ data: wrappedProducts.filter(wrappedProduct => wrappedProduct.itemParamEnabled) }));
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
          data-testid="stock-transfer-auto-product-table"
        />
      </Col>
    </Row>
  );
};

export default DataTable;
