import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { Col, Form } from 'antd';

import { Creators } from '../../redux/actions';
import { getAlertConditionDetailSelector } from '../../redux/selectors';

import BATCard from '@app/pages/BusinessAlertingTool/components/BATCard';
import useUserEditPermission from '@app/pages/BusinessAlertingTool/hooks';
import ACDefineValue from '../../../components/ACDefineValue';
import UpdateFormFooter from '../UpdateFormFooter';
import ACConditionThreshold from '../../../components/ACConditionThreshold';

import useStyles from './styles';
import { formatConditionsAfterSubmit, formatRunningConfigAfterSubmit } from '../../../utils';

function UpdateDefineValueForm() {
  const { t } = useTranslation(['batAlertConditionCommon']);
  const dispatch = useDispatch();
  const classes = useStyles();
  const { _id, queryInfo, conditions, createdBy, permittedRoles } = useSelector(getAlertConditionDetailSelector.getData);

  const { canUserEdit } = useUserEditPermission({
    createdBy: createdBy?.id,
    permittedRoles,
  });

  const [isFormEditable, setIsFormEditable] = useState(false);

  const [form] = Form.useForm();

  const formik = useFormik({
    initialValues: { _id, queryInfo, conditions },
    enableReinitialize: true,
    onSubmit: values => {
      dispatch(Creators.updateAlertConditionQueryRequest({
        conditionId: _id,
        queryInfo: {
          ...values.queryInfo,
          runningConfig: { ...formatRunningConfigAfterSubmit(values) },
        },
        conditions: { ...formatConditionsAfterSubmit(values) },
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
      <BATCard headerTitle={t('batAlertConditionCommon:CARD_HEADERS.UPDATE_YOUR_QUERY')}>
        <ACDefineValue formik={formik} isFormEditable={isFormEditable && canUserEdit} />
        <Col xs={24}>
          <div className={classes.line} />
        </Col>
        <ACConditionThreshold
          formik={formik}
          isFormEditable={isFormEditable && canUserEdit}
          form={form}
          isFormatInfoIconVisible={false}
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
    setFieldValue('queryInfo', queryInfo);
    form.setFieldsValue({ queryInfo: { raw: { compareWithPastPeriod: undefined } } });
    setFieldValue('conditions', conditions);
  }
}

export default UpdateDefineValueForm;
