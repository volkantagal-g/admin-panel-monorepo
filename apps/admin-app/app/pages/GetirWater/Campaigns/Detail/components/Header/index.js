import { useEffect, useState } from 'react';
import { PageHeader, Switch } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import _ from 'lodash';

import { campaignDetailSelector, updateCampaignStatusSelector } from '../../redux/selectors';
import { Creators } from '../../redux/actions';

const campaignStatusEnum = {
  ACTIVE: 1,
  INACTIVE: 2,
};

const CampaignNewHeader = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { id } = useParams();

  const [campaignStatus, setCampaignStatus] = useState(false);

  const data = useSelector(campaignDetailSelector.getData);
  const statusData = useSelector(updateCampaignStatusSelector.getData);

  useEffect(() => {
    if (Object.keys(data).length) {
      setCampaignStatus(data.status === campaignStatusEnum.ACTIVE);
    }
  }, [data]);

  useEffect(() => {
    if (statusData && _.get(statusData, 'payload.message')) {
      setCampaignStatus(!campaignStatus);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusData]);

  const handleCampaignStatusChange = value => {
    const changedData = { status: value ? campaignStatusEnum.ACTIVE : campaignStatusEnum.INACTIVE };
    dispatch(Creators.updateCampaignStatusRequest({ data: changedData, campaignId: id }));
    setCampaignStatus(value);
  };

  return (
    <PageHeader
      className="p-0 page-title"
      title={t('global:PAGE_TITLE.WATER.CAMPAIGNS.DETAIL')}
      extra={[
        <Switch
          key="0"
          checkedChildren={t('global:ACTIVE')}
          unCheckedChildren={t('global:INACTIVE')}
          checked={campaignStatus}
          onChange={handleCampaignStatusChange}
          className={campaignStatus ? 'bg-success' : 'bg-danger'}
        />,
      ]}
    />
  );
};

export default CampaignNewHeader;
