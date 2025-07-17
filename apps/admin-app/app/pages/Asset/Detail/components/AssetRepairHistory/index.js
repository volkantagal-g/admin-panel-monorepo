import { useState } from 'react';
import { Button, Collapse, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { useParams } from 'react-router-dom';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { tableColumns } from './config';
import { Creators } from '../../redux/actions';
import { AssetDetailSelector, AssetRepairHistorySelector } from '../../redux/selectors';
import AssetRepairHistoryModal from '../AssetRepairHistoryModal';
import useStyles from './styles';
import { ASSET_REPAIR_HISTORY_ENABLED_DEVICES } from '@app/pages/Asset/constants';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';

const { Panel } = Collapse;
const AssetRepairHistory = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { t } = useTranslation(['assetPage', 'global']);
  const [showModal, setShowModal] = useState(false);
  const { assetId } = useParams();
  const { canAccess } = usePermission();

  const assetDetailData = useSelector(AssetDetailSelector.getAssetDetailData);
  const assetDetailIsPending = useSelector(AssetDetailSelector.getAssetDetailIsPending);
  const assetRepairHistoryData = useSelector(AssetRepairHistorySelector.getData);
  const assetRepairHistoryIsPending = useSelector(AssetRepairHistorySelector.getIsPending);

  const handleGetAssetRepairHistory = () => {
    if (!assetRepairHistoryData?.length) {
      dispatch(Creators.getAssetRepairHistoryRequest({ assetId }));
    }
  };

  const showAssetRepairHistoryModal = e => {
    e.stopPropagation();
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const collapsePanelHeader = (
    <Row className={classes.collapsePanelHeaderRow} align="middle" justify="space-between">
      <span>{t('assetPage:REPAIR_HISTORY')}</span>
      {
        canAccess(permKey.PAGE_EMPLOYEE_ASSET_DETAIL_COMPONENT_EDIT_GENERAL_INFO) &&
        <Button type="primary" onClick={showAssetRepairHistoryModal}>{t('assetPage:ADD_REPAIR_RECORD')}</Button>
      }
    </Row>
  );

  return (
    !assetDetailIsPending && ASSET_REPAIR_HISTORY_ENABLED_DEVICES.has(assetDetailData.deviceType) && (
    <Collapse className={classes.collapsePanel} onChange={handleGetAssetRepairHistory}>
      <Panel header={collapsePanelHeader}>
        <AntTableV2
          data={assetRepairHistoryData}
          columns={tableColumns({ t, canAccess })}
          loading={assetRepairHistoryIsPending}
          scroll={{ y: 240 }}
        />
      </Panel>
      { showModal && <AssetRepairHistoryModal assetId={assetId} handleClose={handleClose} /> }
    </Collapse>
    )
  );
};

export default AssetRepairHistory;
