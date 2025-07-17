import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

import { getColumns } from './config';
import { clientOrderCountsSelector } from '../../../redux/selectors';
import useStyles from './styles';
import useParentStyles from '../styles';
import { getRowClassName } from '../utils';
import AntTableV2 from '@shared/components/UI/AntTableV2';

const Header = ({ title, classes, tooltipText }) => (
  <div className={classes.header}>
    {
      title &&
      (
        <div className={classes.headerText}>
          {title}
          &nbsp;
          <Tooltip title={tooltipText}>
            <InfoCircleOutlined className="icon-type3" />
          </Tooltip>
        </div>
      )
    }
  </div>
);

const ClientOrderCounts = () => {
  const clientOrderCounts = useSelector(clientOrderCountsSelector.getData);
  const isPending = useSelector(clientOrderCountsSelector.getIsPending);
  const classes = useStyles();
  const parentClasses = useParentStyles();
  const { t } = useTranslation('getirMarketDashboardPage');

  return (
    <>
      <Header title={t('CLIENT_ORDERS')} classes={classes} tooltipText={t('CLIENT_ORDERS_TOOLTIP')} />
      <AntTableV2
        data={clientOrderCounts}
        columns={getColumns(classes, t)}
        className={classes.table}
        containerClassName={parentClasses.antTableContainer}
        scroll={false}
        showFooter={false}
        loading={isPending}
        headerClassName={classes.smallerPadding}
        rowClassName={(_, index) => getRowClassName(parentClasses, index)}
      />
    </>
  );
};

export default ClientOrderCounts;
