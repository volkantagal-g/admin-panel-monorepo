import { useEffect, useState } from 'react';
import { compose } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Form, Result, Row, Skeleton } from 'antd';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { get } from 'lodash';

import { HTTP_STATUS_CODE, REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { usePageViewAnalytics, usePermission } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import useStyles from '@app/pages/Popup/Detail/styles';
import { Creators } from '@app/pages/Popup/Detail/redux/actions';
import permKey from '@shared/shared/permKey.json';
import {
  ContentInformationForm,
  GeneralInformationForm,
  StatisticsForm,
  AppLocationSettingForm,
  OptionalControlForm,
} from '@app/pages/Popup/Detail/components';
import { getPopupDetailSelector } from '@app/pages/Popup/Detail/redux/selectors';
import { Creators as CountrySelectionModalCreators } from '@shared/containers/HelperContainer/CountrySelectionModal/redux/actions';
import { REQUEST_ERROR_REASON, POPUP_STATUS_TYPE } from '@app/pages/Popup/constants';
import { requestErrorReasonOptions } from '@app/pages/Popup/constantValues';
import { getLangKey } from '@shared/i18n';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getInitialValues, normalizeFormValues } from '@shared/utils/marketing/formUtils';
import { PAGE_TYPES } from '@shared/constants/marketing/pageTypes';

const PopupDetail = () => {
  usePageViewAnalytics({
    name: ROUTE.POPUP_DETAIL.name,
    squad: ROUTE.POPUP_DETAIL.squad,
  });
  const [form] = Form.useForm();
  const { canAccess } = usePermission();
  const { id: popupId } = useParams();
  const { t } = useTranslation('marketing');

  const dispatch = useDispatch();
  const classes = useStyles();
  const [isFormEditable, setIsFormEditable] = useState(false);

  const popupDetail = useSelector(getPopupDetailSelector.getData);
  const error = useSelector(getPopupDetailSelector.getErrors);
  const isPopupDetailPending = useSelector(getPopupDetailSelector.getIsPending);

  useEffect(() => {
    form.setFieldsValue(getInitialValues(PAGE_TYPES.POPUP_DETAIL, popupDetail));
  }, [popupDetail, isFormEditable, form, popupId]);

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(Creators.getPopupRequest({ popupId }));
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch, popupId]);

  return (
    <Row justify="center" className="mt-4">
      {canAccess(permKey.PAGE_POPUP_DETAIL) && (
        <Col lg={20}>
          <Skeleton loading={isPopupDetailPending} active className="p-5 bg-white">
            {error ? <ErrorResult error={error} t={t} dispatch={dispatch} /> : (
              <Form
                scrollToFirstError
                form={form}
                layout="horizontal"
                name="generalInfoForm"
                labelCol={{ flex: '150px' }}
                labelAlign="left"
                onFinish={values => {
                  setIsFormEditable(false);
                  const status = form.getFieldValue('status');
                  if (status === POPUP_STATUS_TYPE.ACTIVE && !canAccess(permKey.PAGE_POPUP_CAN_ACTIVATE_CAMPAIGN)) {
                    dispatch(ToastCreators.error({ message: t('DONT_HAVE_PERM_FOR_ACTIVATE_CAMPAIGN') }));
                    return false;
                  }
                  dispatch(Creators.updatePopupRequest({
                    data: normalizeFormValues(values, PAGE_TYPES.POPUP_DETAIL),
                    popupId,
                  }));
                  return true;
                }}
                className={classes.antDefaultForm}
              >
                <StatisticsForm />
                <GeneralInformationForm
                  isFormEditable={isFormEditable}
                  form={form}
                />
                <AppLocationSettingForm form={form} isFormEditable={isFormEditable} />
                <OptionalControlForm form={form} isFormEditable={isFormEditable} />
                <ContentInformationForm isFormEditable={isFormEditable} setIsFormEditable={setIsFormEditable} form={form} />
              </Form>
            )}
          </Skeleton>
        </Col>
      )}
    </Row>
  );
};

const ErrorResult = ({ error, t, dispatch }) => {
  const { errorReason } = error.response.data;
  return (
    <Result
      status={errorReason ? HTTP_STATUS_CODE.NOT_FOUND : HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR}
      title={get(requestErrorReasonOptions[errorReason], getLangKey(), '')}
      extra={errorReason === REQUEST_ERROR_REASON.WRONG_COUNTRY_SELECTION && (
        <Button onClick={() => dispatch(CountrySelectionModalCreators.setVisibility({ data: true }))}>
          {t('CHANGE_COUNTRY')}
        </Button>
      )}
    />
  );
};

const reduxKey = REDUX_KEY.POPUP.DETAIL;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(PopupDetail);
