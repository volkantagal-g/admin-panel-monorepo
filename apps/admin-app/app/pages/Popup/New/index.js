import { useEffect } from 'react';
import { Col, Form, Row } from 'antd';
import { compose } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

import {
  ContentInformationForm,
  GeneralInformationForm,
  AppLocationSettingForm,
  OptionalControlForm,
} from './components';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import saga from '@app/pages/Popup/New/redux/saga';
import { ROUTE } from '@app/routes';
import reducer from './redux/reducer';
import permKey from '@shared/shared/permKey.json';
import { usePageViewAnalytics, usePermission } from '@shared/hooks';
import { Creators } from '@app/pages/Popup/New/redux/actions';
import useStyles from '@app/pages/Popup/New/styles';
import { getConfigWithKeySelector } from '@shared/redux/selectors/common';
import { normalizeFormValues, getInitialValues } from '@shared/utils/marketing/formUtils';
import { PAGE_TYPES } from '@shared/constants/marketing/pageTypes';

const PopupNewPage = () => {
  usePageViewAnalytics({ name: ROUTE.POPUP_NEW.name, squad: ROUTE.POPUP_NEW.squad });
  const dispatch = useDispatch();
  const classes = useStyles();
  const [form] = Form.useForm();

  const activeDomainsFromConfig = useSelector(getConfigWithKeySelector.getData);
  const activeDomainsFromConfigIsPending = useSelector(getConfigWithKeySelector.getIsPending);

  useEffect(() => {
    dispatch(Creators.initPage());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  const { Can } = usePermission();

  return (
    <Can permKey={permKey.PAGE_POPUP_NEW}>
      <Row justify="center" className="mt-4">
        <Col lg={20}>
          <Form
            scrollToFirstError
            form={form}
            initialValues={getInitialValues(PAGE_TYPES.POPUP_NEW)}
            layout="horizontal"
            name="generalInfoForm"
            labelCol={{ flex: '150px' }}
            labelAlign="left"
            onFinish={values => {
              dispatch(Creators.createPopupRequest({ data: normalizeFormValues(values, PAGE_TYPES.POPUP_NEW) }));
            }}
            className={classes.antDefaultForm}
          >
            <GeneralInformationForm
              form={form}
              activeDomainsFromConfig={activeDomainsFromConfig}
              activeDomainsFromConfigIsPending={activeDomainsFromConfigIsPending}
            />
            <AppLocationSettingForm form={form} />
            <OptionalControlForm form={form} />
            <ContentInformationForm form={form} />
          </Form>
        </Col>
      </Row>
    </Can>
  );
};

const reduxKey = REDUX_KEY.POPUP.NEW;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(PopupNewPage);
