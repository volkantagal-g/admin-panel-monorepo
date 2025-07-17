import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Dropdown, Menu, Popconfirm } from 'antd';
import { DownOutlined, CloudDownloadOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import { warehouseProposalsSelector, updateWarehouseProposalsSelector } from '@app/pages/WarehouseProposal/Detail/redux/selectors';
import { WAREHOUSE_PROPOSAL_STATUSES } from '@shared/shared/constants';
import { warehouseProposalsReportSelector } from '@app/pages/WarehouseProposal/List/redux/selectors';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import { Creators } from '../../redux/actions';

const Header = () => {
  const { t } = useTranslation('warehouseProposalPage');
  const { canAccess } = usePermission();
  const dispatch = useDispatch();
  const [isStatusUpdatable, setIsStatusUpdatable] = useState(false);
  const getProposalIsPending = useSelector(warehouseProposalsSelector.getIsPending);
  const updateIsPending = useSelector(updateWarehouseProposalsSelector.getIsPending);
  const warehouseProposalsReportIsPending = useSelector(warehouseProposalsReportSelector.getIsPending);

  useEffect(() => {
    setIsStatusUpdatable(!(updateIsPending || getProposalIsPending || warehouseProposalsReportIsPending));
  }, [updateIsPending, getProposalIsPending, warehouseProposalsReportIsPending]);

  const handleSuitableBtnClick = () => {
    dispatch(Creators.updateWarehouseProposalStatusRequest({ status: WAREHOUSE_PROPOSAL_STATUSES.SUITABLE }));
  };

  const handleNotSuitableBtnClick = () => {
    dispatch(Creators.updateWarehouseProposalStatusRequest({ status: WAREHOUSE_PROPOSAL_STATUSES.NOT_SUITABLE }));
  };

  const menu = (
    <Menu>
      <Menu.Item key="downloadPDF" icon={<CloudDownloadOutlined />} onClick={window.print}>
        {t('global:SAVE_AS_PDF')}
      </Menu.Item>
      {
        canAccess(permKey.PAGE_WAREHOUSE_PROPOSAL_DETAIL_EDIT_STATUS) && (
          <Menu.Item key="suitable" disabled={!isStatusUpdatable}>
            <Popconfirm
              title={t('warehouseProposalPage:CONFIRM.SET_SUITABLE')}
              onConfirm={handleSuitableBtnClick}
              okText={t('global:OK')}
              cancelText={t('global:NO')}
            >
              { t('warehouseProposalPage:SUITABLE') }
            </Popconfirm>
          </Menu.Item>
        )
      }
      {
        canAccess(permKey.PAGE_WAREHOUSE_PROPOSAL_DETAIL_EDIT_STATUS) && (
          <Menu.Item key="notSuitable" disabled={!isStatusUpdatable}>
            <Popconfirm
              title={t('warehouseProposalPage:CONFIRM.SET_NOT_SUITABLE')}
              onConfirm={handleNotSuitableBtnClick}
              okText={t('global:OK')}
              cancelText={t('global:NO')}
            >
              { t('warehouseProposalPage:NOT_SUITABLE') }
            </Popconfirm>
          </Menu.Item>
        )
      }
    </Menu>
  );

  return (
    <Dropdown overlay={menu}>
      <Button>
        { t('warehouseProposalPage:ACTIONS') } <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default Header;
