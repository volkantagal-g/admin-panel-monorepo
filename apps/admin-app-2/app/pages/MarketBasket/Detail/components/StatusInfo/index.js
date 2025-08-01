import { Col, Popconfirm, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { marketBasketStatuses } from '@shared/shared/constantValues';
import { Button, JsonModal, Space, Tag } from '@shared/components/GUI';
import { basketStatusColorCodes } from '@app/pages/MarketBasket/constants';
import { getLangKey } from '@shared/i18n';
import { Creators } from '../../redux/actions';
import { marketBasketSelector } from '../../redux/selectors';
import { MARKET_BASKET_STATUSES } from '@shared/shared/constants';

export default function StatusInfo({ basketInfo = {} }) {
  const { status, orderId } = basketInfo;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const { basketId } = useParams();
  const isPending = useSelector(marketBasketSelector.getCancelIsPending);
  const toggleJSONModal = () => {
    setIsModalVisible(prevState => !prevState);
  };

  const onCancelSuccess = () => {
    dispatch(Creators.getMarketBasketRequest({ basketId }));
  };
  const handleCancelMarketBasket = () => {
    dispatch(Creators.cancelMarketBasketRequest({ basketId, onCancelSuccess }));
  };
  const { t } = useTranslation(['marketBasketDetailPage', 'marketOrderPage']);
  const isCancelButtonVisible = status === MARKET_BASKET_STATUSES.BROWSING && !orderId;
  return (
    <Space>
      <Row justify="space-between" align="middle" data-testid="basket-status-info">
        <Col span={16}>
          <Tag size="medium" color={basketStatusColorCodes[status]}>
            {marketBasketStatuses[status]?.[getLangKey()]}
          </Tag>

          <Button type="default" size="extra-small" onClick={toggleJSONModal}>
            {t('global:SHOW_AS_JSON')}
          </Button>
          <JsonModal
            title={t('JSON_TITLE')}
            data={basketInfo}
            visible={isModalVisible}
            allowCopyToClipboard
            handleCancel={toggleJSONModal}
          />
        </Col>
        <Col span={8} className="d-flex text-align-center justify-content-end">
          {isCancelButtonVisible && (
          <Popconfirm
            onConfirm={handleCancelMarketBasket}
            okText={t('button:YES')}
            cancelText={t('button:CANCEL')}
            title={t('CONFIRM_TEXT.CANCEL_BASKET')}
          >
            <Button
              loading={isPending}
              disabled={isPending}
              size="extra-small"
              danger
            >
              {t('button:CANCEL_BASKET')}
            </Button>
          </Popconfirm>
          )}
        </Col>
      </Row>
    </Space>
  );
}
