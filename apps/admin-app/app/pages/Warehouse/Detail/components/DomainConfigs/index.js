import { useEffect, useState } from 'react';
import { Form, Row, Col, Alert, Typography } from 'antd';
import { Trans, useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import keys from 'lodash/keys';

import Card from '@shared/components/UI/AntCard';
import { GETIR_MARKET_DOMAIN_TYPES } from '@shared/shared/constants';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import Footer from '../Footer';
import DomainConfigCard from '../DomainConfigCard';
import useStyles from './styles';
import { defaultValues, validationSchema } from './formHelper';
import { getFormattedConfigsForSave } from './utils';
import { ROUTE } from '@app/routes';
import { isDevUrl } from '@app/pages/Warehouse/constants';

const { useForm } = Form;

const { Text } = Typography;

function DomainConfigs(props) {
  const {
    configs,
    domainTypes,
    submitRequest,
    warehouseId,
  } = props;
  const classes = useStyles();
  const { t } = useTranslation();
  const { Can } = usePermission();
  const [form] = useForm();
  const [isFormEditable, setIsFormEditable] = useState(false);

  const initialProps = { ...configs };

  const formik = useFormik({
    initialValues: defaultValues,
    validationSchema,
    onSubmit: async formValues => {
      const formattedConfigs = getFormattedConfigsForSave({ configs: formValues, warehouseDomainTypes: domainTypes });
      await submitRequest({ config: formattedConfigs });
      // eslint-disable-next-line no-use-before-define
      handleResetForm();
      setIsFormEditable(false);
    },
    enableReinitialize: true,
  });

  const { handleSubmit, values, errors, touched, setValues, setFieldValue } = formik;
  const handleResetForm = () => {
    form.resetFields();
    setValues(initialProps);
    return true;
  };

  useEffect(() => {
    const targetKeys = keys(configs);
    if (!targetKeys.length) {
      return;
    }
    setValues({ ...configs });
    form.setFieldsValue({ ...configs });
  }, [form, setValues, configs]);

  const getDomainConfigCards = () => {
    const getirMarketDomainTypes = new Set(GETIR_MARKET_DOMAIN_TYPES);

    return (
      domainTypes.map(domainType => {
        if (!getirMarketDomainTypes.has(domainType)) {
          return null;
        }

        return (
          <Col key={`config-card-col-${domainType}`} xs={24} sm={24} md={24}>
            <DomainConfigCard
              key={`config-card-${domainType}`}
              domainType={domainType}
              domainConfigValues={values[domainType] || {}}
              touched={touched[domainType]}
              errors={errors[domainType]}
              isFormEditable={isFormEditable}
              setFieldValue={setFieldValue}
            />
          </Col>
        );
      })
    );
  };

  const feeDetailsUrl = ROUTE.MARKET_FEES_DETAILS.path.replace(':warehouseId', warehouseId);
  const basketAmountDetailsUrl = ROUTE.GETIR_MARKET_BASKET_CONFIG_DETAILS.path.replace(':warehouseId', warehouseId);

  return (
    <Card title={(
      <p>{t('warehousePage:DOMAIN_CONFIGS.TITLE')}
        <Text strong type="danger" className="ml-2">
          <Trans
            i18nKey="warehousePage:DOMAIN_CONFIGS.REDIRECT_TEXT"
            components={{ Link: <Link to={feeDetailsUrl} />, Link1: <Link to={basketAmountDetailsUrl} /> }}
          />
        </Text>
      </p>
    )}
    >
      {
        isFormEditable && (
          <Alert message={t('warehousePage:DOMAIN_CONFIGS.DEFAULT_VALUE_INFORMATION_TEXT')} type="info" className={classes.infoBox} />
        )
      }
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Row gutter={[16, 16]} align="bottom">
          {getDomainConfigCards()}
        </Row>
        <Can permKey={permKey.PAGE_WAREHOUSE_DETAIL_EDIT_DOMAIN_BASED_BUSINESS_CONFIGS}>
          <Row>
            <Col span={24}>
              <Footer
                formButtonVisibilty={isFormEditable}
                setFormButtonVisibilty={setIsFormEditable}
                handleReset={handleResetForm}
                disabled={isDevUrl}
              />
            </Col>
          </Row>
        </Can>
      </Form>
    </Card>
  );
}

export default DomainConfigs;
