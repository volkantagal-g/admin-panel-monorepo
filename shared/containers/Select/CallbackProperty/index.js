import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { Col, Form, Input, Pagination, Row, Select, Switch, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';

import { CheckOutlined, CloseOutlined, QuestionCircleOutlined } from '@ant-design/icons';

import { debounce } from 'lodash';

import { DEFAULT_DEBOUNCE_MS, REDUX_KEY } from '@shared/shared/constants';
import { useInitAndDestroyPage } from '@shared/hooks';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';

import { getCallbackPropertiesSelector } from './redux/selectors';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { rules } from '@app/pages/CommunicationServiceCredentials/New/formHelpers';
import { CALLBACK_TYPES } from '@shared/containers/Select/CallbackProperty/constants';
import { callbackTypes } from '@shared/containers/Select/CallbackProperty/constantValues';
import { manipulateCallbackSearch } from '@shared/containers/Select/CallbackProperty/utils';

const SelectCallbackProperties = ({ callbackType, disabled, serviceType }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useInitAndDestroyPage({ dispatch, Creators });
  const callbackData = useSelector(getCallbackPropertiesSelector.getData);
  const callbackProperties = callbackData?.[callbackType]?.data?.content;
  const total = callbackData?.[callbackType]?.data?.totalElements;
  const isPending = callbackData?.[callbackType]?.isPending;
  const { isCallbackUrlEnabledName, label, tooltipLabel } = callbackTypes[callbackType];

  const [currentPage, setCurrentPage] = useState(0);
  const [textQuery, setTextQuery] = useState('');
  const onChangePage = page => {
    setCurrentPage(page);
  };

  const onChangeInput = useMemo(() => debounce(text => {
    setCurrentPage(0);
    setTextQuery(text);
  }, DEFAULT_DEBOUNCE_MS), []);

  const convertUrlListToSelectOptions = (values = {}) => {
    return Object.entries(values || {}).map(([, value]) => {
      const { id } = value;
      const { serviceName } = value;
      const { url } = value;
      return {
        value: id,
        label: `${serviceName} - ${url}`,
      };
    });
  };

  const customDropdown = menu => (
    <>
      {menu}
      <Pagination currentPage={currentPage} defaultPageSize={7} onChange={onChangePage} total={total} />
    </>
  );

  useEffect(() => {
    dispatch(Creators.getCallbackPropertiesRequest({ callbackType, serviceType, filters: manipulateCallbackSearch(currentPage, textQuery, callbackType) }));
  }, [callbackType, currentPage, dispatch, serviceType, textQuery]);

  return (
    <>
      <Row gutter={24}>
        <Col md={12} xs={24}>
          <Form.Item
            name={isCallbackUrlEnabledName}
            label={(
              <Tooltip title={t(tooltipLabel)}>
                {t(label)} <QuestionCircleOutlined role="button" className="ml-1" />
              </Tooltip>
            )}
            disabled={isPending}
            valuePropName="checked"
            labelCol={{ style: { width: 165 } }}
          >
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              disabled={disabled}
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item noStyle dependencies={[`${isCallbackUrlEnabledName}`]}>
        {({ getFieldValue }) => {
          const isCallbackUrlEnabled = getFieldValue(`${isCallbackUrlEnabledName}`);
          const { selectComponentName } = callbackTypes[callbackType];
          if (isCallbackUrlEnabled) {
            return (
              <>
                <Row gutter={24}>
                  <Col md={24} xs={24}>
                    <Form.Item
                      hasFeedback
                      name={selectComponentName}
                      rules={rules.onlyRequired}
                      label={t('global:CALLBACK_URL')}
                      disabled={isPending}
                    >
                      <Select
                        showSearch
                        mode="multiple"
                        loading={isPending}
                        disabled={disabled}
                        dropdownRender={customDropdown}
                        onSearch={onChangeInput}
                        options={convertUrlListToSelectOptions(callbackProperties)}
                        optionFilterProp="label"
                        allowClear
                      />
                    </Form.Item>
                  </Col>
                </Row>
                {callbackType === CALLBACK_TYPES.DATA ? (
                  <Row gutter={24}>
                    <Col md={12} xs={24}>
                      <Form.Item
                        hasFeedback
                        name="notificationCenterTtlInHours"
                        rules={rules.onlyRequired}
                        label={(
                          <Tooltip title={t('global:TIME_TO_LIVE')}>
                            {t('global:TTL')} <QuestionCircleOutlined role="button" className="align-middle ml-1" />
                          </Tooltip>
                        )}
                      >
                        <Input type="number" min="0" disabled={disabled} />
                      </Form.Item>
                    </Col>
                  </Row>
                ) : null}
              </>
            );
          }
          return null;
        }}
      </Form.Item>
    </>
  );
};

const reduxKey = REDUX_KEY.SELECT.CALLBACK_PROPERTY;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(SelectCallbackProperties);
