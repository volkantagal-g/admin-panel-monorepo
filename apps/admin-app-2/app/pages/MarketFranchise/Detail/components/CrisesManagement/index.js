import { useMemo, useState } from 'react';
import { Button, Card, Col, Row } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import { NewCardModal, UpdateCardModal, CardTable, Logs } from './components';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import SelectCrisisTopic from '@shared/containers/Select/CrisisTopic';

export const CrisesManagement = ({ isPending }) => {
  const { Can, canAccess } = usePermission();
  const { t } = useTranslation('marketFranchisePage');

  const [isNewCardModalVisible, setIsNewCardModalVisible] = useState(false);
  const [isUpdateCardModalVisible, setIsUpdateCardModalVisible] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [topicId, setTopicId] = useState(null);

  const canAccessCardList = useMemo(() => canAccess(permKey.PAGE_MARKET_FRANCHISE_DETAIL_CRISIS_CARD_LIST), [canAccess]);
  const canAccessCardLogList = useMemo(() => canAccess(permKey.MARKET_FRANCHISE_DETAIL_CRISES_LOGS), [canAccess]);

  const handleNewCardCreationModalClose = () => {
    setIsNewCardModalVisible(false);
  };

  const handleUpdateCardModalClose = () => {
    setIsUpdateCardModalVisible(false);
    setSelectedCardId(null);
  };

  const handleUpdateCard = cardId => {
    setSelectedCardId(cardId);
    setIsUpdateCardModalVisible(true);
  };

  return (
    <> { (canAccessCardList || canAccessCardLogList) && (
      <Card
        title={t('CRISES_MANAGEMENT')}
      >
        <Row justify="space-between" align="middle" className="mb-4">
          <Col xs={16} sm={12}>
            <SelectCrisisTopic
              value={topicId}
              onChange={value => setTopicId(value)}
              allowClear
              disabled={isPending}
              placeholder={t('CRISIS_CARD_TOPIC_FILTER')}
            />
          </Col>
          <Col>
            <Can permKey={permKey.PAGE_MARKET_FRANCHISE_DETAIL_NEW_CRISIS_CARD_MODAL}>
              <Button
                key="newCardButton"
                icon={<PlusOutlined />}
                type="primary"
                onClick={() => setIsNewCardModalVisible(!isNewCardModalVisible)}
              >
                {t('NEW_CARD')}
              </Button>
            </Can>
          </Col>
        </Row>
        <CardTable
          topicId={topicId}
          updateCard={handleUpdateCard}
        />
        <NewCardModal
          isVisible={isNewCardModalVisible}
          isPending={isPending}
          onClose={handleNewCardCreationModalClose}
        />
        <UpdateCardModal
          isVisible={isUpdateCardModalVisible}
          isPending={isPending}
          onClose={handleUpdateCardModalClose}
          cardId={selectedCardId}
        />
        <Logs />
      </Card>
    )}
    </>
  );
};
