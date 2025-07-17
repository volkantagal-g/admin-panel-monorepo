import { useEffect, useRef, useState, useMemo, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Modal, Button, Form, Input } from 'antd';
import { useFormik } from 'formik';
import { get, toString, isEmpty } from 'lodash';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';

import {
  getConfigGeneralKeySelector,
  getConfigOnBoardingKeySelector,
  getConfigSplashKeySelector,
  updateConfigKeySelector,
  uploadConfigJsonFileSelector,
} from '../../redux/selectors';
import {
  validationSchema,
  getInitialValues,
  manipulateValuesAfterSubmit,
} from './formHelper';
import { Creators } from '../../redux/actions';
import { validate } from '@shared/yup';
import {
  CONFIG_NAME,
  getConfigValue,
  UPDATE_SIGNED_URL_PARAMS,
} from '@app/pages/Config/MobileAnimation/utils';
import { getLangKey } from '@shared/i18n';
import useStyles from './styles';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { operationalCountriesSelector as countriesSelector } from '@shared/redux/selectors/common';

const ConfigEditingModal = ({ type, title }) => {
  const [form] = Form.useForm();
  const theme = useTheme();
  const { t } = useTranslation(['global', 'configPage']);
  const classes = useStyles();
  const fileInputRef = useRef();
  const dispatch = useDispatch();
  const countries = useSelector(countriesSelector.getData);

  const configGeneralKeyData = useSelector(getConfigGeneralKeySelector.getData);
  const configSplashKeyData = useSelector(getConfigSplashKeySelector.getData);
  const configOnBoardingKeyData = useSelector(getConfigOnBoardingKeySelector.getData);
  const S3UploadData = useSelector(uploadConfigJsonFileSelector.getData);
  const isUpdatePending = useSelector(updateConfigKeySelector.getIsPending);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [config, setConfig] = useState([]);
  const [configValue, setConfigValue] = useState(null);
  const [isFormReset, setIsFormReset] = useState(false);

  const dispatchToastError = message => {
    dispatch(ToastCreators.error({ message }));
  };

  useEffect(() => {
    if (isModalVisible) {
      const generalKey = { ...configGeneralKeyData, key: CONFIG_NAME.MOBILE_ANIMATION_GENERAL[getLangKey()] };
      const splashKey = { ...configSplashKeyData, key: CONFIG_NAME.MOBILE_ANIMATION_SPLASH[getLangKey()] };
      const onBoardingKey = { ...configOnBoardingKeyData, key: CONFIG_NAME.MOBILE_ANIMATION_ONBOARDING[getLangKey()] };

      switch (type) {
        case CONFIG_NAME.MOBILE_ANIMATION_GENERAL[getLangKey()]:
          setConfig(generalKey);
          setConfigValue(getConfigValue(generalKey?.value));
          break;
        case CONFIG_NAME.MOBILE_ANIMATION_SPLASH[getLangKey()]:
          setConfig(splashKey);
          setConfigValue(getConfigValue(splashKey?.value));
          break;
        case CONFIG_NAME.MOBILE_ANIMATION_ONBOARDING[getLangKey()]:
          setConfig(onBoardingKey);
          setConfigValue(getConfigValue(onBoardingKey?.value));
          break;
        default:
          // do nothing
          break;
      }
    }
  }, [isModalVisible, type, configGeneralKeyData, configOnBoardingKeyData, configSplashKeyData]);

  const selectableLanguages = useMemo(() => {
    const uniqueLanguages = new Set();
    countries.forEach(country => uniqueLanguages.add(...country.languageSortOrder));
    return Array.from(uniqueLanguages);
  }, [countries]);

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    validate: validate(validationSchema),
    initialValues: getInitialValues(config, configValue, selectableLanguages),
    onSubmit: values => {
      let hasError = false;
      const errTitle = t('configPage:ANIMATION');

      if (!isFormReset) {
        selectableLanguages.forEach(lang => {
          if (isEmpty(values?.description[lang])) {
            const errMessage = t('configPage:ERR_DESCRIPTION');
            dispatchToastError(t(`${errTitle} ${errMessage} - ${lang}`));
            hasError = true;
          }

          if (isEmpty(values?.url[lang])) {
            const errMessage = t('configPage:ERR_ANIMATION');
            dispatchToastError(t(`${errTitle} ${errMessage} - ${lang}`));
            hasError = true;
          }
        });
      }

      if (!hasError) {
        const { key, configType, isCustomEnabled, value } = manipulateValuesAfterSubmit(values, selectableLanguages);
        // eslint-disable-next-line no-underscore-dangle
        dispatch(Creators.updateConfigKeyRequest({ __v: config.__v, key, configType, isCustomEnabled, value }));
        setIsFormReset(false);
      }
    },
  });

  const { handleSubmit, values, setFieldValue, errors, setValues } = formik;

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleClose = () => {
    setIsModalVisible(false);
    setValues(getInitialValues(config, configValue, selectableLanguages));
  };

  useEffect(() => {
    if (!isUpdatePending) {
      setIsModalVisible(false);
    }
  }, [isUpdatePending]);

  const handleResetFormik = () => {
    setIsFormReset(true);
    setFieldValue('description', '');
    setFieldValue('url', '');
    setFieldValue('frame', 1);
    setFieldValue('lang', '');
    setFieldValue('version', '');
    formik.handleSubmit();
  };

  const uploadFile = ({ file, langKey }) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = e => {
      const data = e.target.result;
      dispatch(Creators.uploadConfigJsonFileRequest({
        data,
        langKey,
        fileName: `${moment().valueOf()}-${langKey}`,
        contentType: file?.type,
        folderPath: UPDATE_SIGNED_URL_PARAMS.folder,
        bucketName: UPDATE_SIGNED_URL_PARAMS.bucket,
      }));
    };
  };

  const handleFileChange = (event, langKey) => {
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsText(file);

    if (!file?.size) {
      dispatchToastError(t('configPage:ERR_SELECT_FILE'));
    }

    fileReader.onloadend = e => {
      try {
        JSON.parse(e.target.result);
        uploadFile({ file, langKey });
      }
      catch (err) {
        dispatchToastError(t('configPage:ERR_CHECK_FILE_FORMAT'));
      }
    };
  };

  useEffect(() => {
    if (S3UploadData?.langKey) {
      setFieldValue(`url.${S3UploadData?.langKey}`, S3UploadData?.urlData?.cdnUrl);
      setFieldValue(`version.${S3UploadData?.langKey}`, S3UploadData?.langKey);
    }
  }, [setFieldValue, S3UploadData?.langKey, S3UploadData?.urlData?.cdnUrl]);

  useEffect(() => {
    form.setFieldsValue(values);
  }, [form, values]);

  return (
    <>
      <Button
        type="default"
        onClick={showModal}
        size="small"
      >
        {t('button:EDIT')}
      </Button>
      <Modal
        title={title}
        width={1000}
        centered
        destroyOnClose
        visible={isModalVisible}
        onOk={handleClose}
        onCancel={handleClose}
        bodyStyle={{ height: '500px', overflow: 'auto' }}
        footer={[
          <Button type="primary" danger key="back" onClick={handleClose}>
            {t('button:CANCEL')}
          </Button>,
          <Button
            type="primary"
            danger
            key="reset"
            onClick={handleResetFormik}
          >
            {t('button:RETURN_TO_DEFAULT')}
          </Button>,
          <Button
            key="submit"
            type="primary"
            form="config-key-modal"
            htmlType="submit"
            loading={isUpdatePending}
          >
            {t('button:SAVE')}
          </Button>,
        ]}
      >
        <Form
          form={form}
          id="config-key-modal"
          onFinish={handleSubmit}
          layout="horizontal"
        >
          <Row>
            <Col span={24}>
              <Row>
                <Col span={12}>
                  <Row>
                    <Col span={14} className={classes.colSpace}>
                      <Form.Item
                        help={get(errors, 'key')}
                        validateStatus={get(errors, 'key') ? 'error' : 'success'}
                        name="key"
                        label={t('global:TYPE')}
                      >
                        <Input
                          key={config.key}
                          value={values.key}
                          disabled
                        />
                      </Form.Item>
                    </Col>
                    <Col span={14} className={classes.colSpace}>
                      <Form.Item
                        help={get(errors, 'frame')}
                        validateStatus={get(errors, 'frame') ? 'error' : 'success'}
                        name="frame"
                        label={t('configPage:FRAME')}
                      >
                        <Input
                          type="number"
                          value={values.frame}
                          onChange={event => {
                            const value = get(event, 'target.value', '');
                            setFieldValue('frame', value);
                          }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row gutter={[theme.spacing(3)]}>
                {selectableLanguages?.map((item, index) => {
                  return (
                    <Fragment key={toString(item)}>
                      <Col span={12}>
                        <Form.Item
                          help={get(errors, `description.${item}`)}
                          validateStatus={get(errors, `description.${item}`) ? 'error' : 'success'}
                          name={['description', item]}
                          label={t('configPage:TABLE.DESCRIPTION')}
                        >
                          <Input
                            onChange={event => {
                              const { value } = event.target;
                              setFieldValue(`description.${item}`, value);
                            }}
                            addonAfter={item}
                            key={toString(index)}
                            value={values.description[item]}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Row justify="center">
                          <Col span={20}>
                            <Form.Item
                              help={get(errors, `url.${item}`)}
                              validateStatus={get(errors, `url.${item}`) ? 'error' : 'success'}
                              name={['url', item]}
                              label={t('configPage:ANIMATION')}
                            >
                              <Input
                                key={toString(index)}
                                value={values.url[item]}
                                addonAfter={item}
                                disabled
                              />
                            </Form.Item>
                          </Col>
                          <Col span={4}>
                            <Form.Item
                              help={get(errors, `file.${item}`)}
                              validateStatus={get(errors, `file.${item}`) ? 'error' : 'success'}
                              name={['file', item]}
                            >
                              <Input
                                onChange={event => handleFileChange(event, item)}
                                type="file"
                                key={toString(index)}
                                value={values.file[item]}
                                ref={fileInputRef}
                                className={classes.fileText}
                                accept="application/JSON"
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                      </Col>
                    </Fragment>
                  );
                })}
              </Row>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default ConfigEditingModal;
