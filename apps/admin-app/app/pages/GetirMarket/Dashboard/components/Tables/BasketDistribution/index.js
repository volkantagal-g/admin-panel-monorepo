import { useMemo, memo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { basketDistributionSelector } from '../../../redux/selectors';
import { getColumns } from './config';
import useStyles from './styles';
import useParentStyles from '../styles';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import { getRowClassName } from '../utils';

const Header = ({ title, orderCount, classes }) => (
  <div className={classes.header}>
    {title ? <div className={classes.headerText}>{title}</div> : null}
    {orderCount ? <div className={classes.headerText}>({orderCount})</div> : null}
  </div>
);

const BasketDistribution = () => {
  const basketDistributionData = useSelector(basketDistributionSelector.getData);
  const basketDistributionDataIsPending = useSelector(basketDistributionSelector.getIsPending);

  const classes = useStyles();
  const parentClasses = useParentStyles();
  const { t } = useTranslation('getirMarketDashboardPage');

  const columns = useMemo(() => getColumns({ t, classes }), [classes, t]);

  return (
    <>
      <Header title={t('BASKET_DISTRIBUTION')} orderCount={basketDistributionData?.totalBasketCount} classes={classes} />
      <AntTableV2
        data={basketDistributionData?.distribution}
        columns={columns}
        className={`${classes.table} ${classes.smallerMarginBottom} ${parentClasses.rightPaddingForScrollBar}`}
        containerClassName={parentClasses.antTableContainer}
        showFooter={false}
        loading={basketDistributionDataIsPending}
        scroll={{ y: 96 }}
        headerClassName={classes.smallerPadding}
        rowClassName={(_, index) => getRowClassName(parentClasses, index)}
      />
    </>
  );
};

export default memo(BasketDistribution);
