import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { Form } from 'antd';

import { Creators } from '../../redux/actions';
import { getAlertConditionDetailSelector } from '../../redux/selectors';

import BATCard from '@app/pages/BusinessAlertingTool/components/BATCard';
import useUserEditPermission from '@app/pages/BusinessAlertingTool/hooks';
import ACRunningDays from '../../../components/ACRunningDays';
import UpdateFormFooter from '../UpdateFormFooter';
import { convertObjectToRunningHours, convertRunningHoursToObject } from '../../../utils';

function UpdateRunningHoursForm() {
  const { t } = useTranslation(['batAlertConditionCommon']);
  const dispatch = useDispatch();
  const { _id, queryInfo, createdBy, permittedRoles } = useSelector(getAlertConditionDetailSelector.getData);
  const rawAlertConditionDetail = useSelector(getAlertConditionDetailSelector.getRawData);

  const { canUserEdit } = useUserEditPermission({
    createdBy: createdBy?.id,
    permittedRoles,
  });

  const [isFormEditable, setIsFormEditable] = useState(false);

  const [form] = Form.useForm();

  const formik = useFormik({
    initialValues: { queryInfo },
    enableReinitialize: true,
    onSubmit: values => {
      dispatch(Creators.updateAlertConditionQueryRequest({
        conditionId: _id,
        queryInfo: {
          ...rawAlertConditionDetail?.queryInfo,
          runningConfig: {
            ...rawAlertConditionDetail?.queryInfo?.runningConfig,
            runningHours: convertObjectToRunningHours(values.queryInfo.runningConfig.runningHours),
          },
        },
        conditions: rawAlertConditionDetail?.conditions,
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
      <BATCard headerTitle={t('batAlertConditionCommon:CARD_HEADERS.RUNNING_DAY')}>
        <ACRunningDays
          formik={formik}
          isFormEditable={isFormEditable && canUserEdit}
          isDetailPage
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

  function handleCancelButtonOnClick() {
    setIsFormEditable(false);
    setFieldValue(
      ['queryInfo', 'runningConfig', 'runningHours'],
      convertRunningHoursToObject(rawAlertConditionDetail.queryInfo.runningConfig.runningHours),
    );
  }
}

export default UpdateRunningHoursForm;
