import { Button, Checkbox, Col, Form, Input, InputNumber, Row, Select, Spin, Typography } from 'antd';

import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';

import AntCard from '@shared/components/UI/AntCard';

import {
  countryLanguages,
  getConfigUrls,
  getInitialValues,
  getModifiedValuesBeforeSubmit,
  validateValuesBeforeSubmit,
  validationSchema,
} from './formHelper';
import { validate } from '@shared/yup';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

import { DEFAULT_DEBOUNCE_MS, REDUX_KEY } from '@shared/shared/constants';
import { PROMO_PIC_CONFIG } from '@app/pages/Promo/constantValues';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import useDebouncedCallback from '@shared/hooks/useDebouncedCallback';
import { getClientsSelector } from './redux/selectors';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { getConfigWithKeySelector } from '@shared/redux/selectors/common';

import useStyles from './styles';

const reduxKey = REDUX_KEY.PERSONAL_PROMO.NEW;

const { Option } = Select;
const { Title } = Typography;

const PersonalPromoNewPage = () => {
  const { t } = useTranslation('personalPromoNewPage');
  const [form] = Form.useForm();

  const styles = useStyles();

  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });

  const clients = useSelector(getClientsSelector.getData);
  const isPending = useSelector(getClientsSelector.getIsPending);

  const config = useSelector(getConfigWithKeySelector.getData);
  const isConfigPending = useSelector(getConfigWithKeySelector.getIsPending);

  const clientSelectOptions = useMemo(() => {
    return clients?.map(client => (
      <Option value={client._id} key={client._id}>
        <div className="d-flex justify-content-between">
          <Typography.Text>{client.name}</Typography.Text>
          <Typography.Text type="secondary">
            {client.gsm}
          </Typography.Text>
        </div>
      </Option>
    ));
  }, [clients]);

  useEffect(() => {
    dispatch(Creators.initContainer());
    dispatch(
      CommonCreators.getConfigWithKeyRequest({
        body: {
          key: PROMO_PIC_CONFIG.key,
          type: PROMO_PIC_CONFIG.type,
        },
      }),
    );
    return () => {
      dispatch(Creators.destroyContainer());
    };
  }, [dispatch]);

  const getClientsRequest = gsm => {
    dispatch(
      Creators.getClientsRequest({ gsm }),
    );
  };

  const handleSearch = gsm => {
    if (gsm?.trim().length >= 3) {
      getClientsRequest(gsm);
    }
  };

  const { debouncedCallback: debouncedHandleSearch } = useDebouncedCallback({
    callback: handleSearch,
    delay: DEFAULT_DEBOUNCE_MS,
  });

  const handleDropdownVisibleChange = isVisible => {
    if (isVisible && !clients?.length) {
      getClientsRequest();
    }
  };

  const pageTitle = t('PAGE_TITLE');

  const formik = useFormik({
    enableReinitialize: true,
    validate: validate(validationSchema),
    initialValues: getInitialValues(),
    onSubmit: values => {
      try {
        validateValuesBeforeSubmit(values, t);
        const body = getModifiedValuesBeforeSubmit(values);
        return dispatch(Creators.createPersonalPromoRequest({ body }));
      }
      catch (error) {
        return dispatch(ToastCreators.error({ error }));
      }
    },
  });

  const { handleSubmit, values, errors, setFieldValue } = formik;

  const handlePartialChange = e => {
    if (e.target.checked) {
      setFieldValue('useLimit', 0);
    }
    else {
      setFieldValue('useLimit', 1);
    }
    setFieldValue('isBalanceEnabled', e.target.checked);
  };

  const handlePushDataChange = (e, language) => {
    setFieldValue(
      'pushData',
      values.pushData.map(item => {
        if (item.lang === language) {
          return { ...item, body: e.target.value };
        }
        return item;
      }),
    );
  };

  useEffect(() => {
    form.setFieldsValue(values);
  }, [values, form]);

  useEffect(() => {
    setFieldValue('picURL', getConfigUrls(config));
  }, [setFieldValue, config]);

  // countryUrls is an object with language code as key and url as value
  const renderInputsForPicUrls = () => {
    const countryUrls = getConfigUrls(config);

    if (!countryUrls) {
      return <div>{t('PROMO_FIELDS.PIC_URL_MISSING')}</div>;
    }

    return Object.keys(countryUrls).map(language => (
      <Input
        disabled
        key={language}
        className={styles.doubleField}
        addonAfter={language}
        value={values.picURL?.[language]}
      />
    ));
  };

  return (
    <Row justify="space-between" align="middle">
      <Col span={24}>
        <Title level={3}>{pageTitle}</Title>
        <AntCard footer={false} bordered={false} title={t('GENERAL_INFO')}>
          <Form
            form={form}
            id="create-personal-promo"
            onFinish={handleSubmit}
            layout="horizontal"
            labelCol={{ span: 3 }}
            labelWrap
          >
            <Form.Item
              validateStatus={errors.client ? 'error' : 'success'}
              name="client"
              label={t('PROMO_FIELDS.CLIENTS')}
              required
            >
              <Select
                value={values.client}
                filterOption={false}
                placeholder={t('global:GSM')}
                onSearch={debouncedHandleSearch}
                onDropdownVisibleChange={handleDropdownVisibleChange}
                onChange={client => setFieldValue('client', client)}
                allowClear
                loading={isPending}
                notFoundContent={isPending ? <Spin size="small" /> : undefined}
                showArrow
                showSearch
                className={styles.doubleField}
              >
                {clientSelectOptions}
              </Select>
            </Form.Item>
            <Form.Item
              name="discountAmount"
              validateStatus={errors.discountAmount ? 'error' : 'success'}
              label={t('PROMO_FIELDS.DISCOUNT_AMOUNT')}
              required
            >
              <InputNumber
                className={styles.singleField}
                onChange={value => setFieldValue('discountAmount', value)}
              />
            </Form.Item>
            {/* needs work */}
            <Form.Item
              name="expire"
              validateStatus={errors.expire ? 'error' : 'success'}
              label={t('PROMO_FIELDS.EXPIRE')}
              required
            >
              <InputNumber
                className={styles.singleField}
                addonAfter={t('global:TIME.FULL.DAY')}
                onChange={value => setFieldValue('expire', value)}
              />
            </Form.Item>
            <Form.Item name="title" label={t('PROMO_FIELDS.TITLE')} required>
              <div className="d-flex justify-content-between">
                {countryLanguages.map(language => (
                  <Input
                    key={language}
                    className={styles.doubleField}
                    addonAfter={language}
                    onChange={e => {
                      setFieldValue('title', {
                        ...values.title,
                        [language]: e.target.value,
                      });
                    }}
                  />
                ))}
              </div>
            </Form.Item>
            <Form.Item label={t('PROMO_FIELDS.PARTIAL')}>
              <Checkbox size="large" onChange={handlePartialChange} />
            </Form.Item>
            <Form.Item
              name="useLimit"
              validateStatus={errors.useLimit ? 'error' : 'success'}
              label={t('PROMO_FIELDS.USE_LIMIT')}
              required
            >
              <InputNumber
                className={styles.singleField}
                onChange={value => setFieldValue('useLimit', value)}
                disabled={values.isBalanceEnabled}
              />
            </Form.Item>
            <Form.Item label={t('PROMO_FIELDS.DO_NOT_CHARGE_DELIVERY_FEE')}>
              <Checkbox
                size="large"
                onChange={e => setFieldValue('doNotChargeDeliveryFee', e.target.checked)}
              />
            </Form.Item>
            <Form.Item
              name="deliveryFee"
              validateStatus={
                !values.doNotChargeDeliveryFee && errors.deliveryFee
                  ? 'error'
                  : 'success'
              }
              label={t('PROMO_FIELDS.DELIVERY_FEE_AMOUNT')}
            >
              <InputNumber
                placeholder={t('DELIVERY_FEE_HINT')}
                className={styles.singleField}
                disabled={values.doNotChargeDeliveryFee}
                onChange={value => setFieldValue('deliveryFee', value)}
              />
            </Form.Item>
            <Form.Item label={t('PROMO_FIELDS.DO_NOT_APPLY_MIN_BASKET_SIZE')}>
              <Checkbox
                size="large"
                onChange={e => setFieldValue('doNotApplyMinimumBasketSize', e.target.checked)}
              />
            </Form.Item>
            <Form.Item name="picURL" label={t('PROMO_FIELDS.PIC_URL')}>
              <div className="d-flex justify-content-between">
                {!isConfigPending ? (
                  renderInputsForPicUrls()
                ) : (
                  <Spin size="small" />
                )}
              </div>
            </Form.Item>
            <Form.Item
              label={t('PROMO_FIELDS.PUSH_NOTIFICATION')}
              name="description"
            >
              <div className="d-flex justify-content-between">
                <Checkbox
                  size="large"
                  checked={values.sendPush}
                  onChange={e => setFieldValue('sendPush', e.target.checked)}
                />
                {values.sendPush &&
                  countryLanguages.map(language => (
                    <Input
                      key={language}
                      value={values.pushData.find(item => item.lang === language)?.body}
                      onChange={e => handlePushDataChange(e, language)}
                      addonAfter={language}
                      className={styles.doubleField}
                    />
                  ))}
              </div>
            </Form.Item>
            <Form.Item
              name="isAlreadySold"
              rules={[{ required: true, message: t('error:REQUIRED') }]}
              label={t('THIS_CODE_IS_SOLD')}
            >
              <Checkbox
                size="large"
                checked={values.isAlreadySold}
                onChange={e => setFieldValue('isAlreadySold', e.target.checked)}
              />
            </Form.Item>
            <Row justify="end">
              <Button
                key="submit"
                type="primary"
                form="create-personal-promo"
                htmlType="submit"
                loading={isPending}
              >
                {t('button:CREATE')}
              </Button>
            </Row>
          </Form>
        </AntCard>
      </Col>
    </Row>
  );
};

export default PersonalPromoNewPage;
