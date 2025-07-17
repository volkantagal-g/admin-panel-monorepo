import React from 'react';

import { useTranslation } from 'react-i18next';

import { Button, Popover, Space } from 'antd';

import { CopyOutlined } from '@ant-design/icons';

import { useCopy } from '@shared/hooks';
import { useCopyableTextStyles } from '@shared/components/UI/CopyableText/styles';

type CopyableTextProps = {
  children?: string;
}

export function CopyableText({ children }: CopyableTextProps) {
  const { t } = useTranslation();
  const [copied, handleCopy] = useCopy(children) as [boolean, () => void];
  const styles = useCopyableTextStyles();

  return (
    <Space className={styles.wrapper}>
      <span>{children}</span>
      <Popover
        placement="bottom"
        content={copied ? t('COPIED_TO_CLIPBOARD') : t('global:COPY_TO_CLIPBOARD')}
        visible={copied ? true : undefined}
      >
        <Button onClick={handleCopy} type="link" icon={<CopyOutlined />} />
      </Popover>
    </Space>
  );
}
