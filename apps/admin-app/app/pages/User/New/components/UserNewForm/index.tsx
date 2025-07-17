import { Card } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { ROUTE } from '@app/routes';
import UserForm from '../../../components/UserForm';
import { USER_FORM_MODE } from '../../../constants';
import { Creators } from '../../redux/actions';
import { createUserSelector } from '../../redux/selectors';
import { initialValues } from './formHelpers';

const UserDetailForm = () => {
  const { t } = useTranslation('userPage');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isCreatePending = useSelector(createUserSelector.getIsPending);

  return (
    <Card bordered={false} title={t('USER_INFO')}>
      <UserForm
        initialValues={initialValues}
        mode={USER_FORM_MODE.NEW}
        isActionLoading={isCreatePending}
        canAccessActions
        onSuccess={values => {
          dispatch(Creators.createUserRequest({
            body: values,
            afterSuccess: (userId: MongoIDType) => {
              navigate(ROUTE.USER_DETAIL.path.replace(':id', userId));
            },
          }));
        }}
      />
    </Card>
  );
};

export default UserDetailForm;
