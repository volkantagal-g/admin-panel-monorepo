import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';
import { useParams } from 'react-router-dom';

import { Creators } from '../../redux/actions';
import { getRolePermissionsSelector } from '@shared/redux/selectors/common';

export const PageListButton = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('rolePage');
  const isPending = useSelector(getRolePermissionsSelector.getIsPending);
  const { id: roleId } = useParams();

  const handleBringPermissionsClick = () => {
    dispatch(Creators.getPageAndComponentPermissionsOfRoleRequest({ roleId }));
  };

  return (
    <Button loading={isPending} type="primary" onClick={handleBringPermissionsClick}>
      {t('rolePage:BRING_PAGES')}
    </Button>
  );
};
