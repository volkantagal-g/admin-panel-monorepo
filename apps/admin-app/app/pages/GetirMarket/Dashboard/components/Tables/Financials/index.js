import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { financialsSelector } from '../../../redux/selectors';
import { generateTableColumns } from './config';
import useParentStyles from '../styles';
import useStyles from './styles';
import { getRowClassName } from '../utils';
import AntTableV2 from '@shared/components/UI/AntTableV2';

const Financials = () => {
  const financials = useSelector(financialsSelector.getData);
  const financialsIsPending = useSelector(financialsSelector.getIsPending);
  const { t } = useTranslation('global');

  const classes = useStyles();
  const parentClasses = useParentStyles();
  const tableColumns = generateTableColumns({ t, classes: parentClasses });

  return (
    <AntTableV2
      data={financials}
      columns={tableColumns}
      showHeader={false}
      showFooter={false}
      scroll={null}
      className={`${parentClasses.table} ${classes.table}`}
      containerClassName={`${parentClasses.antTableContainer} ${classes.antTableContainer}`}
      loading={financialsIsPending}
      rowClassName={(_, index) => getRowClassName(parentClasses, index)}
    />
  );
};

export default memo(Financials);
