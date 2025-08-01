import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import { useTheme } from 'react-jss';

import { ShoppingCartOutlined, TeamOutlined } from '@ant-design/icons';

import { useTranslation } from 'react-i18next';

import JssTheme from '@shared/jssTheme';
import { ChildPromoGenerationType } from '@app/pages/Promo/types';
import {
  useGenerationModalStyles,
  useGenerationOptionStyles,
} from '@app/pages/Promo/Detail/components/ChildPromos/styles';

type GenerationOptionProps = {
  title: string,
  icon: React.ReactNode,
  color: string,
  value: ChildPromoGenerationType,
  onClick: (type: ChildPromoGenerationType) => void
}

function GenerationOption({ icon, title, color, value, onClick }: GenerationOptionProps) {
  const styles = useGenerationOptionStyles({ color });

  const handleClick = () => {
    onClick(value);
  };

  return (
    <Button className={styles.container} onClick={handleClick}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.iconContainer} style={{ backgroundColor: color }}>
        {icon}
      </div>
    </Button>
  );
}

export function GenerateChildPromos() {
  const theme: typeof JssTheme = useTheme();
  const { t } = useTranslation('promoPage');
  const styles = useGenerationModalStyles();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [_, setGenerationType] = useState<ChildPromoGenerationType | null>(null);

  const handleOpen = () => {
    setIsModalVisible(true);
  };

  const onCancel = () => {
    setIsModalVisible(false);
  };

  const onChoose = (type: ChildPromoGenerationType) => {
    setGenerationType(type);
    setIsModalVisible(false);
  };

  return (
    <>
      <Button onClick={handleOpen} disabled className={styles.button} size="small">{t('GENERATE_CHILD_PROMOS.TITLE')}</Button>
      <Modal visible={isModalVisible} onCancel={onCancel} title={t('GENERATE_CHILD_PROMOS.CREATE_CHILD_PROMOS')}>
        <div className={styles.optionsWrapper}>
          <GenerationOption
            icon={<ShoppingCartOutlined />}
            title={t('GENERATE_CHILD_PROMOS.THROUGH_BENEFIT_PRODUCTS')}
            color={theme.color.primary}
            value={ChildPromoGenerationType.ThroughBenefitProducts}
            onClick={onChoose}
          />
          <GenerationOption
            icon={<TeamOutlined />}
            title={t('GENERATE_CHILD_PROMOS.THROUGH_SEGMENT')}
            color={theme.color.edit}
            value={ChildPromoGenerationType.ThroughSegment}
            onClick={onChoose}
          />
        </div>
      </Modal>
    </>
  );
}
