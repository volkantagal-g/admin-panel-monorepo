import { useEffect, useState } from 'react';
import { PageHeader, Switch } from 'antd';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { announcementDetailSelector } from '../../redux/selectors';
import { Creators } from '../../redux/actions';

const announcementStatusEnum = {
  ACTIVE: 1,
  INACTIVE: 2,
};

const AnnouncementNewHeader = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [announcementStatus, setAnnouncementStatus] = useState(false);
  const { t } = useTranslation();
  const data = useSelector(announcementDetailSelector.getData);

  useEffect(() => {
    if (Object.keys(data).length) {
      setAnnouncementStatus(data.status === 1);
    }
  }, [data]);

  const handleAnnouncementStatusChange = value => {
    setAnnouncementStatus(value);
    const changedData = { status: value ? announcementStatusEnum.ACTIVE : announcementStatusEnum.INACTIVE };

    dispatch(Creators.updateAnnouncementRequest({ data: changedData, announcementId: id }));
  };

  return (
    <PageHeader
      className="p-0 page-title"
      title={t('global:PAGE_TITLE.WATER.ANNOUNCEMENTS.DETAIL')}
      extra={[
        <Switch
          key="0"
          checkedChildren={t('global:ACTIVE')}
          unCheckedChildren={t('global:INACTIVE')}
          checked={announcementStatus}
          onChange={handleAnnouncementStatusChange}
          className={announcementStatus ? 'bg-success' : 'bg-danger'}
        />,
      ]}
    />
  );
};

export default AnnouncementNewHeader;
