import { LoadingOutlined } from '@ant-design/icons';
import { Form, Row, Select } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';

import AntSelectWithCsvImport from '@shared/components/AntSelectWithCsvImport';
import { Creators } from '@shared/containers/Marketing/Select/MarketProductSelect/redux/actions';
import reducer from '@shared/containers/Marketing/Select/MarketProductSelect/redux/reducer';
import saga from '@shared/containers/Marketing/Select/MarketProductSelect/redux/saga';
import { marketProductSelector } from '@shared/containers/Marketing/Select/MarketProductSelect/redux/selectors';
import { getLangKey } from '@shared/i18n';
import { REDUX_KEY } from '@shared/shared/constants';
import { getSelectFilterOption } from '@shared/utils/common';
import injectReducer from '@shared/utils/injectReducer';
import injectSaga from '@shared/utils/injectSaga';

export const getMarketProductOptions = (marketProducts = []) => {
  return marketProducts?.map(item => ({
    value: item?._id,
    label: `${item?.fullName[getLangKey()]} | ${item?._id}`,
  }));
};

const MarketProductSelect = ({ fieldName, disabled, onChange = () => {}, rules, hasCsvImport = false, form, ...props }) => {
  const { t } = useTranslation('marketing');
  const dispatch = useDispatch();

  const isPending = useSelector(marketProductSelector.getIsPending);
  const marketProductOptions = useSelector(marketProductSelector.getData);
  const marketProductsMap = useSelector(marketProductSelector.getMarketProductsMap);

  useEffect(() => {
    dispatch(Creators.initContainer());
    if (!marketProductOptions?.length) {
      dispatch(
        Creators.getMarketProductsRequest({
          filters: {
            statusList: ['ACTIVE'],
            fields: 'name fullName picURL',
            populate: [],
          },
        }),
      );
    }
    return () => {
      dispatch(Creators.destroyContainer());
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handleChange = productIds => {
    if (Array.isArray(productIds)) {
      onChange(productIds, marketProductsMap);
    }
    else {
      onChange(productIds, marketProductsMap[productIds]);
    }
  };

  return (
    // TODO: Find more elegant way to handle csv import on fe with generic component
    hasCsvImport ? (
      <Row>
        <AntSelectWithCsvImport
          disabled={isPending || disabled}
          name={fieldName}
          btnLabel={t('CSV_UPLOAD')}
          loading={isPending}
          form={form}
          labelInValue={false}
          options={getMarketProductOptions(marketProductOptions)}
          placeholder={`${t('PRODUCTS')}`}
          rule={rules}
          selectWrapperProps={{
            md: 24,
            xs: 24,
          }}
          importWrapperProps={{
            md: 24,
            xs: 24,
          }}
          onChange={handleChange}
          afterCsvImport={handleChange}
        />

      </Row>
    )
      : (
        <Form.Item
          name={fieldName}
          label={t('PRODUCTS')}
          className="d-inline"
          rules={rules}
        >
          <Select
            suffixIcon={isPending && <LoadingOutlined spin />}
            placeholder={`${t('PRODUCTS')}`}
            loading={isPending}
            disabled={isPending || disabled}
            onChange={handleChange}
            options={getMarketProductOptions(marketProductOptions)}
            autoComplete="off"
            allowClear
            showSearch
            filterOption={getSelectFilterOption}
            {...props}
          />
        </Form.Item>
      )

  );
};

const reduxKey = REDUX_KEY.MARKETING.SELECT.MARKET_PRODUCT;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(MarketProductSelect);
