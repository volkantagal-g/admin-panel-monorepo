import { Collapse } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { useParams } from 'react-router-dom';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { tableColumns } from './config';
import { Creators } from '../../redux/actions';
import { AssetChangeEventInfoSelector } from '../../redux/selectors';
import { getLangKey } from '@shared/i18n';

const { Panel } = Collapse;
const AssetChangeEventInfo = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation(['assetPage', 'global']);
  const { assetId } = useParams();
  const langKey = getLangKey();

  const assetChangeEventInfoData = useSelector(AssetChangeEventInfoSelector.getData);
  const assetChangeEventInfoIsPending = useSelector(AssetChangeEventInfoSelector.getIsPending);

  const handleGetAssetChangeEventInfo = () => {
    if (!assetChangeEventInfoData?.length) {
      dispatch(Creators.getAssetChangeEventInfoRequest({ assetId, langKey }));
    }
  };

  return (
    <Collapse onChange={handleGetAssetChangeEventInfo}>
      <Panel header={t('assetPage:ASSET_CHANGE_EVENT_INFO')}>
        <AntTableV2
          data={assetChangeEventInfoData}
          columns={tableColumns({ t })}
          loading={assetChangeEventInfoIsPending}
          scroll={{ y: 240 }}
        />
      </Panel>
    </Collapse>
  );
};

export default AssetChangeEventInfo;
