import { useEffect, useState } from 'react';
import { compose } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Form, Row, Skeleton } from 'antd';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { get } from 'lodash';

import { ADMIN_PANEL_CONFIGS, MARKET_CONFIG_QUERY_TYPES, REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { usePageViewAnalytics, usePermission } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import useStyles from '@app/pages/Announcement/Detail/styles';
import { Creators } from '@app/pages/Announcement/Detail/redux/actions';
import permKey from '@shared/shared/permKey.json';
import {
  ContentInformationForm,
  GeneralInformationForm,
  OptionalControlForm,
  SendingInformationForm,
} from '@app/pages/Announcement/Detail/components';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { announcementDetailSelector } from '@app/pages/Announcement/Detail/redux/selectors';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import CountrySelectionAlert from '@shared/containers/HelperContainer/CountrySelectionAlert';
import PageHeader from '@app/pages/Announcement/Detail/components/PageHeader';
import { ANNOUNCEMENT_STATUS } from '@app/pages/Announcement/constants';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getInitialValues, normalizeFormValues } from '@shared/utils/marketing/formUtils';
import { PAGE_TYPES } from '@shared/constants/marketing/pageTypes';

const AnnouncementDetail = () => {
  usePageViewAnalytics({
    name: ROUTE.ANNOUNCEMENT_DETAIL.name,
    squad: ROUTE.ANNOUNCEMENT_DETAIL.squad,
  });
  const [form] = Form.useForm();
  const { canAccess } = usePermission();
  const { id: announcementId } = useParams();
  const { t } = useTranslation('marketing');

  const dispatch = useDispatch();
  const classes = useStyles();
  const [isFormEditable, setIsFormEditable] = useState(false);

  const announcementDetail = useSelector(announcementDetailSelector.getData);
  const isAnnouncementDetailPending = useSelector(announcementDetailSelector.getIsPending);

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(Creators.getAnnouncementRequest({ announcementId }));
    dispatch(CommonCreators.getConfigWithKeyRequest({
      body: {
        key: ADMIN_PANEL_CONFIGS.ACTIVE_DOMAIN_TYPES,
        type: MARKET_CONFIG_QUERY_TYPES.ARRAY,
      },
    }));
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch, announcementId]);

  const countryId = get(getSelectedCountry(), '_id');
  const isCountryAnnouncement = announcementDetail.country ? countryId === announcementDetail.country : true;

  useEffect(() => {
    form.setFieldsValue(getInitialValues(PAGE_TYPES.ANNOUNCEMENT_DETAIL, announcementDetail));
  }, [announcementDetail, isFormEditable, form]);

  const updateAnnouncement = (id, formValues) => {
    dispatch(Creators.updateAnnouncementRequest({ id, body: normalizeFormValues(formValues, PAGE_TYPES.ANNOUNCEMENT_DETAIL) }));
    setIsFormEditable(false);
  };
  return (
    canAccess(permKey.PAGE_ANNOUNCEMENT_DETAIL) && (
      <>
        <PageHeader
          announcementDetail={announcementDetail}
          isAnnouncementDetailPending={isAnnouncementDetailPending}
          isFormEditable={isFormEditable}
          form={form}
        />
        <Row justify="center" className="mt-4">
          <Col lg={20}>
            <Skeleton loading={isAnnouncementDetailPending} active className="p-5 bg-white">
              {
                isCountryAnnouncement ? (
                  <Form
                    scrollToFirstError
                    form={form}
                    initialValues={getInitialValues(announcementDetail)}
                    layout="horizontal"
                    name="createAnnouncementForm"
                    labelCol={{ flex: '150px' }}
                    labelAlign="left"
                    onFinish={values => {
                      const status = form.getFieldValue('status');
                      if (status === ANNOUNCEMENT_STATUS.ACTIVE && !canAccess(permKey.PAGE_ANNOUNCEMENT_CAN_ACTIVATE_CAMPAIGN)) {
                        dispatch(ToastCreators.error({ message: t('DONT_HAVE_PERM_FOR_ACTIVATE_CAMPAIGN') }));
                        return false;
                      }
                      updateAnnouncement(announcementId, values);
                      return true;
                    }}
                    className={classes.antDefaultForm}
                  >
                    <GeneralInformationForm
                      isFormEditable={isFormEditable}
                      form={form}
                    />
                    <OptionalControlForm
                      isFormEditable={isFormEditable}
                      form={form}
                    />
                    <SendingInformationForm
                      isFormEditable={isFormEditable}
                      form={form}
                    />
                    <ContentInformationForm
                      form={form}
                      isFormEditable={isFormEditable}
                      formFooter={<FormFooter {...{ isFormEditable, setIsFormEditable, dispatch, t, announcementDetail, announcementId }} />}
                    />
                  </Form>
                ) : (
                  <div>
                    <CountrySelectionAlert
                      itemCountryId={announcementDetail.country}
                      translationKey="marketing:ALERT_COUNTRY_NOTIFICATION_TITLE"
                    />
                  </div>

                )
              }
            </Skeleton>
          </Col>
        </Row>
      </>
    )
  );
};

const FormFooter = ({ isFormEditable, setIsFormEditable, dispatch, t, announcementId }) => {
  return (
    <Row gutter={24} className="pb-md-0 mt-2">
      {isFormEditable ? (
        <>
          <Col>
            <Form.Item className="mt-0">
              <Button
                size="small"
                onClick={() => {
                  setIsFormEditable(false);
                  dispatch(Creators.getAnnouncementRequest({ announcementId }));
                }}
              >
                {t('button:CANCEL')}
              </Button>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item className="mt-0">
              <Button size="small" htmlType="submit" data-test="save-btn">
                {t('button:SAVE')}
              </Button>
            </Form.Item>
          </Col>
        </>
      ) : (
        <Col>
          <Form.Item className="mt-0">
            <Button
              size="small"
              onClick={() => {
                setIsFormEditable(true);
              }}
            >
              {t('button:EDIT')}
            </Button>
          </Form.Item>
        </Col>
      )}
    </Row>
  );
};

const reduxKey = REDUX_KEY.ANNOUNCEMENT.DETAIL;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(AnnouncementDetail);
