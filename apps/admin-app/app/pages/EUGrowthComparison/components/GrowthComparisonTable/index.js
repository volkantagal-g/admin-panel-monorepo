import { useTranslation } from 'react-i18next';

import AntTable from '@shared/components/UI/AntTable';

import { tableColumns } from './config';
import useStyles from './styles';

const getTableTitle = ({ title, classes }) => (
  <div className={classes.tableTitle}>
    <span>{title}</span>
  </div>
);

const GrowthComparisonTable = ({
  title,
  data,
  isPending,
}) => {
  const { t } = useTranslation('euGrowthComparison');
  const classes = useStyles();

  return (
    <>
      <div>
        <AntTable
          tableTitle={() => getTableTitle({ title, classes })}
          columns={tableColumns(classes, t)}
          data={data}
          loading={isPending}
        />
      </div>
    </>
  );
};

export default GrowthComparisonTable;
