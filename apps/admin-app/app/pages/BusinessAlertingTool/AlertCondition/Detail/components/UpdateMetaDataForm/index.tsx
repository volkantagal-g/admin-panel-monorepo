import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Form } from 'antd';

import { Creators } from '../../redux/actions';
import { getAlertConditionDetailSelector } from '../../redux/selectors';

import BATCard from '@app/pages/BusinessAlertingTool/components/BATCard';
import ACMetaData from '../../../components/ACMetaData';
import UpdateFormFooter from '../UpdateFormFooter';
import useUserEditPermission from '@app/pages/BusinessAlertingTool/hooks';

function UpdateMetaDataForm() {
  const dispatch = useDispatch();
  const { _id, name, description, createdBy, permittedRoles } = useSelector(getAlertConditionDetailSelector.getData);

  const { canUserEdit } = useUserEditPermission({
    createdBy: createdBy?.id,
    permittedRoles,
  });

  const [isFormEditable, setIsFormEditable] = useState(false);

  const [form] = Form.useForm();

  const formik = useFormik({
    initialValues: { name, description },
    enableReinitialize: true,
    onSubmit: values => {
      dispatch(Creators.updateAlertConditionMetadataRequest({
        conditionId: _id,
        name: values.name,
        description: values.description,
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
      <BATCard>
        <ACMetaData formik={formik} isFormEditable={isFormEditable && canUserEdit} />
        <UpdateFormFooter
          canUserEdit={canUserEdit}
          isFormEditable={isFormEditable}
          setIsFormEditable={setIsFormEditable}
          handleCancelButtonOnClick={handleCancelButtonOnClick}
        />
      </BATCard>
    </Form>
  );

  function handleCancelButtonOnClick() {
    setIsFormEditable(false);
    setFieldValue('name', name);
    setFieldValue('description', description);
  }
}

export default UpdateMetaDataForm;
