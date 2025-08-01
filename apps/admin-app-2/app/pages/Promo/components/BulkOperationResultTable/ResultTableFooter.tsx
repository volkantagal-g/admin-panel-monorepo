import { useTranslation } from 'react-i18next';

import { Button, Col, Row, Statistic } from 'antd';

import { DownloadOutlined } from '@ant-design/icons';
import React from 'react';

import { BulkOpMessage, RelationalBulkOperation, RelationalBulkOpMessage } from '@app/pages/Promo/types';
import { handleBulkChildOperationResult } from '@app/pages/Promo/components/BulkOperationResultTable/config';

type PropTypes = {
  data: RelationalBulkOpMessage[]
  filter: BulkOpMessage[] | null
}

export function ResultTableFooter({ data, filter }: PropTypes) {
  const { t } = useTranslation('promoPage');

  return (
    <Row align="middle" gutter={[16, 16]}>
      <Col flex="auto">
        <Row align="middle">
          <Col span={8}>
            <Statistic
              title={t(`MESSAGE.${BulkOpMessage.Success}`)}
              value={data.filter(item => item.message === BulkOpMessage.Success).length}
            />
          </Col>
          <Col span={8}>
            <Statistic
              title={t(`MESSAGE.${BulkOpMessage.Fail}`)}
              value={data.filter(item => item.message !== BulkOpMessage.Success).length}
            />
          </Col>
        </Row>
      </Col>
      <Col flex="125px" className="text-align-right">
        <Button
          type="primary"
          icon={<DownloadOutlined />}
          onClick={() => handleBulkChildOperationResult(data, filter, t)}
        >
          {t('CONDITION_PRODUCTS.DOWNLOAD_CSV')}
        </Button>
      </Col>
    </Row>
  );
}
