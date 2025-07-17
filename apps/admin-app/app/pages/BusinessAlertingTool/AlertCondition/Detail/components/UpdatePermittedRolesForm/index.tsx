import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { Form } from 'antd';

import { Creators } from '../../redux/actions';
import { getAlertConditionDetailSelector } from '../../redux/selectors';

import BATCard from '@app/pages/BusinessAlertingTool/components/BATCard';
import ACPermittedRoles from '../../../components/ACPermittedRoles';
import UpdateFormFooter from '../UpdateFormFooter';
import useUserEditPermission from '@app/pages/BusinessAlertingTool/hooks';

function UpdatePermittedRolesForm() {
  const { t } = useTranslation(['batAlertConditionCommon']);
  const dispatch = useDispatch();
  const { _id, permittedRoles, createdBy } = useSelector(getAlertConditionDetailSelector.getData);

  const { canUserEdit } = useUserEditPermission({
    createdBy: createdBy?.id,
    permittedRoles,
  });

  const [isFormEditable, setIsFormEditable] = useState(false);

  const [form] = Form.useForm();

  const formik = useFormik({
    initialValues: { permittedRoles: defaultPermittedRoles() },
    enableReinitialize: true,
    onSubmit: values => {
      dispatch(Creators.updateAlertConditionPermittedRolesRequest({
        conditionId: _id,
        permittedRoles: values.permittedRoles,
      }));

      setIsFormEditable(false);
    },
  });

  const { handleSubmit, values, setFieldValue } = formik;

  useEffect(() => {
    form.setFieldsValue(values);
  }, [form, values]);

  return (
    <Form form={form} onFinish={handleSubmit}>
      <BATCard headerTitle={t('batAlertConditionCommon:CARD_HEADERS.PERMITTED_ROLES')}>
        <ACPermittedRoles
          formik={formik}
          isFormEditable={isFormEditable && canUserEdit}
        />
        <UpdateFormFooter
          canUserEdit={canUserEdit}
          isFormEditable={isFormEditable}
          setIsFormEditable={setIsFormEditable}
          handleCancelButtonOnClick={handleCancelButtonOnClick}
        />
      </BATCard>
    </Form>
  );

  function defaultPermittedRoles() {
    return permittedRoles?.map((permittedRole: PermittedRole) => ({
      value: permittedRole._id,
      label: permittedRole.name,
    }));
  }

  function handleCancelButtonOnClick() {
    setIsFormEditable(false);
    setFieldValue('permittedRoles', defaultPermittedRoles());
  }
}

export default UpdatePermittedRolesForm;
