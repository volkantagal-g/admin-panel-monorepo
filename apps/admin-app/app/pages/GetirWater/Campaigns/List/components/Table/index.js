import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { usePermission } from '@shared/hooks';
import AntTableV2 from '@shared/components/UI/AntTableV2';

import { campaignsSelector } from '../../redux/selectors';

import { tableColumns } from './config';

const CampaignsListTable = () => {
  const { t } = useTranslation('getirWaterCampaignsPage');
  const campaigns = useSelector(campaignsSelector.getData);
  const isListPending = useSelector(campaignsSelector.getIsPending);
  const { Can } = usePermission();

  return <AntTableV2 data={campaigns} columns={tableColumns(Can, t)} loading={isListPending} />;
};

export default CampaignsListTable;
