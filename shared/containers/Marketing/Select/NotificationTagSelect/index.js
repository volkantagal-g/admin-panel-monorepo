import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { compose } from 'redux';

import { notificationTagSelector } from '@shared/containers/Marketing/Select/NotificationTagSelect/redux/selectors';

import { getSelectFilterOption } from '@shared/utils/common';
import { Creators } from '@shared/containers/Marketing/Select/NotificationTagSelect/redux/actions';

import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import saga from '@shared/containers/Marketing/Select/NotificationTagSelect/redux/saga';
import injectReducer from '@shared/utils/injectReducer';
import reducer from '@shared/containers/Marketing/Select/NotificationTagSelect/redux/reducer';
import { getLangKey } from '@shared/i18n';

export const convertNotificationTags = localVerticals => {
  return localVerticals?.map(item => ({
    value: String(item?.id),
    label: item?.title,
  }));
};

const NotificationTagSelect = ({ fieldName, inline, disabled, onChange, rules, mode }) => {
  const { t } = useTranslation('marketing');
  const dispatch = useDispatch();
  const userLangKey = getLangKey();

  const isPending = useSelector(notificationTagSelector.getIsPending);
  const notificationTags = useSelector(notificationTagSelector.getData);

  useEffect(() => {
    dispatch(Creators.initContainer());
    dispatch(Creators.getNotificationTagsRequest({ userLangKey }));
    return () => {
      dispatch(Creators.destroyContainer());
    };
  }, [dispatch, userLangKey]);

  return (
    <Form.Item
      name={fieldName}
      label={inline ? null : t('NOTIFICATION_CATEGORIES')}
      className={`${!inline && 'd-inline'} w-100`}
      rules={rules}
    >
      <Select
        mode={mode}
        suffixIcon={isPending && <LoadingOutlined spin />}
        onChange={onChange}
        placeholder={`${t('NOTIFICATION_CATEGORIES')}`}
        disabled={isPending || disabled}
        options={convertNotificationTags(notificationTags)}
        autoComplete="off"
        allowClear
        showSearch
        filterOption={getSelectFilterOption}
      />
    </Form.Item>
  );
};

const reduxKey = REDUX_KEY.MARKETING.SELECT.NOTIFICATION_TAG;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(NotificationTagSelect);
