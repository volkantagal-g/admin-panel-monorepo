import { Card } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { ROUTE } from '@app/routes';
import RoleForm from '../../../components/RoleForm';
import { ROLE_FORM_MODE } from '../../../constants';
import { Creators } from '../../redux/actions';
import { createRoleSelector } from '../../redux/selectors';
import { initialValues } from './formHelpers';

const RoleNewForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isCreatePending = useSelector(createRoleSelector.getIsPending);

  return (
    <Card bordered={false}>
      <RoleForm
        initialValues={initialValues}
        mode={ROLE_FORM_MODE.NEW}
        isActionLoading={isCreatePending}
        canAccessActions
        onSuccess={values => {
          dispatch(Creators.createRoleRequest({
            body: values,
            afterSuccess: (roleId: MongoIDType) => {
              navigate(ROUTE.ROLE_DETAIL.path.replace(':id', roleId));
            },
          }));
        }}
      />
    </Card>
  );
};

export default RoleNewForm;
