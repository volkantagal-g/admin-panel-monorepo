import { Card, Spin } from 'antd';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import { DynamicFormComponent } from '@shared/utils/dynamicFormHelper/components';
import { FormTypes } from '@shared/utils/dynamicFormHelper/components/DynamicForm/constants';
import { Creators } from '../../redux/actions';
import { getSelector } from '../../redux/selector';
import { convertUnderscoreToDot, formName, useFormItems } from '../helpers';
import useStyles from '../styles';

const formType = FormTypes.CREATE;
const formReq = { formType, formName };

export default function DynamicFormNew({ t }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { canAccess } = usePermission();
  const canSave = canAccess(permKey.PAGE_PERSON_CONTRACT_CREATE);

  const data = useSelector(state => getSelector.getForm(state));
  const isFormPending = useSelector(state => getSelector.getFormIsPending(state));
  const isDataPending = useSelector(state => getSelector.getDataIsPending(state));
  const isDataSaved = useSelector(state => getSelector.getDataSavedSuccessfully(state));

  useEffect(() => {
    dispatch(Creators.getContractFormRequest(formReq));
  }, [dispatch]);

  useEffect(() => {
    if (isDataSaved) {
      navigate('/person/contract');
    }
  }, [isDataSaved, navigate]);

  const formItems = useFormItems(data);

  const formSubmit = useCallback(
    values => {
      dispatch(
        Creators.saveContractRequest({
          formType,
          formName,
          data: convertUnderscoreToDot(values),
        }),
      );
    },
    [dispatch],
  );

  const isPending = isDataPending || isFormPending;

  return (
    <Spin spinning={isPending} className={classes.spin}>
      <Card className={classes.card}>
        <DynamicFormComponent
          t={t}
          isPending={isPending}
          formItems={formItems}
          formSubmit={formSubmit}
          id="form-person-contract"
          type={canSave ? formType : FormTypes.READONLY}
        />
      </Card>
    </Spin>
  );
}
