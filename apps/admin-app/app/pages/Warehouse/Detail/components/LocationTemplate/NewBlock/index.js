import PropTypes from 'prop-types';
import { Form, Row, Col, Button, Collapse } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { get as lget } from 'lodash';

import { defaultValues, validationSchema } from './formHelper';
import { InputWrapper, SelectWrapper } from '@shared/components/UI/Form';
import { getLangKey } from '@shared/i18n';
import { validate } from '@shared/yup';

const { useForm } = Form;

const { Panel } = Collapse;

function NewBlock(props) {
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
      <Panel header={t('NEW_BLOCK')}>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Row gutter={[16]} align="bottom">
            <Col span={12}>
              <SelectWrapper
                selectKey="template"
                label={t('PH_SELECT_BLOCK_TEMPLATE')}
                value={values.template}
                hasError={lget(errors, 'template')}
                isTouched={lget(touched, 'template')}
                optionsData={locationTemplates}
                optionLabelProp={`name.${getLangKey()}`}
                optionValueProp="_id"
                onChangeCallback={handleSelectChange}
              />
            </Col>
            <Col span={12}>
              <InputWrapper
                inputKey="blockOpts.selfCode"
                label={t('PH_INPUT_SECTION_CODE')}
                value={values.blockOpts.selfCode}
                isTouched={lget(touched, 'blockOpts.selfCode')}
                hasError={lget(errors, 'blockOpts.selfCode')}
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

NewBlock.propTypes = {
  locationTemplates: PropTypes.array,
  // TODO: use arrayOf and provide more information instead. Props.shape([]) is not the correct usage to get rid of eslint rules.
  submitRequest: PropTypes.func,
};

// TODO: correct these default props
NewBlock.defaultProps = {
  locationTemplates: undefined,
  submitRequest: undefined,
};

export default NewBlock;
