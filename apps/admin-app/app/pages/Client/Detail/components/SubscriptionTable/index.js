import { useMemo } from 'react';
import { Collapse, Table } from 'antd';
import { useTranslation } from 'react-i18next';

import { useSelector } from 'react-redux';

import { getLangKey } from '@shared/i18n';

import { COLLAPSE_KEY_PREFIX } from './constants';
import useStyles from './styles';
import columnsConfig from './config';
import { subscriptionDetailSelector } from '../../redux/selectors';

const COLLAPSE_KEY = `${COLLAPSE_KEY_PREFIX}_1`;

const SusbscriptionTable = () => {
  const { t } = useTranslation('clientDetail');
  const langKey = getLangKey();
  const classes = useStyles();
  const subscriptionDetailsData = useSelector(subscriptionDetailSelector.getSubscriptionDetails);
  const isPending = useSelector(subscriptionDetailSelector.isPending);

  const columns = useMemo(() => columnsConfig(t, langKey, classes), [t, langKey, classes]);

  return (
    <Collapse activeKey={COLLAPSE_KEY} className={classes.tableWrapper}>
      <Collapse.Panel
        showArrow={false}
        className={classes.noPanelPadding}
        header="Subscription"
        key={COLLAPSE_KEY}
      >
        <Table
          loading={isPending}
          className={classes.table}
          columns={columns}
          dataSource={subscriptionDetailsData?.data?.subscriptions}
          pagination={false}
        />
      </Collapse.Panel>
    </Collapse>
  );
};

export default SusbscriptionTable;
