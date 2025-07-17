import { useMemo, memo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { clientRatingsSelector } from '../../../redux/selectors';
import { getColumns } from './config';
import useStyles from './styles';
import useParentStyles from '../styles';
import { getRowClassName } from '../utils';
import AntTableV2 from '@shared/components/UI/AntTableV2';

const Header = ({ title, classes }) => <div className={classes.header}>{title && <div className={classes.headerText}>{title}</div>}</div>;

const ClientRating = () => {
  const clientRatingsData = useSelector(clientRatingsSelector.getData);
  const clientRatingsDataIsPending = useSelector(clientRatingsSelector.getIsPending);

  const classes = useStyles();
  const parentClasses = useParentStyles();
  const { t } = useTranslation('getirMarketDashboardPage');

  const columns = useMemo(() => getColumns({ t, classes }), [classes, t]);

  return (
    <>
      <Header title={t('CLIENT_RATINGS')} classes={classes} />
      <AntTableV2
        data={clientRatingsData?.rates}
        columns={columns}
        className={classes.table}
        showFooter={false}
        loading={clientRatingsDataIsPending}
        scroll={{ x: 60 }}
        containerClassName={parentClasses.antTableContainer}
        headerClassName={classes.smallerPadding}
        rowClassName={(_, index) => getRowClassName(parentClasses, index)}
      />
    </>
  );
};

export default memo(ClientRating);
