import { PageHeader as AntPageHeader, Skeleton } from 'antd';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import useStyles from '@app/pages/Banner/Detail/components/PageHeader/styles';

const PageHeader = ({ bannerDetail, isBannerDetailPending }) => {
  const classes = useStyles();
  const { t } = useTranslation('marketing');

  return (
    <Skeleton loading={isBannerDetailPending} active className="px-5 py-2 bg-white" paragraph={{ rows: 1 }}>
      <div>
        <AntPageHeader
          ghost={false}
          className={classes.header}
          title={t('BANNER_DETAIL')}
          subTitle={bannerDetail?.id}
        />
      </div>
    </Skeleton>
  );
};

export default memo(PageHeader);
