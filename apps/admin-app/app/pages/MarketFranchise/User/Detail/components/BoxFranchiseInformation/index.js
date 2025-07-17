import { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Row, Col, Select, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { get, cloneDeep } from 'lodash';

import AntCard from '@shared/components/UI/AntCard';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import { validate } from '@shared/yup';
import { SelectWrapper } from '@shared/components/UI/Form';
import { Creators } from '../../redux/actions';
import { franchisesSelector, updateFranchiseUserFranchiseSelector } from '../../redux/selectors';
import { BOXES_DEFAULT_PROPS, BOXES_PROP_TYPES } from '../../constants';
import { arrangeWarehousesString } from '../../utils';
import { validationSchema } from './formHelper';
import Footer from '../BoxFooter';
import { tableColumnsFranchiseOwners } from './configFranchiseOwners';
import { tableColumnsWarehouses } from './configWarehouses';

const { Option } = Select;
const { Text } = Typography;

const BoxFranchiseInformation = ({ data, isPending, editPermKey }) => {
  const { t } = useTranslation(['marketFranchiseUserPage', 'error']);
  const dispatch = useDispatch();

  const [isFormEditable, setIsFormEditable] = useState(false);
  const [editableFranchise, setEditableFranchise] = useState({});

  const allFranchises = useSelector(franchisesSelector.getData);
  const isPendingUpdateFranchiseUserFranchise = useSelector(updateFranchiseUserFranchiseSelector.getIsPending);
  const isSuccessUpdateFranchiseUserFranchise = useSelector(updateFranchiseUserFranchiseSelector.getIsSuccess);

  const validationFn = useMemo(() => validate(() => validationSchema({ t })), [t]);

  const [form] = Form.useForm();

  const formik = useFormik({
    enableReinitialize: true,
    validate: validationFn,
    initialValues: data,
    onSubmit: formValues => {
      dispatch(Creators.updateFranchiseUserFranchiseRequest({ franchiseId: editableFranchise._id, userId: formValues._id }));
    },
  });

  const { handleSubmit, values, setValues, setFieldValue, resetForm } = formik;

  const handleFieldChange = (fieldName, franchiseId) => {
    setEditableFranchise(...allFranchises.filter(franchise => franchise._id === franchiseId));
    return () => {
      setFieldValue(fieldName, franchiseId);
    };
  };

  const columnsFranchiseOwners = useMemo(() => tableColumnsFranchiseOwners(t), [
    t,
  ]);

  const columnsWarehouses = useMemo(() => tableColumnsWarehouses(t), [
    t,
  ]);

  useEffect(() => {
    if (values.franchise) {
      form.setFieldsValue({
        ...values,
        ...Object.keys(values.franchise).reduce((p, c) => {
          // eslint-disable-next-line no-param-reassign
          p[`franchise.${c}`] = values.franchise[c];
          return p;
        }, {}),
      });
    }
  }, [values, form]);

  useEffect(() => {
    if (data.franchise) setEditableFranchise(data.franchise);
  }, [data]);

  useEffect(() => {
    if (isSuccessUpdateFranchiseUserFranchise) setIsFormEditable(false);
  }, [isSuccessUpdateFranchiseUserFranchise]);

  const handleCancelClick = () => {
    const newValues = cloneDeep(data);
    form.resetFields();
    resetForm();
    form.setFieldsValue(newValues);
    setValues(newValues);
    setIsFormEditable(false);
    setEditableFranchise(values.franchise);
  };

  return (
    <Form form={form} layout="vertical">
      <AntCard
        footer={(
          <Footer
            handleCancelClick={handleCancelClick}
            isFormEditable={isFormEditable}
            setIsFormEditable={setIsFormEditable}
            permKey={editPermKey}
            isPending={isPendingUpdateFranchiseUserFranchise}
            handleSubmit={handleSubmit}
          />
        )}
        bordered={false}
        title={t('FRANCHISE_INFORMATIONS')}
      >
        <Form form={form}>
          <Row gutter={16}>
            <Col style={{ height: 70, width: '100%' }}>
              <Text>{t('FRANCHISE')}</Text>
              <SelectWrapper
                selectKey="franchise.name"
                placeholder={t('FRANCHISE')}
                title={t('FRANCHISE')}
                value={values.franchise?.name}
                hasError={get(formik.errors, 'name')}
                isTouched={get(formik.touched, 'name')}
                onChangeCallback={franchiseId => handleFieldChange('franchiseId', franchiseId)}
                disabled={isPending || !isFormEditable}
                renderCustomItems={() => allFranchises.map(franchise => (
                  <Option key={franchise._id} value={franchise._id} label={franchise.name}>
                    <div>{franchise.name}</div>
                    {franchise.warehouses.length > 0 && (
                      <small>Warehouses: {arrangeWarehousesString(franchise.warehouses)}</small>
                    )}
                  </Option>
                ))}
              />
            </Col>
            <Col flex={1}>
              <AntTableV2
                data={editableFranchise.owners}
                columns={columnsFranchiseOwners}
                loading={isPending}
              />
            </Col>
            <Col flex={1}>
              <AntTableV2
                data={editableFranchise.warehouses}
                columns={columnsWarehouses}
                loading={isPending}
              />
            </Col>
          </Row>
        </Form>
      </AntCard>
    </Form>
  );
};

BoxFranchiseInformation.defaultProps = BOXES_DEFAULT_PROPS;

BoxFranchiseInformation.propTypes = BOXES_PROP_TYPES;

export default BoxFranchiseInformation;
