import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col, Button, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { isEqual, get } from 'lodash';
import { useSelector } from 'react-redux';

import { defaultValues, validationSchema } from './formHelper';
import { pickerDetailSelector } from '../../redux/selectors';
import { usePermission } from '@shared/hooks';
import Card from '@shared/components/UI/AntCard';
import Footer from '../Footer';
import { validate } from '@shared/yup';
import AntSelect from '@shared/components/UI/AntSelect';
import { getWarehouseOptions } from '@shared/utils/formHelper';
import { getWarehousesSelector } from '@shared/redux/selectors/common';
import permKey from '@shared/shared/permKey.json';
import useStyles from './styles';
import ShowTooltip from '@shared/components/UI/ShowTooltip';

const { useForm } = Form;

function Warehouse({ submitRequest, warehouse, releasePickerFromWarehouse, isPickerWorking }) {
  const { t } = useTranslation('pickerDetailPage');
  const { canAccess } = usePermission();
  const styles = useStyles();
  const [form] = useForm();
  const [isFormEditable, setIsFormEditable] = useState(false);
  const initialProps = { warehouse };
  const isReleaseWarehousePending = useSelector(
    pickerDetailSelector.getIsReleaseWarehousePending,
  );
  const isAuthorizedToChangeWarehouse = canAccess(permKey.PAGE_PICKER_DETAIL_SET_WAREHOUSE_PICKER);

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    onSubmit: values => {
      if (isEqual(values, initialProps)) {
        return false;
      }
      submitRequest({ warehouse: values.warehouse });
      setIsFormEditable(false);
      return true;
    },
    enableReinitialize: true,
  });

  const { handleSubmit, values, setFieldValue, setValues, touched, errors } =
    formik;

  const warehouses = useSelector(getWarehousesSelector.getData);
  const handleResetForm = () => {
    if (isEqual(values, initialProps)) {
      return false;
    }

    setValues(initialProps);
    form.setFieldsValue(initialProps);
    return true;
  };

  useEffect(() => {
    form.setFieldsValue({ warehouse });
    setValues({ warehouse });
  }, [form, warehouse, setValues]);

  return (
    <Col span={24}>
      <Card title={t('WAREHOUSE')}>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Row gutter={[16]} align="bottom">
            <Col span={24}>
              <Form.Item
                name="warehouse"
                hasError={get(errors, 'warehouse')}
                isTouched={get(touched, 'warehouse')}
                label={t('WAREHOUSE')}
              >
                <AntSelect
                  disabled={!isFormEditable}
                  value={values.warehouse}
                  selectKey="warehouse"
                  options={getWarehouseOptions(warehouses)}
                  onChange={selectedWarehouse => {
                    setFieldValue('warehouse', selectedWarehouse);
                  }}
                  showSearch
                  placeholder={t('MAIN_WAREHOUSE')}
                  filterOption={(input, option) => {
                    const label = option?.label?.toString().toLowerCase();
                    const value = option?.value?.toString().toLowerCase();
                    const inputComparable = input?.toString().toLowerCase();
                    return Boolean(
                      (label && label.indexOf(inputComparable) >= 0) ||
                        (value && value.indexOf(inputComparable) >= 0),
                    );
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row align="bottom">
            {isAuthorizedToChangeWarehouse && (
            <Col span={24}>
              <Space align="end" className={styles.end}>
                <ShowTooltip
                  show={isPickerWorking}
                  tooltipProps={{ title: t('PICKER_IS_WORKING_WARNING') }}
                >
                  <Button
                    type="default"
                    disabled={!warehouse || isPickerWorking}
                    onClick={() => releasePickerFromWarehouse({ warehouse })}
                    loading={isReleaseWarehousePending}
                  >
                    {t('REMOVE_WAREHOUSE_FROM_PICKER')}
                  </Button>
                </ShowTooltip>

                <Footer
                  disabled={values.warehouse}
                  formButtonVisibilty={isFormEditable}
                  setFormButtonVisibilty={setIsFormEditable}
                  handleReset={handleResetForm}
                />
              </Space>
            </Col>
            )}
          </Row>
        </Form>
      </Card>
    </Col>
  );
}

Warehouse.propTypes = { submitRequest: PropTypes.func.isRequired };

export default Warehouse;
