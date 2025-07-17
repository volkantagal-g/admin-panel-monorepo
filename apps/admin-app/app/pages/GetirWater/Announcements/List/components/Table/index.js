import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import AntTable from '@shared/components/UI/AntTableV2';

import { tableColumns } from './config';
import { announcementsSelector } from '../../redux/selectors';

const AnnouncementsListTable = () => {
  const { t } = useTranslation('getirWaterAnnouncementsPage');
  const announcements = useSelector(announcementsSelector.getData);
  const isListPending = useSelector(announcementsSelector.getIsPending);

  return <AntTable data={announcements} columns={tableColumns(t)} loading={isListPending} />;
};

export default AnnouncementsListTable;
