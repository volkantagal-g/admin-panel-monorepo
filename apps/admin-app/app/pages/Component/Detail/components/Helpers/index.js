import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';

import { Creators } from '../../redux/actions';
import {
  getComponentByIdSelector,
  getComponentRolesSelector,
} from '../../redux/selectors';

export const RoleListButton = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('componentPage');
  const isPending = useSelector(getComponentRolesSelector.getIsPending);
  const { permKey } = useSelector(getComponentByIdSelector.getData) || {};
  const handleRoleListClick = () => {
    dispatch(Creators.getComponentRolesRequest({ permKey }));
  };

  return (
    <Button loading={isPending} type="primary" onClick={handleRoleListClick}>
      {t('COMPONENTS.BRING_ROLE_LIST')}
    </Button>
  );
};
