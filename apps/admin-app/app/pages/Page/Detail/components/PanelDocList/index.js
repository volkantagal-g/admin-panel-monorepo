import { memo, useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import AntCard from '@shared/components/UI/AntCard';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import permKey from '@shared/shared/permKey.json';
import { getUser } from '@shared/redux/selectors/auth';
import AnalyticsService from '@shared/services/analytics';
import { PANEL_EVENTS } from '@shared/shared/analyticsConstants';
import { PanelDocListButton } from '../Helpers';
import {
  getPageByIdSelector,
  getPanelDocsByFiltersSelector,
  panelDocUpdateActivenessSelector,
  removePanelDocSelector,
} from '../../redux/selectors';
import AddNewPanelDocModal from './AddNewPanelDocModal';
import { usePermission } from '@shared/hooks';
import { getTableColumns } from './config';
import useStyles from './styles';
import TableEmpty from '@shared/shared/components/TableEmpty';

const PanelDocList = ({ onRemovePanelDocItem, onActivenessChange }) => {
  const { t } = useTranslation(['pagePage', 'global', 'button']);
  const { id: pageId } = useParams();
  const { canAccess } = usePermission();
  const classes = useStyles();
  const page = useSelector(getPageByIdSelector.getData);
  const documentations = useSelector(getPanelDocsByFiltersSelector.getData);
  const isDocumentationsPending = useSelector(getPanelDocsByFiltersSelector.getIsPending);
  const isDocumentationsRequested = useSelector(getPanelDocsByFiltersSelector.getIsRequested);
  const isPendingUpdateActiveness = useSelector(panelDocUpdateActivenessSelector.getIsPending);
  const isRemoveDocPending = useSelector(removePanelDocSelector.getIsPending);

  const hasAccessToUserPanelDocDetail = canAccess(permKey.PAGE_PANEL_DOC_DETAIL);

  const user = getUser()._id;
  // only owners can create + remove
  const hasAccessToPanelDocCreate = (page?.pageOwners || []).map(o => o._id).includes(user);
  const hasAccessToUserPanelDocRemove = hasAccessToPanelDocCreate;

  const handleRemovePanelDocItem = useCallback(({ panelDocId }) => {
    onRemovePanelDocItem({ panelDocId });
    AnalyticsService.track(PANEL_EVENTS.PAGE_DETAIL.EVENT_NAME, { button: PANEL_EVENTS.PAGE_DETAIL.BUTTON.DOC_INFO_REMOVE });
  }, [onRemovePanelDocItem]);

  const handleActivenessChange = useCallback(({ checked, panelDocId }) => {
    onActivenessChange({ checked, panelDocId });
    AnalyticsService.track(PANEL_EVENTS.PAGE_DETAIL.EVENT_NAME, { button: PANEL_EVENTS.PAGE_DETAIL.BUTTON.DOC_INFO_ACTIVE_INACTIVE, checked });
  }, [onActivenessChange]);

  const tableColumns = useMemo(() => {
    return getTableColumns({
      t,
      handleRemovePanelDocItem,
      hasAccessToUserPanelDocDetail,
      hasAccessToUserPanelDocRemove,
      classes,
      handleActivenessChange,
      isPendingUpdateActiveness,
      isRemoveDocPending,
    });
  }, [
    t,
    hasAccessToUserPanelDocDetail,
    handleRemovePanelDocItem,
    hasAccessToUserPanelDocRemove,
    classes,
    handleActivenessChange,
    isPendingUpdateActiveness,
    isRemoveDocPending,
  ]);

  const getTableHeaderActionButtons = () => {
    return (
      <>
        {hasAccessToPanelDocCreate && <AddNewPanelDocModal pageId={pageId} t={t} />}
        &nbsp;
        <PanelDocListButton pageId={pageId} />
      </>
    );
  };

  const locale = {
    emptyText: (
      <TableEmpty caption={t('COMPONENTS.PAGE_DETAIL.CLICK_TO_LOAD_DOCUMENTATION')}>
        <PanelDocListButton pageId={pageId} isInitLoadData />
      </TableEmpty>
    ),
  };

  return (
    <AntCard
      bordered={false}
      title={t('COMPONENTS.PAGE_DETAIL.DOCUMENTATION_INFO')}
      extra={getTableHeaderActionButtons()}
    >
      <AntTableV2
        bordered
        locale={isDocumentationsRequested ? null : locale}
        data={documentations}
        columns={tableColumns}
        optionValueProp="_id"
        loading={isDocumentationsPending}
        className={classes.table}
        scroll={{ y: 500 }}
      />
    </AntCard>
  );
};

export default memo(PanelDocList);
