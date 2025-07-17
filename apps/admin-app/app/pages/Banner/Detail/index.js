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
import useStyles from '@app/pages/Banner/Detail/styles';
import { Creators } from '@app/pages/Banner/Detail/redux/actions';
import permKey from '@shared/shared/permKey.json';

import {
  ContentInformationForm,
  GeneralInformationForm,
  SendingInformationForm,
  AppLocationSettingForm,
  OptionalControlForm,
} from '@app/pages/Banner/Detail/components';

import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { bannerDetailSelector } from '@app/pages/Banner/Detail/redux/selectors';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import CountrySelectionAlert from '@shared/containers/HelperContainer/CountrySelectionAlert';
import PageHeader from '@app/pages/Banner/Detail/components/PageHeader';
import { BANNER_STATUS, BANNER_TYPE, COMPONENT_TYPE } from '@app/pages/Banner/constants';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getInitialValues, normalizeFormValues } from '@shared/utils/marketing/formUtils';
import { PAGE_TYPES } from '@shared/constants/marketing/pageTypes';

const BannerDetail = () => {
  usePageViewAnalytics({
    name: ROUTE.BANNER_DETAIL.name,
    squad: ROUTE.BANNER_DETAIL.squad,
  });
  const [form] = Form.useForm();
  const { canAccess } = usePermission();
  const { id: bannerId } = useParams();
  const { t } = useTranslation('marketing');

  const dispatch = useDispatch();
  const classes = useStyles();
  const [isFormEditable, setIsFormEditable] = useState(false);

  const bannerDetail = useSelector(bannerDetailSelector.getData);
  const isBannerDetailPending = useSelector(bannerDetailSelector.getIsPending);

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(Creators.getBannerRequest({ bannerId }));
    dispatch(CommonCreators.getConfigWithKeyRequest({
      body: {
        key: ADMIN_PANEL_CONFIGS.ACTIVE_DOMAIN_TYPES,
        type: MARKET_CONFIG_QUERY_TYPES.ARRAY,
      },
    }));
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch, bannerId]);

  const countryId = get(getSelectedCountry(), '_id');
  const isCountryBanner = bannerDetail.country ? countryId === bannerDetail.country : true;

  useEffect(() => {
    if (bannerDetail.type === BANNER_TYPE.ADVERT) {
      // If advert banner redirect to advert panel
      window.open(bannerDetail?.advertPanelUrl, '_self');
    }
    form.setFieldsValue(getInitialValues(PAGE_TYPES.BANNER_DETAIL, bannerDetail));
  }, [bannerDetail, isFormEditable, form]);

  const onFinish = values => {
    const status = form.getFieldValue('status');
    if (status === BANNER_STATUS.ACTIVE && !canAccess(permKey.PAGE_BANNER_CAN_ACTIVATE_CAMPAIGN)) {
      dispatch(ToastCreators.error({ message: t('DONT_HAVE_PERM_FOR_ACTIVATE_CAMPAIGN') }));
      return false;
    }
    if (values?.componentType === COMPONENT_TYPE.GAME_COMPONENT) {
      dispatch(Creators.saveGameBannerFlow({ id: bannerId, values }));
    }
    else {
      dispatch(Creators.updateBannerRequest({ id: bannerId, body: normalizeFormValues(values, PAGE_TYPES.BANNER_DETAIL) }));
      setIsFormEditable(false);
    }

    return true;
  };

  return (
    canAccess(permKey.PAGE_BANNER_DETAIL) && (
      <>
        <PageHeader
          bannerDetail={bannerDetail}
          isBannerDetailPending={isBannerDetailPending}
          isFormEditable={isFormEditable}
          form={form}
        />
        <Row justify="center" className="mt-4">
          <Col lg={20}>
            <Skeleton loading={isBannerDetailPending} active className="p-5 bg-white">
              {
                isCountryBanner ? (
                  <Form
                    scrollToFirstError
                    form={form}
                    initialValues={getInitialValues(PAGE_TYPES.BANNER_DETAIL, bannerDetail)}
                    layout="horizontal"
                    name="createBannerForm"
                    labelCol={{ flex: '150px' }}
                    labelAlign="left"
                    onFinish={onFinish}
                    className={classes.antDefaultForm}
                  >
                    <GeneralInformationForm
                      isFormEditable={isFormEditable}
                      form={form}
                    />
                    <AppLocationSettingForm form={form} isFormEditable={isFormEditable} />
                    <ContentInformationForm
                      form={form}
                      isFormEditable={isFormEditable}
                    />

                    <OptionalControlForm form={form} isFormEditable={isFormEditable} />

                    <SendingInformationForm
                      form={form}
                      isFormEditable={isFormEditable}
                      footer={<FormFooter {...{ isFormEditable, setIsFormEditable, dispatch, t, bannerDetail, bannerId }} />}
                    />
                  </Form>
                ) : (
                  <CountrySelectionAlert
                    itemCountryId={bannerDetail.country}
                    translationKey="marketing:ALERT_COUNTRY_NOTIFICATION_TITLE"
                  />
                )
              }
            </Skeleton>
          </Col>
        </Row>
      </>
    )
  );
};

const FormFooter = ({ isFormEditable, setIsFormEditable, dispatch, t, bannerId }) => {
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
                  dispatch(Creators.getBannerRequest({ bannerId }));
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

const reduxKey = REDUX_KEY.BANNER.DETAIL;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(BannerDetail);
