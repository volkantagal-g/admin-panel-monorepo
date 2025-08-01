import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Row, Col, Tooltip } from 'antd';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';
import { InfoCircleOutlined } from '@ant-design/icons';

import {
  defaultValues,
  validationSchema,
  getModifiedValues,
  getDisplayTypeOptions,
} from 'pages/MarketProduct/containers/NewProductButton/NewProductModal/formHelper';
import { validate } from '@shared/yup';
import { getSelectFilterOption } from '@shared/utils/common';
import {
  MARKET_PRODUCT_PIECE_UNIT,
  MARKET_PRODUCT_TYPE,
  MARKET_PRODUCT_WEIGHT_UNIT,
} from '@shared/shared/constants';
import { getMarketProductTypeOptions, getMarketProductSubTypeOptions, getCountryRestrictedDomainTypeOptions } from '@app/pages/MarketProduct/utils';
import { Modal, MultiLanguageInput, Select, Switch } from '@shared/components/GUI';
import { isModalOpenSelector, createMarketProductSelector } from 'pages/MarketProduct/containers/NewProductButton/redux/selectors';
import { Creators } from 'pages/MarketProduct/containers/NewProductButton/redux/actions';
import { getSelectedCountryV2 } from '@shared/redux/selectors/countrySelection';

const NewProductModal = () => {
  const dispatch = useDispatch();
  const isPending = useSelector(createMarketProductSelector.getIsPending);
  const { t } = useTranslation('marketProductPageV2');
  const [form] = Form.useForm();
  const theme = useTheme();
  const isModalOpen = useSelector(isModalOpenSelector);
  const {
    currency,
    code: { alpha2: countryCode },
  } = useSelector(getSelectedCountryV2);

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    onSubmit: values => {
      const {
        code: {
          alpha: codeAlpha,
          numeric: codeNumeric,
        },
        isSymbolFirst,
        symbol,
      } = currency;

      const body = getModifiedValues({
        ...values,
        currency: {
          symbol,
          codeAlpha,
          codeNumeric,
          isSymbolFirst,
        },
      });

      dispatch(Creators.createMarketProductRequest({ body }));
    },
  });

  const { handleSubmit, values, errors, setFieldValue, setValues, resetForm } = formik;
  const isProductWeight = Number(values.type) === MARKET_PRODUCT_TYPE.WEIGHT;

  useEffect(() => {
    form.setFieldsValue(values);
  }, [form, values, isPending]);

  const handleCancel = () => {
    dispatch(Creators.closeModal());
    resetForm();
  };

  const handleTypeChange = type => {
    setFieldValue('type', type);
    let unit;
    if (type === MARKET_PRODUCT_TYPE.PIECE) {
      unit = MARKET_PRODUCT_PIECE_UNIT.PIECE;
    }
    else if (type === MARKET_PRODUCT_TYPE.WEIGHT) {
      setFieldValue('isBundle', false);
      unit = MARKET_PRODUCT_WEIGHT_UNIT.KG;
    }
    setValues({ ...values, type, unit });
  };

  return (
    <Modal
      visible={isModalOpen}
      onCancel={handleCancel}
      onOk={handleSubmit}
      okButtonProps={{ disabled: isPending }}
      title={t('NEW_PRODUCT')}
    >
      <Form form={form} id="product-new" layout="vertical">
        <Row className="mb-3">
          <Col span={24}>
            <Select
              mode="multiple"
              allowClear
              value={values.domainTypes}
              onChange={domainTypes => {
                setFieldValue('domainTypes', domainTypes);
              }}
              optionsData={getCountryRestrictedDomainTypeOptions(countryCode)}
              disabled={isPending}
              autoComplete="off"
              showSearch
              filterOption={getSelectFilterOption}
              name="domainTypes"
              label={t('MARKET_INFO.PRODUCT_TARGETS')}
              errors={errors}
            />
          </Col>
        </Row>
        <MultiLanguageInput
          colProps={{ span: 24, className: 'mb-3' }}
          label={t('global:NAME_1')}
          fieldPath={['name']}
          formik={formik}
          disabled={isPending}
        />
        <Row className="mb-3">
          <Col span={24}>
            <Select
              mode="tags"
              allowClear
              value={values.barcodes}
              onChange={barcodes => {
                setFieldValue('barcodes', barcodes);
              }}
              disabled={isPending}
              autoComplete="off"
              showSearch
              filterOption={getSelectFilterOption}
              name="barcodes"
              label={t('BARCODE.BARCODES')}
              errors={errors}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col span={24}>
            <Select
              dataTestId="productTypesSelect"
              allowClear
              value={values.type}
              onChange={handleTypeChange}
              optionsData={getMarketProductTypeOptions()}
              disabled={isPending}
              autoComplete="off"
              showSearch
              filterOption={getSelectFilterOption}
              errors={errors}
              name="type"
              label={(
                <Row gutter={[theme.spacing(2)]}>
                  <Col>
                    {t('PRODUCT_TYPE_INFO.PRODUCT_TYPE')}
                  </Col>
                  <Col className="d-flex text-align-center justify-content-between align-items-center">
                    <Tooltip title={t('PRODUCT_TYPE_INFO.TOOLTIP.PRODUCT_TYPE')} overlayInnerStyle={{ whiteSpace: 'pre-line', width: '300px' }}>
                      <InfoCircleOutlined className="icon-type2" />
                    </Tooltip>
                  </Col>
                </Row>
              )}
            />
          </Col>
        </Row>
        {isProductWeight && (
          <Row className="mb-3">
            <Col span={24}>
              <Select
                allowClear
                value={values.subType}
                onChange={subType => setFieldValue('subType', subType)}
                optionsData={getMarketProductSubTypeOptions(values?.type)}
                disabled={isPending}
                autoComplete="off"
                showSearch
                filterOption={getSelectFilterOption}
                name="subType"
                errors={errors}
                label={(
                  <Row gutter={[theme.spacing(2)]}>
                    <Col>
                      {t('PRODUCT_TYPE_INFO.PRODUCT_SUB_TYPE')}
                    </Col>
                    <Col className="d-flex text-align-center justify-content-between align-items-center">
                      <Tooltip title={t('PRODUCT_TYPE_INFO.TOOLTIP.PRODUCT_SUB_TYPE')} overlayInnerStyle={{ whiteSpace: 'pre-line', width: '500px' }}>
                        <InfoCircleOutlined className="icon-type2" />
                      </Tooltip>
                    </Col>
                  </Row>
                )}
              />
            </Col>
          </Row>
        )}
        {!isProductWeight && (
          <Row gutter={theme.spacing(3)} className="mb-3">
            <Col>
              <span className="mr-2">{t('BUNDLE')}</span>
              <Switch
                name="isBundle"
                checked={values.isBundle}
                onChange={isBundle => {
                  if (isBundle) {
                    setFieldValue('sapReferenceCode', undefined);
                  }

                  setFieldValue('isBundle', isBundle);
                }}
                checkedChildren="ON"
                unCheckedChildren="OFF"
              />
            </Col>
          </Row>
        )}
        {!isProductWeight && values.isBundle && (
          <Row>
            <Col span={24}>
              <Select
                allowClear
                value={values.bundleDisplayType}
                onChange={bundleDisplayType => {
                  setFieldValue('bundleDisplayType', bundleDisplayType);
                }}
                optionsData={getDisplayTypeOptions()}
                disabled={isPending || (values.isBundle && values.isFresh)}
                autoComplete="off"
                showSearch
                filterOption={getSelectFilterOption}
                name="bundleDisplayType"
                label={t('BUNDLE_DISPLAY_TYPE')}
                errors={errors}
              />
            </Col>
          </Row>
        )}
      </Form>
    </Modal>
  );
};

export default NewProductModal;

NewProductModal.propTypes = { ...Modal.propTypes };

NewProductModal.defaultProps = { ...Modal.defaultProps };
