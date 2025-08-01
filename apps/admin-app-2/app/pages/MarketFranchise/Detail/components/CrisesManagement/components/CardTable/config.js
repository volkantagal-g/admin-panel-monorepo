import { Button, Popconfirm } from 'antd';
import moment from 'moment';

import { getLangKey } from '@shared/i18n';
import permKey from '@shared/shared/permKey.json';

export const tableColumns = (t, Can, updateCard, removeCard) => [
  {
    title: t('marketFranchisePage:CRISIS_CARD_NUMBER'),
    dataIndex: 'cardNumber',
    key: 'cardNumber',
    width: 100,
    render: cardNumber => `#${cardNumber}`,
  },
  {
    title: t('global:DATE'),
    dataIndex: 'date',
    key: 'date',
    width: 150,
    render: date => moment(date).format('DD.MM.YYYY HH:mm'),
  },
  {
    title: t('marketFranchisePage:CRISIS_CARD_TOPIC'),
    dataIndex: 'topicName',
    key: 'topicName',
    width: 250,
    render: name => name[getLangKey()],
  },
  {
    title: t('global:ACTION'),
    dataIndex: '_id',
    key: '_id',
    width: 200,
    render: id => (
      <>
        <Can key="updateCrisisCard" permKey={permKey.PAGE_MARKET_FRANCHISE_DETAIL_CRISIS_CARD_DETAIL}>
          <Button
            key="updateCardButton"
            size="small"
            onClick={() => updateCard(id)}
          >
            {t('global:DETAIL')}
          </Button>
        </Can>
        <Can key="removeCrisisCard" permKey={permKey.PAGE_MARKET_FRANCHISE_DETAIL_CRISIS_CARD_REMOVE}>
          <Popconfirm
            title={t('COMMON_CONFIRM_TEXT')}
            okText={t('global:REMOVE')}
            onConfirm={() => removeCard(id)}
            cancelText={t('CANCEL')}
            key="removeCrisisCard"
            okButtonProps={{ type: 'danger' }}
          >
            <Button key="removeCardButton" size="small" type="danger" className="ml-2" target="_blank">
              {t('global:REMOVE')}
            </Button>
          </Popconfirm>
        </Can>
      </>
    ),
  },
];
