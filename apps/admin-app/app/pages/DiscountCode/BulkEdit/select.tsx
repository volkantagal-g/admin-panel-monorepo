import { Checkbox, Col, Form, InputNumber, Row, Select } from 'antd';

import { useEffect, useState } from 'react';

import { CheckboxChangeEvent } from 'antd/es/checkbox';

import { useTranslation } from 'react-i18next';

import { DiscountCodeActionType } from '@app/pages/DiscountCode/BulkEdit/types';
import { SelectPromo } from '@shared/containers/Select/Promo';
import AnnouncementSelect from '@shared/containers/Marketing/Select/AnnouncementSelect';
import { useActionTypeSelectStyles } from '@app/pages/DiscountCode/BulkEdit/styles';
import { InputNumberKeyPressHandler, useDiscountCodeActionTypeOptions } from '@app/pages/DiscountCode/BulkEdit/constants';

export type ActionTypePayload = {
    actionType: DiscountCodeActionType;
} & ActionValue

type ActionTypeSelectProps = {
    value?: ActionTypePayload;
    onChange?: (value: ActionTypePayload | undefined) => void;
    disabled?: boolean;
    loading?: boolean;
    allowTypeChange?: boolean;
}

type ActionValue = {
    segment?: number
    promotion?: MongoIDType
    isAlreadySold?: boolean
    announcement?: MongoIDType
}

function extractActionValue(value?: ActionTypePayload): ActionValue | undefined {
  if (!value) return undefined;
  const { actionType, ...rest } = value;
  return rest;
}

export function ActionTypeSelect({ allowTypeChange, loading, value, disabled, onChange }: ActionTypeSelectProps) {
  const { t } = useTranslation(['discountCodeActionTypeComponent']);

  const [actionType, setActionType] = useState<DiscountCodeActionType | undefined>(value?.actionType);
  const [actionValue, setActionValue] = useState<ActionValue | undefined>(extractActionValue(value));

  const options = useDiscountCodeActionTypeOptions(t);
  const styles = useActionTypeSelectStyles();

  useEffect(() => {
    if (value) {
      setActionType(value.actionType);
      setActionValue(extractActionValue(value));
    }
  }, [value]);

  const handleClear = () => {
    setActionType(undefined);
    setActionValue(undefined);
  };

  const handleSegmentChange = (newValue: number | null) => {
    const newSegmentValue = newValue ? Number(newValue) : undefined;
    setActionValue({ segment: newSegmentValue });
    if (onChange) {
      onChange({
        actionType: DiscountCodeActionType.AssignSegment,
        segment: newSegmentValue,
      });
    }
  };

  const handleTypeChange = (newValue: DiscountCodeActionType | null): unknown => {
    setActionType(newValue ?? undefined);
    if (onChange) {
      onChange(undefined);
    }

    if (newValue === DiscountCodeActionType.DefinePromotion) {
      return setActionValue({ isAlreadySold: false });
    }

    return setActionValue(undefined);
  };

  const handlePromoChange = (promoId: MongoIDType | null) => {
    setActionValue(prev => ({ isAlreadySold: prev?.isAlreadySold, promotion: promoId ?? undefined }));
    if (onChange) {
      onChange(promoId ? {
        actionType: DiscountCodeActionType.DefinePromotion,
        promotion: promoId,
        isAlreadySold: actionValue?.isAlreadySold ?? false,
      } : undefined);
    }
  };

  const handleIsAlreadySoldChange = (e: CheckboxChangeEvent) => {
    const isAlreadySold = e.target.checked;
    setActionValue(prev => ({ isAlreadySold, promotion: prev?.promotion }));
    if (onChange) {
      onChange(actionValue?.promotion ? {
        actionType: DiscountCodeActionType.DefinePromotion,
        promotion: actionValue.promotion,
        isAlreadySold,
      } : undefined);
    }
  };

  const handleAnnouncementChange = (announcementId: MongoIDType | null) => {
    setActionValue({ announcement: announcementId ?? undefined });
    if (onChange) {
      onChange(announcementId ? {
        actionType: DiscountCodeActionType.ShowAnnouncement,
        announcement: announcementId,
      } : undefined);
    }
  };

  return (
    <Row gutter={[8, 8]} className={styles.wrapper}>
      <Col span={24}>
        <Form.Item label={t('ACTION_TYPE')}>
          <Select
            options={options}
            disabled={disabled || !allowTypeChange || loading}
            onClear={handleClear}
            value={actionType}
            onChange={handleTypeChange}
          />
        </Form.Item>
      </Col>
      {
        actionType && (
        <Col span={24}>
          {
            actionType === DiscountCodeActionType.AssignSegment && (
            <Form.Item label={t('SEGMENT')}>
              <InputNumber
                disabled={disabled || loading}
                onChange={handleSegmentChange}
                value={actionValue?.segment}
                min={1}
                type="number"
                onKeyPress={InputNumberKeyPressHandler}
                onBlur={e => {
                }}
              />
            </Form.Item>
            )
          }
          {
            actionType === DiscountCodeActionType.DefinePromotion && (
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Form.Item label={t('PROMOTION')}>
                  <SelectPromo
                    slice="action-type"
                    disabled={disabled}
                    onChange={handlePromoChange}
                    value={actionValue?.promotion}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label={t('IS_ALREADY_SOLD')}>
                  <Checkbox
                    disabled={disabled}
                    onChange={handleIsAlreadySoldChange}
                    checked={actionValue?.isAlreadySold}
                  />
                </Form.Item>
              </Col>
            </Row>
            )
          }
          {
            actionType === DiscountCodeActionType.ShowAnnouncement && (
            <Form.Item label={t('ANNOUNCEMENT')}>
              <AnnouncementSelect
                disabled={disabled}
                onChange={handleAnnouncementChange}
                announcementId={actionValue?.announcement}
                selectOnly
              />
            </Form.Item>
            )
          }
        </Col>
        )
      }
    </Row>
  );
}
