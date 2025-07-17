import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Card from '@shared/components/UI/AntCard';
import AntTable from '@shared/components/UI/AntTable';
import { tableColumns } from './config';

function WarehouseHistory(props) {
  const { warehouseHistory } = props;
  const { t } = useTranslation();

  return (
    <>
      <Card>
        <AntTable
          title={t('marketFranchisePage:WAREHOUSE_HISTORY')}
          data={warehouseHistory}
          columns={tableColumns}
        />
      </Card>
    </>
  );
}

WarehouseHistory.propTypes = { warehouseHistory: PropTypes.array };

export default WarehouseHistory;
