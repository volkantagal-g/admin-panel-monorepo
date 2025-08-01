/* eslint-disable react/no-array-index-key */
import { Card, Spin } from 'antd';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { usePermission } from '@shared/hooks';
import { PERSON_CONTRACT_GROUP_ID as contractGroupId } from '@shared/shared/constants';
import permKey from '@shared/shared/permKey.json';
import { DynamicFormComponent } from '@shared/utils/dynamicFormHelper/components';
import { FormTypes } from '@shared/utils/dynamicFormHelper/components/DynamicForm/constants';
import { Creators } from '../../redux/actions';
import { getSelector } from '../../redux/selector';
import { formName } from '../helpers';
import useStyles from '../styles';
import FormGroupEditBreak from './Break';
import FormGroupEditCompensation from './Compensation';
import FormGroupEditGeneralInfo from './GeneralInfo';
// import FormGroupEditLeave from './Leave';
import FormGroupEditSchdContraint from './SchdConstraint';

const formType = FormTypes.EDIT;
const formReq = { formType, formName };
const formGroups = [
  [contractGroupId.genInfo, FormGroupEditGeneralInfo],
  [contractGroupId.schdConfig, FormGroupEditSchdContraint],
  [contractGroupId.break, FormGroupEditBreak],
  [contractGroupId.compConfig, FormGroupEditCompensation],
  // Leave configuration will be used later!
  // [contractGroupId.leave, FormGroupEditLeave],
];

export default function FormGroupEdit({ id, t }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { canAccess } = usePermission();

  const perms = useMemo(
    () => ({
      [contractGroupId.genInfo]: canAccess(permKey.PAGE_PERSON_CONTRACT_EDIT),
      [contractGroupId.break]: canAccess(permKey.PAGE_PERSON_CONTRACT_EDIT_BREAK),
      [contractGroupId.leave]: canAccess(permKey.PAGE_PERSON_CONTRACT_EDIT_LEAVE),
      [contractGroupId.compConfig]: canAccess(permKey.PAGE_PERSON_CONTRACT_EDIT_COMP_CONFIG),
      [contractGroupId.schdConfig]: canAccess(permKey.PAGE_PERSON_CONTRACT_EDIT_SCHD_CONFIG),
    }),
    [canAccess],
  );

  useEffect(() => {
    dispatch(Creators.getContractFormRequest(formReq));
    dispatch(Creators.getContractRequest({ id }));
  }, [id, dispatch]);

  const isFormPending = useSelector(state => getSelector.getFormIsPending(state));
  const isDetailPending = useSelector(state => getSelector.getDataIsPending(state));

  const isPending = isFormPending || isDetailPending;

  return (
    <Spin spinning={isPending} className={classes.spin}>
      {!isPending && (
        <>
          {formGroups.map(([accessKey, ComponentGroup]) => {
            const uniqueId = `form-person-contract-${id}-${accessKey}`;
            return (
              <Card key={uniqueId} className={classes.card}>
                <ComponentGroup id={id}>
                  {({ isDataPending, formItems, formSubmit, refForm }) => (
                    <Spin spinning={isDataPending}>
                      <DynamicFormComponent
                        t={t}
                        id={uniqueId}
                        ref={refForm}
                        formItems={formItems}
                        formSubmit={formSubmit}
                        isPending={isDataPending}
                        type={perms[accessKey] ? formType : FormTypes.READONLY}
                      />
                    </Spin>
                  )}
                </ComponentGroup>
              </Card>
            );
          })}
        </>
      )}
    </Spin>
  );
}
