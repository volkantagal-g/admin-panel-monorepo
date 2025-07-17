import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';

import { Creators } from '../../redux/actions';
import {
  getPageByIdSelector,
  getPageRolesSelector,
  getPanelDocsByFiltersSelector,
} from '../../redux/selectors';

export const RoleListButton = ({ isInitLoadData = false }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('pagePage');
  const translationPrefix = 'COMPONENTS.PAGE_DETAIL';
  const isPending = useSelector(getPageRolesSelector.getIsPending);
  const { permKey } = useSelector(getPageByIdSelector.getData) || {};
  const handleRoleListClick = () => {
    dispatch(Creators.getPageRolesRequest({ permKey }));
  };

  useEffect(() => {
    if (isInitLoadData) {
      dispatch(Creators.getPageRolesRequest({ permKey }));
    }
  }, [dispatch, permKey, isInitLoadData]);

  return isInitLoadData ? <div /> : (
    <Button loading={isPending} type="primary" onClick={handleRoleListClick}>
      {t(`${translationPrefix}.BRING_ROLE_LIST`)}
    </Button>
  );
};

export const PanelDocListButton = ({ pageId, isInitLoadData = false }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('pagePage');
  const translationPrefix = 'COMPONENTS.PAGE_DETAIL';
  const isPending = useSelector(getPanelDocsByFiltersSelector.getIsPending);

  const handlePanelDocListClick = () => {
    dispatch(Creators.getPanelDocsByFiltersRequest({ pageId, users: true }));
  };

  useEffect(() => {
    if (isInitLoadData) {
      dispatch(Creators.getPanelDocsByFiltersRequest({ pageId, users: true }));
    }
  }, [dispatch, pageId, isInitLoadData]);

  return isInitLoadData ? <div /> : (
    <Button loading={isPending} type="primary" onClick={handlePanelDocListClick}>
      {t(`${translationPrefix}.BRING_PANEL_DOC_LIST`)}
    </Button>
  );
};
