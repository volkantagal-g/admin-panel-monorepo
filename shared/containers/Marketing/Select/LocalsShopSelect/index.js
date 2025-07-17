import { useTranslation } from 'react-i18next';
import { Button, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { debounce } from 'lodash';
import { compose } from 'redux';

import { ClearOutlined } from '@ant-design/icons';

import { Creators } from '@shared/containers/Marketing/Select/LocalsShopSelect/redux/actions';
import { REDUX_KEY, DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import saga from '@shared/containers/Marketing/Select/LocalsShopSelect/redux/saga';
import injectReducer from '@shared/utils/injectReducer';
import reducer from '@shared/containers/Marketing/Select/LocalsShopSelect/redux/reducer';
import { localsShopSelector } from '@shared/containers/Marketing/Select/LocalsShopSelect/redux/selectors';
import AntSelectWithCsvImport from '@shared/components/AntSelectWithCsvImport';

export const convertLocalShopOptions = values => {
  return values?.map(item => ({
    value: item?.id,
    label: item?.name,
    disabled: item?.isActive === false,
  }));
};

const LocalsShopSelect = ({
  fieldName, selectWrapperProps,
  hasLabel = true,
  disabled,
  removeAll = true,
  onReset,
  rules,
  mode = 'multiple',
  labelInValue = false, form, hideCsvImport = true, afterCsvImport, inline = false,
}) => {
  const { t } = useTranslation('marketing');
  const dispatch = useDispatch();

  const isPending = useSelector(localsShopSelector.getIsPending);
  const localsShops = useSelector(localsShopSelector.getData);
  const getShopsByName = searchString => {
    if (searchString.length >= 3) {
      dispatch(Creators.getLocalsShopsRequest({ name: searchString }));
    }
  };

  useEffect(() => {
    dispatch(Creators.initContainer());
    if (form?.getFieldValue(fieldName)) {
      dispatch(Creators.getLocalsShopDetailsByIdArrayRequest({
        shopIds: Array.isArray(form?.getFieldValue(fieldName)) ? form?.getFieldValue(fieldName) : [form?.getFieldValue(fieldName)],
        onSuccess: shopDetails => {
          dispatch(Creators.setLocalShopOptions({ options: shopDetails }));
        },
      }));
    }
    return () => {
      dispatch(Creators.destroyContainer());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <Row gutter={24}>
      <AntSelectWithCsvImport
        inline={inline}
        rule={rules}
        selectWrapperProps={selectWrapperProps}
        label={hasLabel ? t('LOCALS_SHOPS') : null}
        placeholder={`${t('LOCALS_SHOPS')}`}
        name={fieldName}
        hideImport={hideCsvImport}
        onSearch={debounce(getShopsByName, DEFAULT_DEBOUNCE_MS)}
        form={form}
        afterCsvImport={afterCsvImport}
        disabled={disabled}
        labelInValue={labelInValue}
        loading={isPending}
        btnLabel={t('CSV_UPLOAD')}
        mode={mode}
        notFoundContent={
          (<div className="text-center my-3">{t('NOT_FOUND_PLEASE_TYPE_FOR_SEARCH', { letterCount: 3 })}</div>)
        }
        pairValueOptions={false}
        maxTagCount={3}
        options={convertLocalShopOptions(localsShops)}
      />
      {removeAll && (
        <Button
          onClick={() => {
            if (localsShops.length) {
              form.setFields([{ name: fieldName, value: [] }]);
            }
            if (onReset) {
              onReset();
            }
          }}
          disabled={disabled}
          aria-label={t('REMOVE_ALL')}
          className="ml-2"
        ><ClearOutlined className="mr-2" />{t('REMOVE_ALL')}
        </Button>
      )}
    </Row>
  );
};

const reduxKey = REDUX_KEY.MARKETING.SELECT.LOCAL_SHOP;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(LocalsShopSelect);
