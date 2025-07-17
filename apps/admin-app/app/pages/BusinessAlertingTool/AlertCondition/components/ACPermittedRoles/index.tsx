import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Col, Form, Row, Select } from 'antd';
import { isEmpty } from 'lodash';

import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { getUserRolesSelector } from '@shared/redux/selectors/common';
import { getUser } from '@shared/redux/selectors/auth';

import { getMetricGroupSelector } from '../ACMetricGroup/redux/selectors';

function ACPermittedRoles({
  formik,
  isFormEditable = true,
}: {
  formik: any,
  isFormEditable: boolean | undefined,
}) {
  const dispatch = useDispatch();
  const { t } = useTranslation(['batAlertConditionCommon', 'error']);

  const metricGroup = useSelector(getMetricGroupSelector.getData);
  const isMetricGroupPending = useSelector(getMetricGroupSelector.getIsPending);
  const userId = getUser()?._id;

  useEffect(() => {
    if (userId) {
      dispatch(CommonCreators.getUserRolesRequest({ userId }));
    }
  }, [dispatch, userId]);

  const userRoles = useSelector(getUserRolesSelector.getData);
  const isUserRolesPending = useSelector(getUserRolesSelector.getIsPending);

  const { setFieldValue } = formik;

  const userRolesOptions = useMemo(
    () => getUserRolesOptions(userRoles, metricGroup),
    [userRoles, metricGroup],
  );

  return (
    <Row>
      <Col xs={24} md={12}>
        <Form.Item
          name={['permittedRoles']}
          rules={[{ required: true, message: t('error:REQUIRED') }]}
        >
          <Select
            options={userRolesOptions}
            mode="multiple"
            disabled={(isUserRolesPending || !isFormEditable) || (isEmpty(metricGroup) || isMetricGroupPending)}
            onChange={(selectedRoles: string[]) => setFieldValue('permittedRoles', selectedRoles)}
            placeholder={t('ROLES')}
          />
        </Form.Item>
      </Col>
    </Row>
  );

  function getUserRolesOptions(roles: UserRole[], selectedMetricGroup: any) {
    return roles
      .filter((role: UserRole) => {
        return (selectedMetricGroup?.permittedRoles || []).some((permittedRole: PermittedRole) => permittedRole._id === role._id);
      })
      .map((role: UserRole) => ({
        label: role.name,
        value: role._id,
      }));
  }
}

export default ACPermittedRoles;
