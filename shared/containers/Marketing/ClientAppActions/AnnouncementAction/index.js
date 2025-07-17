import { rules } from '@shared/containers/Marketing/ClientAppActions/helpers';
import AnnouncementSelect from '@shared/containers/Marketing/Select/AnnouncementSelect';

export const AnnouncementAction = ({ fieldName, disabled, form }) => {
  const announcementId = form.getFieldValue(fieldName);
  return (
    <AnnouncementSelect fieldName={fieldName} rules={rules.announcements} disabled={disabled} announcementId={announcementId} />
  );
};

export default AnnouncementAction;
