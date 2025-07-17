import { memo, useState } from 'react';
import { Collapse, Spin, DatePicker, Button, Row, Col, Divider } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Creators } from '@app/pages/Client/Detail/redux/actions';
import { clientSelector } from '@app/pages/Client/Detail/redux/selectors';
import useStyles from './styles';

const { Panel } = Collapse;
const { RangePicker } = DatePicker;
const COLLAPSE_KEY_PREFIX = 'CLIENT_DETAIL_INVOICES_COMPONENT_COLLAPSE_';

const Invoices = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('clientDetail');
  const client = useSelector(clientSelector.getClient);
  const isPending = false;
  const classes = useStyles();
  const [timeRange, setTimeRange] = useState();
  
  const getInvoices = async () => {
    const [start, end] = timeRange;
    dispatch(Creators.getInvoicesRequest({ data: { client: client?._id, start, end } }));
  };

  return (
    <Collapse activeKey={`${COLLAPSE_KEY_PREFIX}1`}>
      <Panel
        showArrow={false}
        className={classes.noPanelPadding}
        header={t("INVOICE.TITLE")}
        key={`${COLLAPSE_KEY_PREFIX}1`}
      >
        <Spin indicator="Loading..." spinning={!client?._id || isPending}>
          <Row>
            <Col>
              <RangePicker onChange={setTimeRange} />
            </Col>
          </Row>
          <Divider />
          <Row justify="end">
            <Col>
              <Button type="primary" onClick={getInvoices}>{t("INVOICE.FETCH")}</Button>
            </Col>
          </Row>
        </Spin>
      </Panel>
    </Collapse>
  );
};

export default memo(Invoices);