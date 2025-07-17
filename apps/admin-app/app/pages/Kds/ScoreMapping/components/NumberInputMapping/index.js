import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { get, differenceWith, isEqual } from 'lodash';
import { Row, Col, Form, Button, Typography, Collapse } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';

import Card from '@shared/components/UI/AntCard';
import { InputWrapper } from '@shared/components/UI/Form';
import MultiLanguageInput from '@shared/components/UI/MultiLanguage/Input';
import { QuestionTypeEnum, ScoreMappingPanelTabs } from '@app/pages/Kds/ScoreMapping/constant';
import { validate } from '@shared/yup';
import { Creators } from '../../redux/actions';
import Footer from '@shared/shared/components/Footer';
import { defaultValues, validationSchema } from './formHelper';
import useStyles from './styles';

const { Panel } = Collapse;
const { Text } = Typography;
const { useForm } = Form;

const newScoreMapping = { name: { tr: '', en: '' }, value: null };

const NumberInputMapping = ({ data, isPending, tabKey }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation('kdsScoreMappingPage');
  const [form] = useForm();

  const [isFormEditable, setIsFormEditable] = useState(false);

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    validateOnChange: false,
    onSubmit: values => {
      const questionType = QuestionTypeEnum[tabKey];
      const GETIR10 = differenceWith(values.GETIR10, data.GETIR10, isEqual);
      const MARKET = differenceWith(values.MARKET, data.MARKET, isEqual);
      const WATER = differenceWith(values.WATER, data.WATER, isEqual);
      const STORE_CONVERSION = differenceWith(values.STORE_CONVERSION, data.STORE_CONVERSION, isEqual);
      const MAIN_WAREHOUSE = differenceWith(values.MAIN_WAREHOUSE, data.MAIN_WAREHOUSE, isEqual);
      dispatch(Creators.updateKdsScoreMappingRequest({
        data:
          { GETIR10, MARKET, WATER, STORE_CONVERSION, questionType, MAIN_WAREHOUSE },
      }));
    },
  });

  const { handleSubmit, values, touched, errors, setFieldValue, setValues } = formik;

  const initializeForm = useCallback(() => {
    let { GETIR10, MARKET, WATER, STORE_CONVERSION, MAIN_WAREHOUSE } = data;

    GETIR10 = GETIR10.length === 0 ? [newScoreMapping] : GETIR10;
    MARKET = MARKET.length === 0 ? [newScoreMapping] : MARKET;
    WATER = WATER.length === 0 ? [newScoreMapping] : WATER;
    STORE_CONVERSION = STORE_CONVERSION.length === 0 ? [newScoreMapping] : STORE_CONVERSION;
    MAIN_WAREHOUSE = MAIN_WAREHOUSE?.length === 0 ? [newScoreMapping] : MAIN_WAREHOUSE;

    form.setFieldsValue({ GETIR10, MARKET, WATER, STORE_CONVERSION, MAIN_WAREHOUSE });
    setValues({ GETIR10, MARKET, WATER, STORE_CONVERSION, MAIN_WAREHOUSE });
  }, [data, form, setValues]);

  useEffect(() => {
    initializeForm();
  }, [initializeForm]);

  useEffect(() => {
    setIsFormEditable(false);
  }, [tabKey]);

  const handleAddNewMapping = type => {
    setValues({ ...values, [type]: [...values[type], newScoreMapping] });
    form.setFieldsValue({ ...values, [type]: [...values[type], newScoreMapping] });
  };

  const handleRemoveMapping = (type, index) => {
    const newMapping = values[type].filter((_val, ind) => ind !== index);
    setValues({ ...values, [type]: newMapping });
    form.setFieldsValue({ ...values, [type]: newMapping });
  };

  const handleEditClick = () => {
    setIsFormEditable(true);
  };

  const handleCancelClick = () => {
    initializeForm();
    setIsFormEditable(false);
  };

  const renderPanelData = type => {
    const allScores = values[type];
    return (
      <>
        {
          allScores.map((value, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Row gutter={[20, 4]} align="middle" key={index}>
              <Col lg={16} xs={16}>
                <MultiLanguageInput
                  disabled={isPending || !isFormEditable}
                  label={t('SCORE_MAPPING_PLACEHOLDER')}
                  fieldPath={[type, index, 'name']}
                  formik={formik}
                />
              </Col>
              <Col lg={4} xs={4}>
                <Text>{t('VALUE')}</Text>
                <InputWrapper
                  mode="number"
                  inputKey={[type, index, 'value']}
                  value={get(values, `${type}.${index}.value`)}
                  isTouched={get(touched, `${type}[${index}].value`)}
                  hasError={get(errors, `${type}[${index}].value`)}
                  setFieldValue={setFieldValue}
                  disabled={isPending || !isFormEditable}
                  additionalProps={{ canBeNegative: true }}
                />
              </Col>
              <Col lg={4} xs={4}>
                <Button
                  className={classes.buttonWrapper}
                  type="primary"
                  icon={<PlusOutlined />}
                  disabled={isPending || !isFormEditable}
                  onClick={() => handleAddNewMapping(type)}
                />
                {
                  (values[type].length > 1 && !value.id) && (
                  <Button
                    className={classes.buttonWrapper}
                    type="primary"
                    icon={<MinusOutlined />}
                    disabled={isPending || !isFormEditable}
                    onClick={() => handleRemoveMapping(type, index)}
                  />
                  )
                }
              </Col>
            </Row>
          ))
        }
      </>
    );
  };

  return (
    <Form form={form} onFinish={handleSubmit}>
      <Card
        loading={isPending}
        title={t('SCORE_MAPPING_TABLE')}
        footer={(
          <Footer
            handleSubmit={handleSubmit}
            handleCancelClick={handleCancelClick}
            handleEditClick={handleEditClick}
            isFormEditable={isFormEditable}
            isPending={isPending}
          />
        )}
      >
        <Collapse defaultActiveKey={['1']} ghost>
          {ScoreMappingPanelTabs.map(tab => {
            return (
              <Panel header={t(tab.translation)} key={tab.key}>
                {renderPanelData(tab.name)}
              </Panel>
            );
          })}
        </Collapse>
      </Card>
    </Form>
  );
};

export default NumberInputMapping;
