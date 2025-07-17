import PropTypes from 'prop-types';
import { Form, Row, Col, Button, Collapse } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import _ from 'lodash';

import { defaultValues, validationSchema } from './formHelper';
import { InputWrapper, SelectWrapper } from '@shared/components/UI/Form';
import { getLangKey } from '@shared/i18n';
import { validate } from '@shared/yup';

const { useForm } = Form;

const { Panel } = Collapse;

function NewPickerBasket(props) {
  const {
    locationTemplates = [],
    submitRequest,
  } = props;
  const { t } = useTranslation('warehousePage');
  const [form] = useForm();

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    onSubmit: values => {
      submitRequest(values);
    },
    enableReinitialize: true,
  });

  const { handleSubmit, handleChange, values, errors, touched, setFieldValue } = formik;

  const handleSelectChange = selectedItems => {
    setFieldValue('template', selectedItems);
  };

  return (
    <Collapse>
      <Panel header={t('NEW_PICKER_BASKET')}>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Row gutter={[16]} align="bottom">
            <Col span={12}>
              <SelectWrapper
                selectKey="template"
                label={t('PH_SELECT_PICKER_BASKET_TEMPLATE')}
                value={values.template}
                hasError={_.get(errors, 'template')}
                isTouched={_.get(touched, 'template')}
                optionsData={locationTemplates}
                optionLabelProp={`name.${getLangKey()}`}
                optionValueProp="_id"
                onChangeCallback={handleSelectChange}
              />
            </Col>
            <Col span={12}>
              <InputWrapper
                inputKey="sectionOpts.selfCode"
                label={t('PH_INPUT_SECTION_CODE')}
                value={values.sectionOpts.selfCode}
                isTouched={_.get(touched, 'sectionOpts.selfCode')}
                hasError={_.get(errors, 'sectionOpts.selfCode')}
                handleChange={handleChange}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                type="primary"
                htmlType="submit"
              >
                {t('button:SAVE')}
              </Button>
            </Col>
          </Row>
        </Form>
      </Panel>
    </Collapse>
  );
}

NewPickerBasket.propTypes = {
  locationTemplates: PropTypes.array,
  // TODO: use arrayOf and provide more information instead. Props.shape([]) is not the correct usage to get rid of eslint rules.
  submitRequest: PropTypes.func,
};

// TODO: correct these default props
NewPickerBasket.defaultProps = {
  locationTemplates: undefined,
  submitRequest: undefined,
};

export default NewPickerBasket;
