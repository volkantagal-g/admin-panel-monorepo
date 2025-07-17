import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { Form } from 'antd';

import { Creators } from '../../redux/actions';
import { getAlertConditionDetailSelector } from '../../redux/selectors';

import BATCard from '@app/pages/BusinessAlertingTool/components/BATCard';
import ACNotifications from '../../../components/ACNotifications';
import UpdateFormFooter from '../UpdateFormFooter';
import { formatNotificationPreferencesAfterSubmit } from '../../../utils';
import useUserEditPermission from '@app/pages/BusinessAlertingTool/hooks';

function UpdateNotificationsForm() {
  const { t } = useTranslation(['batAlertConditionCommon']);
  const dispatch = useDispatch();
  const { _id, notificationPreferences, createdBy, permittedRoles } = useSelector(getAlertConditionDetailSelector.getData);

  const { canUserEdit } = useUserEditPermission({
    createdBy: createdBy?.id,
    permittedRoles,
  });

  const [isFormEditable, setIsFormEditable] = useState(false);

  const [form] = Form.useForm();

  const formik = useFormik({
    initialValues: { notificationPreferences },
    enableReinitialize: true,
    onSubmit: values => {
      dispatch(Creators.updateAlertConditionNotificationPreferencesRequest({
        conditionId: _id,
        notificationPreferences: { ...formatNotificationPreferencesAfterSubmit(values) },
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
      <BATCard headerTitle={t('batAlertConditionCommon:CARD_HEADERS.NOTIFICATIONS')}>
        <ACNotifications formik={formik} isFormEditable={isFormEditable && canUserEdit} antdForm={form} />
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
    setFieldValue('notificationPreferences', notificationPreferences);
  }
}

export default UpdateNotificationsForm;
