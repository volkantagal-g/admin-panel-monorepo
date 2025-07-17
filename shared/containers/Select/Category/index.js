import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { useTranslation } from 'react-i18next';
import debounce from 'lodash/debounce';

import { Col, Form, Row, Select, Tooltip } from 'antd';

import { useEffect } from 'react';

import { REDUX_KEY } from '@shared/shared/constants';
import { useInitAndDestroyPage } from '@shared/hooks';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';

import { getCategorySelector } from '@shared/containers/Select/Category/redux/selectors';
import { serviceTypes } from '@shared/containers/Select/Category/constantValues';
import { getLangKey } from '@shared/i18n';

const SelectCategory = ({ serviceType, disabled }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useInitAndDestroyPage({ dispatch, Creators });
  const categories = useSelector(getCategorySelector.getData);
  const isPending = useSelector(getCategorySelector.isPending);
  const { categoryName } = serviceTypes[serviceType];
  const { Option } = Select;

  const rules = {
    requiredArray: [{ required: true, message: t('error:REQUIRED'), type: 'array' }],
    onlyRequired: [{ required: true, message: t('error:REQUIRED') }],
  };

  const convertCategoriesToSelectOptions = (values = []) => {
    return values.map(option => (
      <Option
        key={option?.id}
        value={option?.id}
        label={`${option.name} ${option?.descriptionList.find(({ lang }) => lang === getLangKey())?.content}`}
      >
        <div className="font-weight-bold">{option.name}</div>
        <div style={{ fontSize: '10px', color: 'rgba(0, 0, 0, 0.45)' }}>{option?.descriptionList.find(({ lang }) => lang === getLangKey())?.content}</div>
      </Option>
    ));
  };
  const handleSearch = textQuery => {
    if (textQuery) {
      dispatch(Creators.getCategoryRequest({ serviceType, textQuery }));
    }
  };

  useEffect(() => {
    dispatch(Creators.getCategoryRequest({ serviceType, textQuery: 'Default' }));
  }, [dispatch, serviceType]);

  return (
    <Row gutter={24}>
      <Col md={12} xs={23}>

        <Tooltip trigger={['focus']} title={t('global:TYPE_MIN_THREE')} placement="right">
          <Form.Item
            name={categoryName}
            rules={rules.onlyRequired}
            label={t('global:CATEGORY')}
            disabled={isPending}
          >
            <Select
              placeholder={t('global:SEARCH_CATEGORY')}
              showSearch
              loading={isPending}
              disabled={disabled}
              onSearch={debounce(handleSearch, 1500)}
              optionFilterProp="label"
              allowClear
            >
              {convertCategoriesToSelectOptions(categories?.content || [])}
            </Select>
          </Form.Item>
        </Tooltip>
      </Col>
    </Row>
  );
};

const reduxKey = REDUX_KEY.SELECT.CATEGORY;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(SelectCategory);
