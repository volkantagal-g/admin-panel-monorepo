import {
  Card,
  Col,
  Collapse,
  Form,
  Input,
  Row,
  Select,
  Switch,
  Typography,
} from 'antd';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';

import { prepareUpdateMerchantPayload } from '../formHelpers';
import { merchantDetailSelector, updateMerchantSelector } from '../../../redux/selectors';
import { Creators } from '../../../redux/actions';
import CardFooter from '../../CardFooter';
import AntSelect from '@shared/components/UI/AntSelect';
import { captureTypeList } from '@app/pages/Payment/Merchant/New/constants';
import { operationalCountriesSelector as countriesSelector } from '@shared/redux/selectors/common';
import useStyles from '../styles';

const { Panel } = Collapse;
const { Text } = Typography;

const Settings = ({ initialSettings, t, disableEditAction }) => {
  const [editActive, setEditActive] = useState(false);
  const [form] = Form.useForm();
  const { id } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const countries = useSelector(countriesSelector.getData);

  const countryAlpha2Codes = countries.map(country => (
    { label: country?.code?.alpha2, value: country?.code?.alpha2 }
  ));

  const merchantDetailSelectorData = useSelector(
    merchantDetailSelector.getData,
  );

  const updateMerchantSelectorIsPending = useSelector(updateMerchantSelector.getIsPending);

  const { displayName, enabled, countryCode, currency, timeZone, captureType } =
      initialSettings;
  const {
    symbol,
    codeName,
    codeAlpha2,
    codeAlpha3,
    codeNumeric,
    precision,
    thousandSeparator,
    decimalSeparator,
    prefixSymbol,
    suffixSymbol,
  } = currency;
  const { id: timeZoneId, name, offset } = timeZone;

  const handleSubmitForm = () => {
    const {
      displayName: updatedDisplayName,
      enabled: updatedEnabled,
      countryCode: updatedCountryCode,
      id: updatedId,
      name: updatedName,
      offset: updatedOffset,
      captureType: updatedCaptureType,
    } = form.getFieldsValue();
    const updatedSettings = {
      displayName: updatedDisplayName,
      enabled: updatedEnabled,
      countryCode: updatedCountryCode,
      captureType: updatedCaptureType,
      timeZone: { id: updatedId, name: updatedName, offset: updatedOffset },
    };

    merchantDetailSelectorData.settings = updatedSettings; // only "settings" field changeable in this form
    const updateMerchantPayload = prepareUpdateMerchantPayload(merchantDetailSelectorData);

    dispatch(Creators.updateMerchantRequest(updateMerchantPayload));
    dispatch(Creators.getMerchantDetailRequest({ id }));
    setEditActive(false);
  };
  const handleCancel = () => {
    setEditActive(false);
    form.resetFields();
  };

  return (
    <Collapse defaultActiveKey="2">
      <Panel header={<div>{t('paymentMerchantPage:SETTINGS')}</div>} key="2">
        <Form
          form={form}
          name="settings-form"
          layout="vertical"
          initialValues={{
            displayName,
            enabled,
            countryCode,
            captureType,
            currency,
            symbol,
            codeName,
            codeAlpha2,
            codeAlpha3,
            codeNumeric,
            precision,
            prefixSymbol,
            suffixSymbol,
            thousandSeparator,
            decimalSeparator,
            id: timeZoneId,
            name,
            offset,
          }}
          autoComplete="off"
        >
          <Row gutter={12}>
            <Col md={8} xs={24}>
              <Card className={classes.fullHeight} title={t('paymentMerchantPage:GENERAL_SETTINGS')}>
                <Form.Item
                  label={t('paymentMerchantPage:DISPLAY_NAME')}
                  name="displayName"
                >
                  <Input disabled={!editActive} />
                </Form.Item>
                <Form.Item
                  label={t('paymentMerchantPage:COUNTRY_CODE')}
                  name="countryCode"
                >
                  <AntSelect options={countryAlpha2Codes} disabled={!editActive} />
                </Form.Item>
                <Form.Item
                  label={t('paymentMerchantPage:CAPTURE_TYPE')}
                  name="captureType"
                >
                  <Select
                    options={captureTypeList}
                    disabled={!editActive}
                    placeholder={t('paymentMerchantPage:CAPTURE_TYPE')}
                  />
                </Form.Item>
                <Form.Item
                  label={t('paymentMerchantPage:ENABLED')}
                  name="enabled"
                  valuePropName="checked"
                >
                  <Switch disabled={!editActive} />
                </Form.Item>
              </Card>
            </Col>
            <Col md={8} xs={24}>
              <Card
                className={classes.fullHeight}
                title={editActive ? (
                  <>
                    {t('global:CURRENCY')}  <br />
                    <Text type="warning">  <ExclamationCircleOutlined className="mr-1" />
                      {t('paymentMerchantPage:CURRENCY_WARNING')}
                    </Text>

                  </>
                ) : t('global:CURRENCY')}
              >
                <Row gutter={12}>
                  <Col span={8}>
                    <Form.Item
                      data-testid="currency-symbol"
                      label={t('global:CURRENCY_DETAIL.SYMBOL')}
                      name="symbol"
                    >
                      <Input disabled />
                    </Form.Item>
                    <Form.Item
                      data-testid="currency-decimal-separator"
                      label={t('global:CURRENCY_DETAIL.DECIMAL_SEPARATOR')}
                      name="decimalSeparator"
                    >
                      <Input disabled />
                    </Form.Item>
                    <Form.Item
                      data-testid="currency-code-name"
                      label={t('global:CURRENCY_DETAIL.CODE_NAME')}
                      name="codeName"
                    >
                      <Input disabled />
                    </Form.Item>
                    <Form.Item
                      data-testid="currency-code-alpha2"
                      label={t('global:CURRENCY_DETAIL.CODE_ALPHA2')}
                      name="codeAlpha2"
                    >
                      <Input disabled />
                    </Form.Item>
                  </Col>
                  <Col span={8}>

                    <Form.Item
                      data-testid="currency-prefixSymbol"
                      label={t('global:CURRENCY_DETAIL.PREFIX_SYMBOL')}
                      name="prefixSymbol"
                    >
                      <Input disabled />
                    </Form.Item>

                    <Form.Item
                      data-testid="currency-thousand-separator"
                      label={t('global:CURRENCY_DETAIL.THOUSAND_SEPARATOR')}
                      name="thousandSeparator"
                    >
                      <Input disabled />
                    </Form.Item>
                    <Form.Item
                      data-testid="currency-code-numeric"
                      label={t('global:CURRENCY_DETAIL.CODE_NUMERIC')}
                      name="codeNumeric"
                    >
                      <Input disabled />
                    </Form.Item>
                    <Form.Item
                      data-testid="currency-code-alpha3"
                      label={t('global:CURRENCY_DETAIL.CODE_ALPHA3')}
                      name="codeAlpha3"
                    >
                      <Input disabled />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      data-testid="currency-suffix-symbol"
                      label={t('global:CURRENCY_DETAIL.SUFFIX_SYMBOL')}
                      name="suffixSymbol"
                    >
                      <Input disabled />
                    </Form.Item>

                    <Form.Item
                      data-testid="currency-precision"
                      label={t('global:CURRENCY_DETAIL.PRECISION')}
                      name="precision"
                    >
                      <Input type="number" disabled />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col md={8} xs={24}>
              <Card className={classes.fullHeight} title={t('paymentMerchantPage:TIME_ZONE')}>
                <Row gutter={12}>
                  <Col span={24}>
                    <Form.Item label="ID" name="id">
                      <Input disabled={!editActive} />
                    </Form.Item>
                    <Form.Item label={t('global:NAME')} name="name">
                      <Input disabled={!editActive} />
                    </Form.Item>
                    <Form.Item
                      label={t('paymentMerchantPage:OFFSET')}
                      name="offset"
                    >
                      <Input disabled={!editActive} />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Form>
        {
          !disableEditAction && (
            <CardFooter
              loading={updateMerchantSelectorIsPending}
              editActive={editActive}
              setEditActive={setEditActive}
              handleSubmitForm={handleSubmitForm}
              handleCancel={handleCancel}
            />
          )
        }

      </Panel>
    </Collapse>
  );
};

Settings.prototype = {
  initialSettings: PropTypes.shape({
    displayName: PropTypes.string,
    enabled: PropTypes.bool,
    countryCode: PropTypes.string,
    currency: PropTypes.shape({
      symbol: PropTypes.string,
      codeName: PropTypes.string,
      codeAlpha2: PropTypes.string,
      codeAlpha3: PropTypes.string,
      codeNumeric: PropTypes.string,
      precision: PropTypes.number,
      thousandSeparator: PropTypes.string,
      decimalSeparator: PropTypes.string,
      prefixSymbol: PropTypes.string,
      suffixSymbol: PropTypes.string,
    }),
    timeZone: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      offset: PropTypes.string,
    }),
  }),
  disableEditAction: PropTypes.bool,
  t: PropTypes.func,
};
Settings.defaultProps = {
  initialSettings: {
    displayName: '',
    enabled: false,
    countryCode: '',
    currency: {
      symbol: '',
      codeName: '',
      codeAlpha2: '',
      codeAlpha3: '',
      codeNumeric: '',
      precision: 0,
      thousandSeparator: '',
      decimalSeparator: '',
      prefixSymbol: '',
      suffixSymbol: '',
    },
    timeZone: {
      id: '',
      name: '',
      offset: '',
    },
  },
  t: () => {},
  disableEditAction: false,
};

export default Settings;
