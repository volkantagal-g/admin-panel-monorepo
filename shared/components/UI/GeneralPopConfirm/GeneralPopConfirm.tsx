import React from 'react';
import { Popconfirm, PopconfirmProps } from 'antd';
import { useTranslation } from 'react-i18next';

type PropTypes = Omit<PopconfirmProps, 'title'> & {
  title?: string
  omit?: boolean
};

export function GeneralPopConfirm({ omit, children, ...rest }: PropTypes) {
  const { t } = useTranslation('promoPage');

  if (omit) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>;
  }

  return (
    <Popconfirm
      title={t('global:COMMON_CONFIRM_TEXT')}
      okText={t('global:YES')}
      cancelText={t('global:NO')}
      {...rest}
    >
      {children}
    </Popconfirm>
  );
}
