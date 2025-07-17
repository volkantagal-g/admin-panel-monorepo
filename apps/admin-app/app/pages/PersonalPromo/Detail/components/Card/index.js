import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';
import { DatePicker, Row, Tag } from 'antd';
import moment from 'moment';

import permKey from '@shared/shared/permKey.json';
import { usePermission } from '@shared/hooks';
import AntCard from '@shared/components/UI/AntCard';
import { reverseLocalTime } from '@shared/utils/dateHelper';
import DataColumn from '../DataColumn';
import { PROMO_STATUS } from '@shared/shared/constants';
import { getLangKey } from '@shared/i18n';
import { PROMO_TYPES, STATUS_COLOR_MAP } from '../../constants';
import { promoCodeStatuses } from '@shared/shared/constantValues';

const CardInformation = ({ promo, handleValidUntil, validUntilEdited, onEdit, onStatusChange }) => {
  const { t } = useTranslation('personalPromoPage');
  const theme = useTheme();
  const { canAccess } = usePermission();
  const [isEditing, setIsEditing] = useState(false);

  const fields = useMemo(() => [{
    label: t('PROMO_FIELDS.CLIENT'),
    attribute: 'client',
    render: client => (
      <span> {client.name} [{client._id}] </span>
    ),
  }, {
    label: t('PROMO_FIELDS.DISCOUNT_CODE'),
    attribute: 'promoCode',
  }, {
    label: t('PROMO_FIELDS.TITLE'),
    attribute: 'title',
    hasTranslation: true,
  }, {
    label: t('PROMO_FIELDS.DESCRIPTION'),
    attribute: 'description',
    hasTranslation: true,
  }, {
    label: t('PROMO_FIELDS.VALID_FROM'),
    attribute: 'validFrom',
    render: validFromDate => (
      <>
        {moment.utc(validFromDate).format('DD-MM-YYYY HH:mm')}
      </>
    ),
  }, {
    label: t('PROMO_FIELDS.VALID_UNTIL'),
    attribute: 'validUntil',
    render: () => (
      <DatePicker
        allowClear={false}
        value={moment.utc(reverseLocalTime(validUntilEdited || promo.validUntil))}
        format="DD-MM-YYYY"
        disabled={!isEditing}
        onChange={handleValidUntil}
      />
    ),
    actions: [{
      label: t('ACTIONS.EDIT'),
      show: canAccess(permKey.PAGE_GETIR_PERSONAL_PROMO_DETAIL_EDIT) && !isEditing,
      handler: () => setIsEditing(true),
    }, {
      label: t('ACTIONS.CANCEL'),
      show: canAccess(permKey.PAGE_GETIR_PERSONAL_PROMO_DETAIL_EDIT) && isEditing,
      type: 'danger',
      handler: () => {
        setIsEditing(false);
        handleValidUntil(promo?.validUntil || null);
      },
    }, {
      label: t('ACTIONS.SAVE'),
      handler: () => {
        setIsEditing(false);
        onEdit();
      },
      show: canAccess(permKey.PAGE_GETIR_PERSONAL_PROMO_DETAIL_EDIT) && isEditing,
      type: 'primary',
    }],
  }, {
    label: t('PROMO_FIELDS.STATUS'),
    attribute: 'status',
    render: statusCode => (
      <Tag color={STATUS_COLOR_MAP[statusCode]}>
        {promoCodeStatuses[statusCode][getLangKey()] || promoCodeStatuses[statusCode].tr}
      </Tag>
    ),
    actions: [{
      label: t('ACTIONS.DISABLE'),
      handler: () => {
        handleValidUntil(false);
        onStatusChange();
      },
      type: 'danger',
      show: canAccess(permKey.PAGE_GETIR_PERSONAL_PROMO_DETAIL_EDIT) && promo?.status === PROMO_STATUS.ACTIVE,
    }],
  }, {
    label: t('PROMO_FIELDS.DISCOUNT_TYPE'),
    attribute: 'promoType',
    render: statusCode => (
      <> {PROMO_TYPES[statusCode][getLangKey()] || PROMO_TYPES[statusCode].tr} </>
    ),
  }, {
    label: t('PROMO_FIELDS.DISCOUNT_AMOUNT'),
    attribute: 'discountAmount',
    render: totalAmount => (
      <> {totalAmount} </>
    ),
  }, {
    label: t('PROMO_FIELDS.PRIORITY'),
    attribute: 'priority',
  },
  {
    label: t('THIS_CODE_IS_SOLD'),
    attribute: 'isAlreadySold',
    render: isAlreadySold => (
      <> {isAlreadySold ? t('global:YES') : t('global:NO')} </>
    ),
  },
  ], [t, canAccess, handleValidUntil, validUntilEdited, isEditing, onEdit, onStatusChange, promo]);

  return (
    <AntCard bordered={false} title={t('GENERAL_INFO')}>
      <Row gutter={[theme.spacing(4)]}>
        {
          fields.map(field => {
            return (
              <DataColumn document={promo} data={field} />
            );
          })
        }
      </Row>
    </AntCard>
  );
};

export default CardInformation;
