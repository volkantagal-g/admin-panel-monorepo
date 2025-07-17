import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { isEqual as lisEqual, get as lget } from 'lodash';

import { QuestionCircleTwoTone } from '@ant-design/icons';

import { defaultValues, validationSchema } from './formHelper';
import { SelectWrapper } from '@shared/components/UI/Form';
import Card from '@shared/components/UI/AntCard';
import Footer from '../Footer';
import { validate } from '@shared/yup';
import { useSAPReference } from '../SAPReferenceContext';

const { useForm } = Form;

function MainStoreInfo(props) {
  const { mainStore, mainStores, submitRequest, mainWarehouses = [] } = props;
  const { t } = useTranslation();
  const [form] = useForm();
  const [isFormEditable, setIsFormEditable] = useState(false);
  const { hasSAPReferenceCode } = useSAPReference();

  const initialProps = { mainStore, mainWarehouses };
  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    onSubmit: values => {
      if (lisEqual(values, initialProps)) {
        return;
      }

      submitRequest(values);
      setIsFormEditable(false);
    },
    enableReinitialize: true,
  });

  const { handleSubmit, values, errors, touched, setFieldValue, resetForm, setValues } = formik;

  const handleResetForm = () => {
    resetForm();
    setValues(initialProps);
    form.setFieldsValue(initialProps);
  };

  const handleSelectChange = fieldName => {
    return selectedItems => {
      setFieldValue(fieldName, selectedItems);
    };
  };
  const handleSelectMainstorechanges = selectedItems => {
    form.setFieldsValue({ mainStore: selectedItems, mainWarehouses: selectedItems ? [selectedItems] : [] });
    setValues({ mainStore: selectedItems, mainWarehouses: selectedItems ? [selectedItems] : [] });
  };
  useEffect(() => {
    form.setFieldsValue({ mainStore, mainWarehouses });
    setValues({ mainStore, mainWarehouses });
  }, [form, setValues, mainStore, mainWarehouses]);

  return (
    <Card title={t('warehousePage:MAIN_STORE_INFO')}>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Row gutter={[16]} align="bottom">
          <Col span={12}>
            <SelectWrapper
              selectKey="mainStore"
              label={t('MAIN_STORE')}
              value={values.mainStore}
              hasError={lget(errors, 'mainStore')}
              isTouched={lget(touched, 'mainStore')}
              optionsData={mainStores}
              optionLabelProp="name"
              optionValueProp="_id"
              onChangeCallback={handleSelectMainstorechanges}
              disabled={!isFormEditable}
            />
          </Col>
        </Row>
        <Row gutter={[16]} align="bottom">
          <Col span={12}>
            <SelectWrapper
              selectKey="mainWarehouses"
              label={t('MAIN_WAREHOUSES')}
              value={values.mainWarehouses}
              hasError={lget(errors, 'mainWarehouses')}
              isTouched={lget(touched, 'mainWarehouses')}
              optionsData={mainStores}
              optionLabelProp="name"
              optionValueProp="_id"
              onChangeCallback={handleSelectChange('mainWarehouses')}
              disabled={!isFormEditable}
              mode="multiple"
            />
          </Col>
        </Row>
        <Row justify="end">
          {hasSAPReferenceCode ? (
            <Col>
              <Tooltip title={t('warehousePage:CANT_EDIT_WITH_SAP_REFERENCE_CODE')} placement="right">
                <QuestionCircleTwoTone style={{ fontSize: 16 }} twoToneColor="#5D3EBC" />
              </Tooltip>
            </Col>
          ) : (
            <Col span={24}>
              <Footer formButtonVisibilty={isFormEditable} setFormButtonVisibilty={setIsFormEditable} handleReset={handleResetForm} />
            </Col>
          )}
        </Row>
      </Form>
    </Card>
  );
}

MainStoreInfo.propTypes = {
  mainStore: PropTypes.string,
  mainStores: PropTypes.array,
  // TODO: use arrayOf and provide more information instead. Props.shape([]) is not the correct usage to get rid of eslint rules.
  submitRequest: PropTypes.func,
};

// TODO: correct these default props
MainStoreInfo.defaultProps = {
  mainStore: undefined,
  mainStores: undefined,
  submitRequest: undefined,
};

export default MainStoreInfo;
