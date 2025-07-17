import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';

import { getTableColumns } from './config';
import { IT_SUPPORT_REQUEST_URL } from '@app/pages/Profile/constants';
import { Creators } from '@app/pages/Profile/redux/actions';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import { getEmployeeAssetsForProfileSelector } from '../../redux/selectors';
// eslint-disable-next-line import/no-cycle
import { getSortedAssets } from '@app/pages/Profile/utils';
import SectionTitle from '../SectionTitle';

const MyAssets = () => {
  const { t } = useTranslation(['profile', 'assetPage']);
  const dispatch = useDispatch();
  const assets = useSelector(getEmployeeAssetsForProfileSelector.getData);
  const isAssetsLoading = useSelector(getEmployeeAssetsForProfileSelector.getIsPending);
  const tableColumns = getTableColumns({ t });

  useEffect(() => {
    dispatch(Creators.getEmployeeAssetsForProfileRequest());
  }, [dispatch]);

  const handleNewAssetRequest = () => {
    window.open(IT_SUPPORT_REQUEST_URL, '_blank');
  };

  return (
    <>
      <SectionTitle title={t('profile:COMPONENTS.MY_ASSETS.TITLE')}>
        <Button size="small" type="primary" onClick={handleNewAssetRequest}>
          {t('profile:COMPONENTS.MY_ASSETS.NEW_ASSET_REQUEST')}
        </Button>
      </SectionTitle>
      <AntTableV2
        loading={isAssetsLoading}
        columns={tableColumns}
        data={getSortedAssets({ assets })}
        scroll={{ y: '150px' }}
      />
    </>
  );
};

export default MyAssets;
