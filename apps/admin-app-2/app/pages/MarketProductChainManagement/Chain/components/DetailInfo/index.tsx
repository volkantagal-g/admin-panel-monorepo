import React from 'react';
import { useTranslation } from 'react-i18next';
import { Skeleton } from 'antd';
import { ShoppingOutlined, StarOutlined, AppstoreOutlined, EnvironmentOutlined, ClockCircleOutlined } from '@ant-design/icons';

import useStyles from './styles';

interface DetailInfoProps {
  data: {
    product?: string;
    supplier?: string;
    location?: string;
    domain?: string;
    createdAt?: string;
    updatedAt?: string;
  } | null;
}

const DetailInfo: React.FC<DetailInfoProps> = ({ data }) => {
  const { t } = useTranslation('marketProductChainManagement');
  const classes = useStyles();

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);

    // Format as day/month/year with time
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  const infoItems = [
    {
      key: 'product',
      label: t('PRODUCT'),
      value: data?.product,
      icon: <ShoppingOutlined className={classes.icon} />,
      background: 'rgba(103, 80, 164, 0.08)',
    },
    {
      key: 'supplier',
      label: t('SUPPLIER'),
      value: data?.supplier,
      icon: <StarOutlined className={classes.icon} />,
      background: 'rgba(103, 80, 164, 0.08)',
    },
    {
      key: 'domain',
      label: t('COLUMNS.DOMAIN'),
      value: data?.domain,
      icon: <AppstoreOutlined className={classes.icon} />,
      background: 'rgba(103, 80, 164, 0.08)',
    },
    {
      key: 'location',
      label: t('COLUMNS.LOCATION'),
      value: data?.location,
      icon: <EnvironmentOutlined className={classes.icon} />,
      background: 'rgba(103, 80, 164, 0.08)',
    },
    {
      key: 'timestamps',
      label: t('TIMESTAMPS'),
      customContent: (
        <div className={classes.timeInfoWrapper}>
          <div className={classes.timeInfoItem}>
            <span className={classes.timeLabel}>{t('CREATED_AT')}:</span>
            <span className={classes.timeValue}>{formatDate(data?.createdAt)}</span>
          </div>
          <div className={classes.timeInfoItem}>
            <span className={classes.timeLabel}>{t('UPDATED_AT')}:</span>
            <span className={classes.timeValue}>{formatDate(data?.updatedAt)}</span>
          </div>
        </div>
      ),
      icon: <ClockCircleOutlined className={classes.icon} />,
      background: 'rgba(103, 80, 164, 0.05)',
      isInfoCard: true,
    },
  ];

  if (!data) {
    return (
      <div className={classes.container}>
        <div className={classes.grid}>
          {infoItems.map(item => (
            <div key={item.key} className={`${classes.card} ${item.isInfoCard ? classes.infoCard : ''}`}>
              <Skeleton.Input size="small" style={{ width: 80 }} />
              <Skeleton.Input style={{ width: 120, marginTop: 8 }} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <div className={classes.grid}>
        {infoItems.map(item => (
          <div key={item.key} className={`${classes.card} ${item.isInfoCard ? classes.infoCard : ''}`}>
            <div className={classes.iconWrapper} style={{ background: item.background }}>
              {item.icon}
            </div>
            <div className={classes.content}>
              <div className={classes.label}>{item.label}</div>
              {item.customContent || <div className={classes.value}>{item.value || '-'}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailInfo;
