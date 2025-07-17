import { useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { couriersSelector } from '../../redux/selectors';
import useMainStyles from '../../styles';
import { getSummaryTableColumns, getTableColumns } from './config';
import { Creators } from '@app/pages/Warehouse/LiveMap/redux/actions';
import { TEST_ID } from '@app/pages/Warehouse/LiveMap/constants';

const CouriersTable = () => {
  const { t } = useTranslation(['global']);
  const mainClasses = useMainStyles();
  const dispatch = useDispatch();

  const memoizedHandleCourierNameClick = useCallback(courier => {
    dispatch(Creators.setSelectedPlaceMark({
      data: courier,
      eventType: 'courier',
    }));
  }, [dispatch]);

  const { couriers, stats } = useSelector(couriersSelector.getDataWithStatusStats);
  const memoizedTableColumns = useMemo(() => getTableColumns({ t, memoizedHandleCourierNameClick }), [t, memoizedHandleCourierNameClick]);
  const memoizedSummaryTableColumns = useMemo(() => getSummaryTableColumns({ t, mainClasses }), [t, mainClasses]);

  return (
    <>
      <AntTableV2
        className={mainClasses.smallPaddingTable}
        containerClassName={`${mainClasses.noMarginBottom} w-100`}
        data={couriers || []}
        columns={memoizedTableColumns}
        showFooter={false}
        size="small"
        scroll={{ y: 150 }}
        data-testid={TEST_ID.TOP_RIGHT_PANEL.COURIERS_TABLE.COURIERS}
      />

      <AntTableV2
        className={mainClasses.smallPaddingTable}
        containerClassName={`${mainClasses.noMarginBottom} w-100`}
        dataSource={[stats]}
        columns={memoizedSummaryTableColumns}
        showHeader={false}
        showFooter={false}
        size="small"
        scroll={{ x: 280 }}
        data-testid={TEST_ID.TOP_RIGHT_PANEL.COURIERS_TABLE.COUNTS}
      />
    </>
  );
};

export default CouriersTable;
