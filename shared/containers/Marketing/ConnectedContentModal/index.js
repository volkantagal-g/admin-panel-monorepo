import { useEffect, useState } from 'react';
import { Button, Col, Form, Input, Modal, Row, Select, Skeleton } from 'antd';
import { compose } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { FlagOutlined, SnippetsOutlined, CopyOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import copy from 'copy-to-clipboard';

import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import saga from '@shared/containers/Marketing/ConnectedContentModal/redux/saga';
import injectReducer from '@shared/utils/injectReducer';
import reducer from '@shared/containers/Marketing/ConnectedContentModal/redux/reducer';
import { Creators } from '@shared/containers/Marketing/ConnectedContentModal/redux/actions';
import OptionalControls from '@shared/containers/Marketing/OptionalControls';
import { OPTIONAL_CONTROL } from '@shared/containers/Marketing/OptionalControls/constants';
import TargetDomainSelect from '@shared/containers/Marketing/Select/TargetDomainSelect';
import { convertPhoneLanguageOptions } from '@app/pages/Popup/utils';
import { getSelectedCountryLanguages } from '@shared/redux/selectors/countrySelection';
import { connectedContentSelector } from '@shared/containers/Marketing/ConnectedContentModal/redux/selectors';
import useStyles from '@shared/containers/Marketing/ConnectedContentModal/styles';

const ConnectedContentModal = () => {
  const { t } = useTranslation('marketing');
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const classes = useStyles();

  const connectedContent = useSelector(connectedContentSelector.getConnectedContent);
  const isConnectedContentPending = useSelector(connectedContentSelector.isConnectedContentPending);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    dispatch(Creators.resetConnectedContent());
  };

  useEffect(() => {
    dispatch(Creators.initPage());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  return (
    <>
      <Button type="secondary" icon={<SnippetsOutlined />} onClick={showModal} disabled={isConnectedContentPending}>
        {t('GENERATE_BRAZE_TEMPLATE')}
      </Button>
      <Modal
        title={t('GENERATE_BRAZE_TEMPLATE')}
        okText={t('GENERATE')}
        visible={isModalOpen}
        okButtonProps={{ disabled: isConnectedContentPending }}
        onOk={() => {
          form.submit();
        }}
        onCancel={handleCancel}
        width={1000}
        destroyOnClose
      >
        <Form
          scrollToFirstError
          form={form}
          initialValues={{ languages: getSelectedCountryLanguages() }}
          layout="horizontal"
          name="createConnectedContentForm"
          labelCol={{ flex: '150px' }}
          labelAlign="left"
          onFinish={values => {
            dispatch(Creators.createConnectedContentRequest({ formBody: values }));
          }}
        >

          <Row gutter={24}>
            <Col lg={12}>
              <TargetDomainSelect disabled={isConnectedContentPending} fieldName="domainType" rules={[{ required: true, message: t('error:REQUIRED') }]} />
            </Col>
            <Col lg={12}>
              <Form.Item name="languages" rules={[{ required: true, message: t('error:REQUIRED') }]}>
                <Select
                  disabled={isConnectedContentPending}
                  placeholder={t('APP_LANGUAGES')}
                  showArrow
                  suffixIcon={<FlagOutlined />}
                  options={convertPhoneLanguageOptions(getSelectedCountryLanguages())}
                  mode="multiple"
                  autoComplete="off"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item dependencies={['domainType', 'languages']} noStyle>
            {({ getFieldValue }) => {
              const languages = getFieldValue('languages') ?? [];
              return (
                <Row gutter={24}>
                  { languages.map(lang => {
                    return (
                      <Col lg={8} className="mb-4">
                        <Form.Item
                          preserve={false}
                          rules={[{ required: true, message: t('error:REQUIRED') }]}
                          name={['messages', lang]}
                          className="w-100 d-inline"
                          label={<>{t('CONTENT')} <b className="ml-1">{lang.toUpperCase()}</b></>}
                        >
                          <Input.TextArea rows={3} suffix={lang.toUpperCase()} disabled={isConnectedContentPending} />
                        </Form.Item>
                      </Col>
                    );
                  })}
                </Row>
              );
            }}
          </Form.Item>

          <OptionalControls
            form={form}
            isFormEditable={!isConnectedContentPending}
            inactiveControls={
              [
                OPTIONAL_CONTROL.HOUR_SCHEDULER,
                OPTIONAL_CONTROL.GETIR_MARKET_CATEGORY_CONTROL,
                OPTIONAL_CONTROL.TOTAL_ORDER_COUNT,
                OPTIONAL_CONTROL.ARTISAN_SERVICE_AREA_STORE_CONTROL,
              ]
            }
            controlFieldName="type"
            domainTypeFieldName="domainType"
            dependencyArr={['domainType', 'activeDomains']}
          />

        </Form>

        { connectedContent && (
          <div className="bg-light p-5 position-relative">
            { isConnectedContentPending ? <Skeleton /> : (
              <><p>{connectedContent}</p>
                <Button
                  type="button"
                  className={classes.clipboardBtn}
                  icon={<CopyOutlined />}
                  onClick={() => {
                    copy(connectedContent);
                  }}
                />
              </>
            ) }
          </div>
        )}

      </Modal>
    </>
  );
};

const reduxKey = REDUX_KEY.MARKETING.CONNECTED_CONTENT_MODAL;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(ConnectedContentModal);
