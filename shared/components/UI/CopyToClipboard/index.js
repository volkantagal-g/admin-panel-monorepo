import copy from 'copy-to-clipboard';

import { Tag, message } from 'antd';

import { t } from '@shared/i18n';

export const CopyToClipboard = props => (
  <Tag
    size="small"
    onClick={() => {
      copy(props.message);
      message.success(`${t('global:COPIED_TO_CLIPBOARD')}: ${props.message}`, 1);
    }}
    color={props.color || null}
    style={{ ...props.style } || null}
  >
    {props.inner || props.message}
  </Tag>
);
