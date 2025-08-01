import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import { getMarketProductBadgesSelector, selectedBadgeSelector } from '../../redux/selectors';
import { tableColumns, exampleCsv, exportProductsToExcel } from './config';
import AntTable from '@shared/components/UI/AntTable';
import { Creators } from '@app/pages/MarketProduct/Badge/List/redux/actions';

const MarketProductBadgeListTable = () => {
  const dispatch = useDispatch();
  const data = useSelector(getMarketProductBadgesSelector.getData);
  const selectedBadge = useSelector(selectedBadgeSelector.getData);
  const badgeId = _.get(selectedBadge, '_id');
  const isPending = useSelector(getMarketProductBadgesSelector.getIsPending);
  const { t } = useTranslation('marketProductBadgePage');

  useEffect(() => {
    const badgeId = _.get(selectedBadge, '_id');
    if (badgeId) dispatch(Creators.getMarketProductBadgesRequest({ badgeId }));
  }, [selectedBadge]);

  const handleCsvImport = ({ data: csvData }) => {
    const productIds = csvData
      .map(item => {
        return _.get(item, 'product_id', '');
      })
      .filter(id => {
        return !!id;
      });
    dispatch(Creators.updateMarketProductBadgesBulkRequest({ badgeId, productIds }));
  };

  const handleExport = () => {
    const productIds = data.filter(item => !!_.get(item, 'product._id')).map(item => _.get(item, 'product._id'));
    exportProductsToExcel(productIds, badgeId);
  };

  return (
    <>
      <AntTable
        title={t('MARKET_PRODUCT_BADGES', { badgeName: _.get(selectedBadge, 'name') })}
        data={data.filter(item => !!item.product)}
        columns={tableColumns}
        loading={isPending}
        importerProps={{
          onOkayClick: handleCsvImport,
          exampleCsv,
        }}
        onExport={handleExport}
      />
    </>
  );
};

export default MarketProductBadgeListTable;
