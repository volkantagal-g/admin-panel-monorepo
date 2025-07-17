import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Typography, Empty } from 'antd';

import { filtersSelector, newClientStatsSelector } from '../../../redux/selectors';

import AntTableV2 from '@shared/components/UI/AntTableV2';

import { getTableColumns } from './config';
import { INTEGRATION_TYPES } from '@shared/shared/constants';
import useParentStyles from '@app/pages/GetirMarket/Growth/Comparison/components/Tables/styles';

const { Title } = Typography;

function NewClientsTable() {
  const { t } = useTranslation(['getirMarketGrowthComparisonPage', 'global']);
  const parentClasses = useParentStyles();

  const data = useSelector(newClientStatsSelector.getData);
  const isPending = useSelector(newClientStatsSelector.getIsPending);
  const filters = useSelector(filtersSelector.getFilters);
  const isShowNewClientsTable = !filters?.integrationType || filters?.integrationType === INTEGRATION_TYPES.GETIR;

  const columns = getTableColumns(t, filters?.startDateRange, filters?.endDateRange);

  return (
    isShowNewClientsTable ? (
      <AntTableV2
        title={<Title level={5}>{t('NEW_CLIENTS')}</Title>}
        data={data}
        columns={columns}
        pagination={false}
        loading={isPending}
        bordered
      />
    ) : (
      <Empty
        imageStyle={{ height: '80px' }}
        description={(
          <span className={parentClasses.emptyDivDescription}>
            {
              t(
                'getirMarketGrowthComparisonPage:TABLE_WORK_ONLY_GETIR_INTEGRATION_TYPE_DESCRIPTION',
                { tableName: t('getirMarketGrowthComparisonPage:NEW_CLIENTS') },
              )
            }
          </span>
        )}
        className={parentClasses.emptyDiv}
      />
    )
  );
}

export default NewClientsTable;
