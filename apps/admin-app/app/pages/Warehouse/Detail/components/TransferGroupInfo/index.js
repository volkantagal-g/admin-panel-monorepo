import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import _ from 'lodash';

import { defaultValues, validationSchema } from './formHelper';
import { SelectWrapper } from '@shared/components/UI/Form';
import Card from '@shared/components/UI/AntCard';
import Footer from '../Footer';
import { getLangKey } from '@shared/i18n';
import { validate } from '@shared/yup';

const { useForm } = Form;

function TransferGroupInfo(props) {
  const {
    transferGroup,
    transferGroups,
    submitRequest,
    removeRequest,
  } = props;
  const { t } = useTranslation();
  const [form] = useForm();
  const [isFormEditable, setIsFormEditable] = useState(false);

  const initialProps = { transferGroup };

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    onSubmit: values => {
      if (_.isEqual(values, initialProps)) {
        return false;
      }

      submitRequest(values);

      setIsFormEditable(false);
      return true;
    },
    enableReinitialize: true,
  });

  const { handleSubmit, values, errors, touched, setFieldValue, setValues, setFieldTouched } = formik;

  const handleResetForm = () => {
    if (_.isEqual(values, initialProps)) {
      return false;
    }

    setValues(initialProps);
    form.setFieldsValue(initialProps);
    return true;
  };

  const handleRemoveButtonClick = () => {
    removeRequest();
    setIsFormEditable(false);
    setFieldTouched('transferGroup', false);
  };

  const handleSelectChange = fieldName => {
    return selectedItems => {
      setFieldValue(fieldName, selectedItems);
    };
  };

  useEffect(() => {
    form.setFieldsValue({ transferGroup });
    setValues({ transferGroup });
  }, [form, setValues, transferGroup]);

  return (
    <Card title={t('warehousePage:TRANSFER_GROUP_INFO')}>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Row gutter={[16]} align="bottom">
          <Col span={12}>
            <SelectWrapper
              selectKey="transferGroup"
              label={t('warehousePage:TRANSFER_GROUP')}
              value={values.transferGroup}
              hasError={_.get(errors, 'transferGroup')}
              isTouched={_.get(touched, 'transferGroup')}
              optionsData={transferGroups}
              optionLabelProp={`name.${getLangKey()}`}
              optionValueProp="_id"
              onChangeCallback={handleSelectChange('transferGroup')}
              disabled={!isFormEditable}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Footer
              formButtonVisibilty={isFormEditable}
              setFormButtonVisibilty={setIsFormEditable}
              handleReset={handleResetForm}
              customButton={(
                initialProps.transferGroup ? (
                  <Button type="ghost" onClick={handleRemoveButtonClick}>
                    {t('button:REMOVE')}
                  </Button>
                ) : null
              )}
            />
          </Col>
        </Row>
      </Form>
    </Card>
  );
}

TransferGroupInfo.propTypes = {
  transferGroup: PropTypes.string,
  transferGroups: PropTypes.array,
  // TODO: use arrayOf and provide more information instead. Props.shape([]) is not the correct usage to get rid of eslint rules.
  submitRequest: PropTypes.func,
  removeRequest: PropTypes.func,
};

// TODO: add correct default values for these optional defined props
TransferGroupInfo.defaultProps = {
  transferGroup: undefined,
  transferGroups: undefined,
  // TODO: use arrayOf and provide more information instead. Props.shape([]) is not the correct usage to get rid of eslint rules.
  submitRequest: undefined,
  removeRequest: undefined,
};

export default TransferGroupInfo;
