import { Col, Row, Form, Switch, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { CloseOutlined } from '@ant-design/icons';

import useStyles from '../../styles';
import { algorithmDomainConfigDetailSelector } from '@app/pages/Algorithm/Config/Domain/Base/Detail/redux/selectors';
import InheritedValue from '@app/pages/Algorithm/Config/Domain/Base/Detail/components/ConfigInputs/InheritedValue';

const SwitchInput = ({ inputParams, formik }) => {
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
          <Switch
            checked={values[inputParams?.field]}
            checkedChildren={t('algorithmConfigPage:YES')}
            unCheckedChildren={t('algorithmConfigPage:NO')}
            onChange={checked => setFieldValue(inputParams?.field, checked)}
            loading={isUpdating}
          />
        </Col>
        <Col span={6}>
          <InheritedValue inputParams={inputParams} />
        </Col>
      </Row>
    </Form.Item>
  );
};

export default SwitchInput;
