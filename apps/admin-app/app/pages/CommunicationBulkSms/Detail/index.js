import { useEffect, useState } from 'react';
import { compose } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Form, PageHeader, Row, Skeleton, Tag, Tooltip } from 'antd';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { get } from 'lodash';

import { GeneralInformationForm, ContentInformationForm } from '@app/pages/CommunicationBulkSms/Detail/components';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import useStyles from '@app/pages/CommunicationBulkSms/Detail/styles';
import { Creators } from '@app/pages/CommunicationBulkSms/Detail/redux/actions';
import { getInitialValues, manipulateValuesBeforeSubmit } from '@app/pages/CommunicationBulkSms/Detail/formHelpers';

import { communicationBulkSmsUpdateSelector } from '@app/pages/CommunicationBulkSms/Detail/redux/selectors';
import { getPageHeaderTagColor } from '@app/pages/CommunicationBulkSms/utils';
import { getLangKey } from '@shared/i18n';
import { CAMPAIGN_STATUS } from '@app/pages/CommunicationBulkSms/constants';
import { campaignStatus } from '@app/pages/CommunicationBulkSms/constantValues';

const BulkSmsDetail = () => {
  usePageViewAnalytics({
    name: ROUTE.COMMUNICATION_BULK_SMS_DETAIL.name,
    squad: ROUTE.COMMUNICATION_BULK_SMS_DETAIL.squad,
  });

  const [form] = Form.useForm();
  const { id: communicationBulkSmsId } = useParams();
  const { t } = useTranslation('communicationBulkSmsPage');

  const dispatch = useDispatch();
  const classes = useStyles();
  const backTop = document.querySelector('.ant-back-top');

  if (backTop) {
    backTop.style.right = '55px';
  }
  const [isFormEditable, setIsFormEditable] = useState(false);
  const bulkSmsDetail = useSelector(communicationBulkSmsUpdateSelector.getData);
  const bulkSmsPending = useSelector(communicationBulkSmsUpdateSelector.getIsPending);
  const isEditable = bulkSmsDetail?.campaignStatus === CAMPAIGN_STATUS.INITIALIZING || bulkSmsDetail?.campaignStatus === CAMPAIGN_STATUS.READY_FOR_DELIVERY;

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(Creators.communicationBulkSmsGetRequest({ communicationBulkSmsId }));
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch, communicationBulkSmsId]);

  useEffect(() => {
    form.setFieldsValue(getInitialValues(bulkSmsDetail));
  }, [bulkSmsDetail, isFormEditable, form]);

  return (
    <>
      <PageHeader
        ghost={false}
        tags={<Tag color={getPageHeaderTagColor(bulkSmsDetail?.campaignStatus)}>{get(campaignStatus[bulkSmsDetail?.campaignStatus], getLangKey(), '')}</Tag>}
        title={t('COMMUNICATION_BULK_SMS_DETAIL')}
        subTitle={communicationBulkSmsId}
      />
      <Skeleton loading={bulkSmsPending} active className="p-5 bg-white">
        <Form
          scrollToFirstError
          form={form}
          initialValues={getInitialValues(bulkSmsDetail)}
          layout="horizontal"
          name="detailCredentialsForm"
          labelCol={{ flex: '150px' }}
          labelAlign="left"
          onFinish={values => {
            dispatch(Creators.communicationBulkSmsUpdateRequest({
              id: communicationBulkSmsId,
              body: manipulateValuesBeforeSubmit(values),
            }));
            setIsFormEditable(false);
          }}
          className={classes.antDefaultForm}
        >
          <Row justify="center" className="mt-4">
            <Col xxl={16} xl={20} lg={20} xs={24}>
              <GeneralInformationForm
                form={form}
                isFormEditable={isFormEditable}
              />
              <ContentInformationForm isFormEditable={isFormEditable} />
              <FormFooter
                {...{ isFormEditable, setIsFormEditable, dispatch, t, bulkSmsDetail, communicationBulkSmsId, isEditable }}
              />
            </Col>
          </Row>
        </Form>
      </Skeleton>
    </>
  );
};
const FormFooter = ({ isFormEditable, setIsFormEditable, dispatch, t, communicationBulkSmsId, isEditable }) => {
  return (
    <Row justify="end" gutter={24}>
      {isFormEditable ? (
        <>
          <Col>
            <Form.Item className="mt-3">
              <Button
                size="small"
                data-test="cancel-btn"
                onClick={() => {
                  setIsFormEditable(false);
                  dispatch(Creators.communicationBulkSmsGetRequest({ communicationBulkSmsId }));
                }}
              >
                {t('button:CANCEL')}
              </Button>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item className="mt-3">
              <Button size="small" htmlType="submit" data-test="save-btn">
                {t('button:SAVE')}
              </Button>
            </Form.Item>
          </Col>
        </>
      ) : (
        <Col>
          <Form.Item className="mt-3">
            {!isEditable ? (
              <Tooltip placement="top" title={t('EDITABLE_CONDITION')}>
                <Button data-test="edit-btn" size="small" disabled>
                  {t('button:EDIT')}
                </Button>
              </Tooltip>
            ) : (
              <Button
                data-test="edit-btn"
                size="small"
                onClick={() => {
                  setIsFormEditable(true);
                }}
              >
                {t('button:EDIT')}
              </Button>
            )}
          </Form.Item>
        </Col>
      )}
    </Row>
  );
};

const reduxKey = REDUX_KEY.COMMUNICATION_BULK_SMS.DETAIL;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(BulkSmsDetail);
