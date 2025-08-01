import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Button, Tag } from 'antd';

import { usePermission } from '@shared/hooks';
import { ASSET_STATUSES, ASSET_STATUSES_TAG_COLORS, ASSIGNABLE_STATUS } from '../../../constants';
import { assetSelector } from '../../redux/selectors';
import { AssignAssetModal, UnassignAssetModal } from '../index';
import { ROUTE } from '@app/routes.ts';
import permKey from '@shared/shared/permKey.json';

import useModuleStyles from '@app/pages/Employee/AssetManagement/style';
import RedirectButtonV2 from '@shared/components/UI/RedirectButtonV2';

const AssetManagementDetailPage = () => {
  const { t } = useTranslation(['assetManagement']);
  const moduleClasses = useModuleStyles();
  const asset = useSelector(assetSelector.getData);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState<boolean>(false);
  const [isUnassignModalOpen, setIsUnassignModalOpen] = useState<boolean>(false);
  const { canAccess } = usePermission();

  return (
    <>
      <header className={moduleClasses.pageHeader}>
        <Link to={ROUTE.ASSET_MANAGEMENT_LIST.path} className="mr-2">
          <ArrowLeftOutlined />
        </Link>
        <h4>{t('assetManagement:COMPANY_CAR_DETAILS')}</h4>
        {
          asset?.status && (
            <>
              <Tag className={moduleClasses.assignmentStatusTag} color={ASSET_STATUSES_TAG_COLORS[asset.status]}>
                {asset?.status === ASSET_STATUSES.ASSIGNED ? t('assetManagement:ASSIGNED') : t('assetManagement:UNASSIGNED')}
              </Tag>
              <Tag className={moduleClasses.assignmentStatusTag}>
                {asset?.uniqueIdentifier}
              </Tag>
            </>
          )
        }
        {
          canAccess(permKey.PAGE_ASSET_MANAGEMENT_DETAIL_COMPONENT_ASSIGN_ASSET) && (
            <div className="d-flex flex-grow-1 justify-content-end">
              <Button
                disabled={!asset || asset?.status !== ASSET_STATUSES.ASSIGNED}
                type="primary"
                className={`${moduleClasses.buttonContainer} mr-2`}
                onClick={() => setIsUnassignModalOpen(true)}
              >
                {t('assetManagement:UNASSIGN_ASSET')}
              </Button>
              <Button
                disabled={!asset || asset?.status === ASSET_STATUSES.ASSIGNED || asset?.assignableStatus !== ASSIGNABLE_STATUS.ASSIGNABLE}
                type="primary"
                className={`${moduleClasses.buttonContainer} mr-2`}
                onClick={() => setIsAssignModalOpen(true)}
              >
                {t('assetManagement:ASSIGN_ASSET')}
              </Button>
            </div>
          )
        }
        {
          canAccess(permKey.PAGE_ASSET_MANAGEMENT_LOGS) && (
            <RedirectButtonV2
              text={t('assetManagement:ASSETS_LOG')}
              to={`${ROUTE.ASSET_MANAGEMENT_LOGS.path}?assetId=${asset?._id}`}
              className={moduleClasses.buttonContainer}
              type="primary"
              size="middle"
              permKey={permKey.PAGE_ASSET_MANAGEMENT_LOGS}
            />
          )
        }
      </header>
      <AssignAssetModal
        open={isAssignModalOpen}
        onClose={(shouldReload: boolean): void => {
          if (shouldReload) {
            window.location.reload();
          }
          else {
            setIsAssignModalOpen(false);
          }
        }}
        shouldAskAssignmentPeriodType={asset?.fieldValues.vehicleIsCommonCar}
        shouldAskTimePickerForAssignmentStartDate
      />
      <UnassignAssetModal
        open={isUnassignModalOpen}
        onClose={(shouldReload: boolean): void => {
          if (shouldReload) {
            window.location.reload();
          }
          else {
            setIsUnassignModalOpen(false);
          }
        }}
      />
    </>
  );
};

export default AssetManagementDetailPage;
