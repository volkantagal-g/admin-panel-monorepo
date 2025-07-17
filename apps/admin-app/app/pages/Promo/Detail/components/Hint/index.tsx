import { QuestionCircleFilled } from '@ant-design/icons';
import { Popover, PopoverProps, Space } from 'antd';
import React from 'react';

import { useTranslation } from 'react-i18next';

import { useHintStyles } from '@app/pages/Promo/Detail/components/Hint/styles';

interface HintProps {
  placement?: PopoverProps['placement']
  translationKey: string
  children?: string
}

interface ContentProps {
  translationKey: string
}

function Content({ translationKey }: ContentProps) {
  const styles = useHintStyles();
  const { t } = useTranslation();

  return (
    <div className={styles.content}>
      {t(translationKey)}
    </div>
  );
}

function HintPopover({ placement, translationKey }: Omit<HintProps, 'children'>) {
  const styles = useHintStyles();

  return (
    <Popover
      placement={placement}
      content={<Content translationKey={translationKey} />}
    >
      <QuestionCircleFilled className={styles.icon} />
    </Popover>
  );
}

export function Hint({ children, ...rest }: HintProps) {
  if (!children) {
    return <HintPopover {...rest} />;
  }

  return (
    <Space>
      <span>
        {children}
      </span>
      <Hint {...rest} />
    </Space>
  );
}
