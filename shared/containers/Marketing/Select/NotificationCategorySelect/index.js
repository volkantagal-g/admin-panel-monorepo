import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { debounce } from 'lodash';
import { compose } from 'redux';

import { Creators } from '@shared/containers/Marketing/Select/NotificationCategorySelect/redux/actions';
import { DEFAULT_DEBOUNCE_MS, REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import saga from '@shared/containers/Marketing/Select/NotificationCategorySelect/redux/saga';
import injectReducer from '@shared/utils/injectReducer';
import reducer from '@shared/containers/Marketing/Select/NotificationCategorySelect/redux/reducer';
import { notificationCategorySelector } from '@shared/containers/Marketing/Select/NotificationCategorySelect/redux/selectors';

const getNotificationCategoryOptions = values => {
  return values?.map(item => ({
    value: item?.id,
    label: item?.content,
  }));
};

const NotificationCategorySelect = ({ fieldName, disabled, onChange, rules, mode, inline, form }) => {
  const { t } = useTranslation('marketing');
  const dispatch = useDispatch();

  const isPending = useSelector(notificationCategorySelector.getIsPending);
  const notificationCategories = useSelector(notificationCategorySelector.getData);

  const searchNotificationCategories = textQuery => {
    if (textQuery.length >= 3) {
      dispatch(Creators.getNotificationCategoriesRequest({ textQuery }));
    }
  };

  useEffect(() => {
    dispatch(Creators.initContainer());
    if (form?.getFieldValue(fieldName)) {
      dispatch(Creators.getNotificationCategoryDetailRequest({ categoryId: form?.getFieldValue(fieldName) }));
      dispatch(Creators.initContainer());
    }
    return () => {
      dispatch(Creators.destroyContainer());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {

  }, []);

  return (
    <Form.Item
      name={fieldName}
      label={inline ? null : t('NOTIFICATION_CATEGORIES')}
      className={!inline && 'd-inline'}
      rules={rules}
    >
      <Select
        // suffixIcon={isPending && <LoadingOutlined spin />}
        mode={mode}
        loading={isPending}
        notFoundContent={(
          <div className="text-center my-3">
            {isPending ? <LoadingOutlined spin className="mr-4" /> : t('NOT_FOUND_PLEASE_TYPE_FOR_SEARCH', { letterCount: 3 })}
          </div>
        )}
        placeholder={`${t('NOTIFICATION_CATEGORIES')}`}
        disabled={disabled}
        onChange={val => {
          onChange(val, notificationCategories);
        }}
        options={getNotificationCategoryOptions(notificationCategories)}
        autoComplete="off"
        allowClear
        showSearch
        onSearch={debounce(searchNotificationCategories, DEFAULT_DEBOUNCE_MS)}
        filterOption={false}
      />
    </Form.Item>
  );
};

const reduxKey = REDUX_KEY.MARKETING.SELECT.NOTIFICATION_CATEGORY;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(NotificationCategorySelect);
