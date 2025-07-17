import { Col, Row, Form, Slider, Button } from 'antd';
import { get } from 'lodash';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { CloseOutlined } from '@ant-design/icons';

import useStyles from '../../styles';
import { algorithmDomainConfigDetailSelector } from '@app/pages/Algorithm/Config/Domain/Base/Detail/redux/selectors';
import InheritedValue from '@app/pages/Algorithm/Config/Domain/Base/Detail/components/ConfigInputs/InheritedValue';

const SliderInput = ({ inputParams, formik }) => {
  const { t } = useTranslation(['algorithmConfigPage']);
  const classes = useStyles();
  const isUpdating = useSelector(algorithmDomainConfigDetailSelector.getIsUpdating);

  const {
    values,
    setFieldValue,
  } = formik;

  const value = values[inputParams?.field];

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
    >
      <Row gutter={10}>
        <Col span={18}>
          <Slider
            dots
            min={get(inputParams, 'min', 0)}
            max={get(inputParams, 'max', 100)}
            step={get(inputParams, 'step', 1)}
            value={values[inputParams?.field]}
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

export default SliderInput;
