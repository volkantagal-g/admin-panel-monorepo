import { memo, useEffect, useMemo, useState } from 'react';
import { Collapse, Table } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { getLangKey } from '@shared/i18n';
import { Creators } from '@app/pages/Client/Detail/redux/actions';
import { discountsSelector } from '@app/pages/Client/Detail/redux/selectors';
import columnsConfig from './config';
import useStyles from './styles';

const { Panel } = Collapse;
const COLLAPSE_KEY_PREFIX = 'CLIENT_DETAIL_DISCOUNTS_TABLE_COMPONENT_COLLAPSE_';

const DiscountsTable = ({ client }) => {
  const { t } = useTranslation('clientDetail');
  const dispatch = useDispatch();
  const discounts = useSelector(discountsSelector.getDiscounts);
  const isPending = useSelector(discountsSelector.isPending);
  const classes = useStyles();

  const langKey = getLangKey();
  const [pagination, setPagination] = useState({ page: 1, count: 50 });

  useEffect(() => {
    if (!client?._id) return;
    dispatch(Creators.getClientDiscountsRequest({ data: { ...pagination, client: client._id } }));
  }, [client]);

  const columns = useMemo(() => columnsConfig(t, langKey), [t, langKey]);
  const dataSource = discounts;

  const updatePagination = data => {
    setPagination({ ...pagination, page: data.current });
  };

  return (
    <Collapse activeKey={`${COLLAPSE_KEY_PREFIX}1`}>
      <Panel
        showArrow={false}
        header={t("DISCOUNTS_TABLE.TITLE")}
        className={classes.noPanelPadding}
        key={`${COLLAPSE_KEY_PREFIX}1`}
      >
        <Table
          loading={isPending}
          dataSource={dataSource}
          onChange={updatePagination}
          pagination={{ current: pagination.page }}
          columns={columns} />
      </Panel>
    </Collapse>
  );
};

export default memo(DiscountsTable);