import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { compose } from 'redux';
import { Button } from 'antd';
import { get } from 'lodash';
import { TableOutlined, ClearOutlined } from '@ant-design/icons';

import { Creators } from '@shared/containers/Marketing/Select/WarehouseSelect/redux/actions';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import saga from '@shared/containers/Marketing/Select/WarehouseSelect/redux/saga';
import injectReducer from '@shared/utils/injectReducer';
import reducer from '@shared/containers/Marketing/Select/WarehouseSelect/redux/reducer';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import AntSelectWithCsvImport from '@shared/components/AntSelectWithCsvImport';
import { getFilteredWarehousesSelector } from '@shared/redux/selectors/common';

const convertWarehouseOptions = (warehouses, showObjectIdOnLabel = false) => {
  return warehouses.map(warehouse => {
    const warehouseName = get(warehouse, 'name', '');
    const label = showObjectIdOnLabel ? `${warehouseName} | ${get(warehouse, '_id', '')}` : warehouseName;
    return {
      value: get(warehouse, '_id', ''),
      label,
    };
  });
};

const WarehouseSelect = ({ form, fieldName, disabled, onChange, rules, cities, selectWrapperProps, importWrapperProps }) => {
  const { t } = useTranslation('marketing');
  const dispatch = useDispatch();
  const warehouses = useSelector(getFilteredWarehousesSelector.getData || []);
  const isWarehousesPending = useSelector(getFilteredWarehousesSelector.getIsPending || []);
  const warehouseOptions = convertWarehouseOptions(warehouses);

  const filterCityWarehouses = (warehouseArr, selectedWarehouses) => {
    const object = warehouseArr.reduce((obj, item) => Object.assign(obj, { [item.value]: item.label }), {});
    return selectedWarehouses?.filter(warehouse => object[warehouse]);
  };

  useEffect(() => {
    dispatch(Creators.initContainer());
    dispatch(CommonCreators.getFilteredWarehousesRequest({ cities, fields: 'name' }));
    return () => {
      dispatch(Creators.destroyContainer());
    };
  }, [dispatch, cities]);

  useEffect(() => {
    const selectedWarehouses = form.getFieldValue(fieldName);
    if (warehouseOptions.length) {
      form.setFields([{ name: fieldName, value: filterCityWarehouses(warehouseOptions, selectedWarehouses) }]);
    }

    if (!cities?.length) {
      form.setFields([{ name: fieldName, value: [] }]);
    }
  }, [warehouseOptions, cities, form, fieldName]);

  return (
    <>
      <AntSelectWithCsvImport
        selectWrapperProps={selectWrapperProps}
        importWrapperProps={importWrapperProps}
        className="w-100"
        label={t('WAREHOUSES')}
        rule={rules}
        name={fieldName}
        disabled={disabled || isWarehousesPending}
        loading={isWarehousesPending}
        form={form}
        btnLabel={t('CSV_UPLOAD')}
        labelInValue={false}
        options={warehouseOptions}
        onChange={onChange}
        placeholder={`${t('WAREHOUSES')}`}
        pairValueOptions
        maxTagCount={3}
      />
      <Button
        onClick={() => {
          if (warehouses.length) {
            form.setFields([{ name: fieldName, value: warehouses.map(warehouse => warehouse?._id) }]);
          }
        }}
        aria-label={t('SELECT_ALL')}
        disabled={disabled}
      ><TableOutlined className="mr-2" />{t('SELECT_ALL')}
      </Button>
      <Button
        onClick={() => {
          if (warehouses.length) {
            form.setFields([{ name: fieldName, value: [] }]);
          }
        }}
        disabled={disabled}
        aria-label={t('REMOVE_ALL')}
        className="ml-2"
      ><ClearOutlined className="mr-2" />{t('REMOVE_ALL')}
      </Button>
    </>
  );
};

const reduxKey = REDUX_KEY.MARKETING.SELECT.WAREHOUSE;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(WarehouseSelect);
