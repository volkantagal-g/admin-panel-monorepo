import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { Button, Col, Form, Row } from 'antd';

import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { ROUTE } from '@app/routes';
import { REDUX_KEY } from '@shared/shared/constants';

// Redux
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { Creators } from './redux/actions';
import { Creators as MetricGroupCretors } from '../components/ACMetricGroup/redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';

// Common Components
import PageTitleHeader from '@shared/components/UI/PageTitleHeader';
// Business Alerting Tool Common Components
import BATCard from '../../components/BATCard';
// Alert Condition Common Components
import ACMetaData from '../components/ACMetaData';
import ACMetricGroup from '../components/ACMetricGroup';
import ACDefineValue from '../components/ACDefineValue';
import ACConditionThreshold from '../components/ACConditionThreshold';
import ACRunningDays from '../components/ACRunningDays';
import ACNotifications from '../components/ACNotifications';
import ACPermittedRoles from '../components/ACPermittedRoles';

import useStyles from './styles';
import { manipulateValuesAfterSubmit } from '../utils';

const reduxKey = REDUX_KEY.BUSINESS_ALERTING_TOOL.ALERT_CONDITION.NEW;

function BATAlertConditionNewPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation(['batAlertConditionNewPage', 'batAlertConditionCommon']);

  usePageViewAnalytics({
    name: ROUTE.BUSINESS_ALERTING_TOOL_ALERT_CONDITION_NEW.name,
    squad: ROUTE.BUSINESS_ALERTING_TOOL_ALERT_CONDITION_NEW.squad,
  });
  useInitAndDestroyPage({ dispatch, Creators });

  const [form] = Form.useForm();

  const formik = useFormik({
    initialValues: {},
    enableReinitialize: true,
    validateOnChange: true,
    onSubmit: values => {
      const params = manipulateValuesAfterSubmit(values);

      dispatch(Creators.createAlertConditionRequest({ alertCondition: params }));
    },
  });

  const { handleSubmit, values } = formik;

  useEffect(() => {
    dispatch(CommonCreators.getCitiesRequest());
    dispatch(CommonCreators.getAvailableDomainTypesForCountrySelectorRequest());
  }, [dispatch]);

  useEffect(() => {
    form.setFieldsValue(values);
  }, [form, values]);

  return (
    <>
      <PageTitleHeader title={t('batAlertConditionNewPage:PAGE_TITLE.ALERT_CONDITION.NEW')} isDeviceMobile={false} />
      <div className={classes.pageContainer}>
        <header className={classes.header}>
          {t('batAlertConditionNewPage:PAGE_TITLE.ALERT_CONDITION.NEW')}
        </header>
        <Form form={form} onFinish={handleSubmit}>
          <Row gutter={[24, 24]}>
            <Col xs={24}>
              <BATCard>
                <ACMetaData formik={formik} isFormEditable />
              </BATCard>
            </Col>
            <Col xs={24}>
              <BATCard>
                <ACMetricGroup formik={formik} isFormEditable />
              </BATCard>
            </Col>
            <Col xs={24}>
              <BATCard headerTitle={t('batAlertConditionCommon:CARD_HEADERS.DEFINE_YOUR_VALUES')}>
                <ACDefineValue formik={formik} form={form} isFormEditable />
              </BATCard>
            </Col>
            <Col xs={24}>
              <BATCard headerTitle={t('batAlertConditionCommon:CARD_HEADERS.SET_YOUR_CONDITION_THRESHOLD')}>
                <ACConditionThreshold formik={formik} form={form} isFormEditable />
              </BATCard>
            </Col>
            <Col xs={24}>
              <BATCard headerTitle={t('batAlertConditionCommon:CARD_HEADERS.RUNNING_DAY')}>
                <ACRunningDays formik={formik} isFormEditable />
              </BATCard>
            </Col>
            <Col xs={24}>
              <BATCard headerTitle={t('batAlertConditionCommon:CARD_HEADERS.NOTIFICATIONS')}>
                <ACNotifications formik={formik} antdForm={form} isFormEditable />
              </BATCard>
            </Col>
            <Col xs={24}>
              <BATCard headerTitle={t('batAlertConditionCommon:CARD_HEADERS.PERMITTED_ROLES')}>
                <ACPermittedRoles formik={formik} isFormEditable />
              </BATCard>
            </Col>
            <Col xs={24}>
              <div className={classes.actionContainer}>
                <Button type="default" onClick={handleClearOnClick}>{t('buttons:CLEAR')}</Button>
                <Form.Item>
                  <Button type="primary" htmlType="submit">{t('buttons:SAVE')}</Button>
                </Form.Item>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );

  function handleClearOnClick() {
    dispatch(MetricGroupCretors.resetMetricGroup());
    formik.resetForm();
    form.resetFields();
  }
}

const withReducer = injectReducer({ key: reduxKey, reducer });
const withSaga = injectSaga({ key: reduxKey, saga });

export default compose(withReducer, withSaga)(BATAlertConditionNewPage);
