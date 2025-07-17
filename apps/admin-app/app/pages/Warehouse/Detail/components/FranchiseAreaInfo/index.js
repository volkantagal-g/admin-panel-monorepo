import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { get, isEqual } from 'lodash';

import { defaultValues, validationSchema } from './formHelper';
import { usePermission } from '@shared/hooks';
import { SelectWrapper } from '@shared/components/UI/Form';
import Card from '@shared/components/UI/AntCard';
import Footer from '../Footer';
import { validate } from '@shared/yup';
import permKey from '@shared/shared/permKey.json';
import { assignFranchiseAreaSelector } from '../../redux/selectors';

const { useForm } = Form;

function FranchiseAreaInfo(props) {
  const {
    franchiseArea,
    franchiseAreas,
    submitRequest,
    getFranchiseAreasRequest,
  } = props;
  const { t } = useTranslation(['warehousePage', 'global']);
  const { canAccess } = usePermission();
  const [form] = useForm();
  const [isFormEditable, setIsFormEditable] = useState(false);
  const hasAccessToEditFranchiseAreaInfo = canAccess(permKey.PAGE_WAREHOUSE_DETAIL_COMPONENT_EDIT_FRANCHISE_AREA_INFO);
  const isAssignFranchiseAreaPending = useSelector(assignFranchiseAreaSelector.getIsPending);

  const canEdit = hasAccessToEditFranchiseAreaInfo;

  const initialProps = { franchiseArea };

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    onSubmit: values => {
      if (isEqual(values, initialProps)) {
        return false;
      }
      submitRequest(values.franchiseArea);

      setIsFormEditable(false);
      return true;
    },
    enableReinitialize: true,
  });

  const { handleSubmit, values, errors, touched, setFieldValue, setValues } = formik;

  useEffect(() => {
    getFranchiseAreasRequest();
  }, [getFranchiseAreasRequest]);

  const handleResetForm = () => {
    if (isEqual(values, initialProps)) {
      return false;
    }

    setValues(initialProps);
    form.setFieldsValue(initialProps);
    return true;
  };

  const handleSelectChange = fieldName => {
    return selectedItems => {
      setFieldValue(fieldName, selectedItems);
    };
  };

  const handleSetIsFormEditable = visibility => {
    setIsFormEditable(visibility);
    return true;
  };

  useEffect(() => {
    form.setFieldsValue({ franchiseArea });
    setValues({ franchiseArea });
  }, [form, setValues, franchiseArea]);

  return (
    <Card title={t('FRANCHISE_AREA_INFO')}>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Row gutter={[16]} align="bottom">
          <Col span={12}>
            <SelectWrapper
              selectKey="franchiseArea"
              label={t('FRANCHISE_AREA')}
              value={values.franchiseArea}
              hasError={get(errors, 'franchiseArea')}
              isTouched={get(touched, 'franchiseArea')}
              optionsData={franchiseAreas}
              optionLabelProp="name"
              optionValueProp="_id"
              onChangeCallback={handleSelectChange('franchiseArea')}
              disabled={!isFormEditable}
            />
          </Col>
        </Row>
        {canEdit && (
        <Row>
          <Col span={24}>
            <Footer
              formButtonVisibilty={isFormEditable}
              setFormButtonVisibilty={handleSetIsFormEditable}
              handleReset={handleResetForm}
              disabled={isAssignFranchiseAreaPending}
            />
          </Col>
        </Row>
        )}
      </Form>
    </Card>
  );
}

FranchiseAreaInfo.propTypes = {
  franchiseArea: PropTypes.string,
  franchiseAreas: PropTypes.arrayOf(PropTypes.shape({})),
  submitRequest: PropTypes.func,
};

FranchiseAreaInfo.defaultProps = {
  franchiseArea: '',
  franchiseAreas: [],
  submitRequest: () => {},
};

export default FranchiseAreaInfo;
