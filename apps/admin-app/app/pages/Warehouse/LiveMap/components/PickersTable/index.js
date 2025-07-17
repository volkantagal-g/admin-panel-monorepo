import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { TEST_ID } from '../../constants';
import { warehouseSelector } from '../../redux/selectors';
import useMainStyles from '../../styles';
import { getTableColumns } from './config';

const CouriersTable = () => {
  const { t } = useTranslation(['global']);
  const mainClasses = useMainStyles();

  const pickers = useSelector(warehouseSelector.getPickers);
  const memoizedTableColumns = useMemo(() => getTableColumns({ t }), [t]);

  return (
    <AntTableV2
      className={mainClasses.smallPaddingTable}
      containerClassName={`${mainClasses.noMarginBottom} w-100`}
      data={pickers || []}
      columns={memoizedTableColumns}
      showFooter={false}
      size="small"
      scroll={{ y: 70 }}
      data-testid={TEST_ID.TOP_RIGHT_PANEL.PICKER_TABLE}
    />
  );
};

export default CouriersTable;
