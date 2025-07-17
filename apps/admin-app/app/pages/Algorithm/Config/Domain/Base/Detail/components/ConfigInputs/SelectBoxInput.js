import { Col, Row, Form, Select, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { CloseOutlined } from '@ant-design/icons';

import useStyles from '../../styles';
import { algorithmDomainConfigDetailSelector } from '@app/pages/Algorithm/Config/Domain/Base/Detail/redux/selectors';
import InheritedValue from '@app/pages/Algorithm/Config/Domain/Base/Detail/components/ConfigInputs/InheritedValue';

const SelectBoxInput = ({ inputParams, formik }) => {
  const { t } = useTranslation(['algorithmConfigPage']);
  const classes = useStyles();

  const isUpdating = useSelector(algorithmDomainConfigDetailSelector.getIsUpdating);

  const {
    values,
    setFieldValue,
  } = formik;

  const options = useMemo(() => {
    return inputParams?.options?.map(option => {
      return {
        value: option,
        label: option,
      };
    });
  }, [inputParams]);

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
              style={{ marginLeft: 10, fontSize: 10 }}
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
          <Select
            value={values[inputParams?.field]}
            placeholder={t('algorithmConfigPage:CHOOSE_VALID_VALUE')}
            onChange={val => setFieldValue(inputParams?.field, val)}
            disabled={isUpdating}
            options={options}
          />
        </Col>
        <Col span={6}>
          <InheritedValue inputParams={inputParams} />
        </Col>
      </Row>
    </Form.Item>
  );
};

export default SelectBoxInput;
