import { Tag, PageHeader as AntPageHeader, Skeleton } from 'antd';
import { get } from 'lodash';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import useStyles from '@app/pages/Announcement/Detail/components/PageHeader/styles';

import { getLangKey } from '@shared/i18n';
import { getPageHeaderTagColor } from '@app/pages/Announcement/utils';
import { processStatus } from '@app/pages/Announcement/constantValues';

const PageHeader = ({ announcementDetail, isAnnouncementDetailPending }) => {
  const classes = useStyles();
  const { t } = useTranslation('marketing');

  return (
    <Skeleton loading={isAnnouncementDetailPending} active className="px-5 py-2 bg-white" paragraph={{ rows: 1 }}>
      <div>
        <AntPageHeader
          ghost={false}
          className={classes.header}
          title={t('ANNOUNCEMENT_DETAIL')}
          tags={(
            <Tag
              color={getPageHeaderTagColor(announcementDetail?.processStatus)}
            >
              {get(processStatus[announcementDetail?.processStatus], getLangKey(), '')}
            </Tag>
          )}
          subTitle={announcementDetail?.id}
        />
      </div>
    </Skeleton>
  );
};

export default memo(PageHeader);
