import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { debounce } from 'lodash';
import { compose } from 'redux';

import { getSelectFilterOption, convertSelectOptions } from '@shared/utils/common';
import { Creators } from '@shared/containers/Marketing/Select/ClientDraftListSelect/redux/actions';
import { DEFAULT_DEBOUNCE_MS, REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import saga from '@shared/containers/Marketing/Select/ClientDraftListSelect/redux/saga';
import injectReducer from '@shared/utils/injectReducer';
import reducer from '@shared/containers/Marketing/Select/ClientDraftListSelect/redux/reducer';
import { clientDraftSelector } from '@shared/containers/Marketing/Select/ClientDraftListSelect/redux/selectors';

const ClientDraftListSelect = ({ fieldName, disabled, onChange, rules, form }) => {
  const { t } = useTranslation('marketing');
  const dispatch = useDispatch();

  const isPending = useSelector(clientDraftSelector.getIsPending);
  const clientDrafts = useSelector(clientDraftSelector.getData);

  const searchClientDrafts = searchString => {
    if (searchString.length >= 3) {
      dispatch(Creators.getClientDraftsRequest({ searchString }));
    }
  };

  useEffect(() => {
    dispatch(Creators.initContainer());
    // Get selected item label info
    if (form.getFieldValue(fieldName)) {
      dispatch(Creators.getClientDraftDetailRequest({ draftId: form.getFieldValue(fieldName) }));
    }
    return () => {
      dispatch(Creators.destroyContainer());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Form.Item
      name={fieldName}
      rules={rules}
    >
      <Select
        suffixIcon={isPending && <LoadingOutlined spin />}
        notFoundContent={(<div className="text-center my-3">{t('NOT_FOUND_PLEASE_TYPE_FOR_SEARCH', { letterCount: 3 })}</div>)}
        placeholder={`${t('CLIENT_DRAFT')}`}
        disabled={disabled}
        onChange={value => onChange(value, clientDrafts)}
        options={convertSelectOptions(clientDrafts, { valueKey: '_id', labelKey: 'name', isTranslation: false, isData: true })}
        autoComplete="off"
        allowClear
        showSearch
        onSearch={debounce(searchClientDrafts, DEFAULT_DEBOUNCE_MS)}
        filterOption={getSelectFilterOption}
      />
    </Form.Item>
  );
};

const reduxKey = REDUX_KEY.MARKETING.SELECT.CLIENT_DRAFT;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(ClientDraftListSelect);
