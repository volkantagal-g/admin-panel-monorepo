import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Row, Col } from 'antd';
import { get } from 'lodash';

import { orderDetailSelector } from '@app/pages/GetirFood/OrderDetail/redux/selectors';
import { populatePartialInfoData } from '@app/pages/GetirFood/OrderDetail/util';
import AntTable from '@shared/components/UI/AntTable';
import Card from '@shared/components/UI/AntCard';
import { generateColumns } from './config';
import { currency } from '@shared/utils/common';

const PartialRefundTable = () => {
  const orderDetail = useSelector(orderDetailSelector.getData);
  const isPending = useSelector(orderDetailSelector.getIsPending);

  const { t } = useTranslation('foodOrderPage');

  const { partialItem, refundTotalInfo } = useMemo(() => {
    return populatePartialInfoData({ products: orderDetail.products, partialRefunds: orderDetail.partialRefunds });
  }, [orderDetail.products, orderDetail.partialRefunds]);

  const tableColumns = useMemo(() => {
    return generateColumns({ t });
  }, [t]);

  return (
    <Card>
      <AntTable
        title={t('ACTION.PARTIAL_REFUNDS')}
        data={partialItem}
        columns={tableColumns}
        loading={isPending}
      />
      {refundTotalInfo.map(item => {
        return (
          <Row gutter={[12, 6]} key={`PARTIAL_REF_${item.date}`}>
            <Col span={12}>
              <strong>{`${t('TOTAL_PRICE')}: `}</strong>{`${get(item, 'total', '')} ${currency()}`}
            </Col>
            <Col span={12}><strong>{`${t('REFUNDED_BY')}: `}</strong>{`${get(item, 'user', '')}`}</Col>
            <Col span={12}><strong>{`${t('DATE')}: `}</strong>{`${get(item, 'date', '')}`}</Col>
            <Col span={24}><strong>{`${t('DESCRIPTION')}: `}</strong>{`${get(item, 'description', '')}`}</Col>
          </Row>
        );
      })}
    </Card>
  );
};

export default PartialRefundTable;
