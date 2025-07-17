import { Col, InputNumber, Row, Form, Button } from 'antd';
import { get, isNull } from 'lodash';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { CloseOutlined } from '@ant-design/icons';

import { useEffect } from 'react';

import useStyles from '../../styles';
import { algorithmDomainConfigDetailSelector } from '@app/pages/Algorithm/Config/Domain/Base/Detail/redux/selectors';
import InheritedValue from '@app/pages/Algorithm/Config/Domain/Base/Detail/components/ConfigInputs/InheritedValue';

const NumberInput = ({ inputParams, formik }) => {
  const { t } = useTranslation(['algorithmConfigPage']);
  const classes = useStyles();
  const isUpdating = useSelector(algorithmDomainConfigDetailSelector.getIsUpdating);

  const {
    values,
    errors,
    touched,
    setFieldValue,
  } = formik;

  const isTouched = get(touched, inputParams?.field);
  const hasError = get(errors, inputParams?.field);
  const value = values[inputParams?.field];

  useEffect(() => {
    if (isNull(value)) {
      setFieldValue(inputParams?.field, undefined);
    }
  }, [inputParams?.field, setFieldValue, value]);

  return (
    <Form.Item
      label={(
        <>
          {t(`algorithmConfigPage:${inputParams?.field}`)}
          {(value && (
            <Button
              onClick={() => {
                setFieldValue(inputParams?.field, undefined);
              }}
              className={classes.inputClearButton}
              icon={<CloseOutlined />}
              size="small"
            >Clear
            </Button>
          ))}
        </>
      )}
      help={isTouched && hasError}
      validateStatus={isTouched && hasError ? 'error' : 'success'}
    >
      <Row gutter={10}>
        <Col span={18}>
          <InputNumber
            type="number"
            className={classes.numberInput}
            value={values[inputParams?.field]}
            placeholder={t('algorithmConfigPage:ENTER_VALID_VALUE')}
            onChange={val => setFieldValue(inputParams?.field, val)}
            disabled={isUpdating}
          />
        </Col>
        <Col span={6}>
          <InheritedValue inputParams={inputParams} />
        </Col>
      </Row>
    </Form.Item>
  );
};

export default NumberInput;
