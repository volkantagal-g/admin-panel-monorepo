import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { find, get, sumBy } from 'lodash';

import permKeys from '@shared/shared/permKey.json';
import { ROUTE } from '@app/routes';
import { Space } from '@shared/components/GUI';
import RedirectButtonV2 from '@shared/components/UI/RedirectButtonV2';
import { GETIR_DOMAIN_TYPES } from '@shared/shared/constants';
import useStyles from '../styles';

const ClientInfo = ({ client }) => {
  const classes = useStyles();
  const { t } = useTranslation('marketOrderPage');
  const { _id, integrationKey, sucOrderCounts, name, gsm, phoneMaskingCode } =
    client;

  const clientIntegrationKeyQuery = integrationKey
    ? `?integrationKey=${integrationKey}`
    : '';
  const clientG10OrderCount = get(
    find(sucOrderCounts, { domainType: GETIR_DOMAIN_TYPES.GETIR10 }),
    'count',
    0,
  );
  const clientFoodOrderCount = get(
    find(sucOrderCounts, { domainType: GETIR_DOMAIN_TYPES.FOOD }),
    'count',
    0,
  );
  const clientMarketOrderCount = get(
    find(sucOrderCounts, { domainType: GETIR_DOMAIN_TYPES.MARKET }),
    'count',
    0,
  );
  const clientGetirVoyagerCount = get(
    find(sucOrderCounts, { domainType: GETIR_DOMAIN_TYPES.VOYAGER }),
    'count',
    0,
  );
  const clientTotalOrderCount = sumBy(sucOrderCounts, 'count');

  const clientDetailsUrl = ROUTE.CLIENT_DETAIL.path.replace(':id', _id);

  const courierCardInfo = [
    {
      label: t('CARD_INFO.CLIENT.NAME'),
      value: name,
    },
    {
      label: t('CARD_INFO.CLIENT.GSM'),
      value: gsm,
    },
    {
      label: t('CARD_INFO.CLIENT.PHONE_MASKING_CODE'),
      value: phoneMaskingCode,
      hidden: !phoneMaskingCode,
    },
    {
      label: t('CARD_INFO.CLIENT.TOTAL_ORDER'),
      value: clientTotalOrderCount,
    },
    {
      label: t('CARD_INFO.CLIENT.G10_ORDER'),
      value: clientG10OrderCount,
    },
    {
      label: t('CARD_INFO.CLIENT.MARKET_ORDER'),
      value: clientMarketOrderCount,
    },
    {
      label: t('CARD_INFO.CLIENT.FOOD_ORDER'),
      value: clientFoodOrderCount,
    },
    {
      label: t('CARD_INFO.CLIENT.GETIR_VOYAGER'),
      value: clientGetirVoyagerCount,
    },
  ];

  return (
    <Space
      className="p-2"
      title={t('CARD_INFO.CLIENT.TITLE')}
      extra={(
        <RedirectButtonV2
          type="default"
          text={t('global:DETAIL')}
          to={`${clientDetailsUrl}${clientIntegrationKeyQuery}`}
          permKey={permKeys.PAGE_CLIENT_DETAIL}
          target="_blank"
          data-testid="client-detail-link"
          size="small"
        />
      )}
    >
      <div className={classes.orderInfoCard} data-testid="client-info-card">
        {courierCardInfo?.map(
          ({ label, value, hidden }) => !hidden && (
          <div key={label} className={classes.orderInfoCardLabel}>
            <p><strong>{label}</strong></p>
            <p>{value}</p>
          </div>
          ),
        )}
      </div>
    </Space>
  );
};
export default memo(ClientInfo);
