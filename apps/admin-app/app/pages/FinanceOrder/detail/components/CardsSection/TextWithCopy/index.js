import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Button, Tooltip } from 'antd';
import { CopyOutlined, CopyFilled } from '@ant-design/icons';

import { useCopy } from '@shared/hooks';
import useStyles from './styles';

const TextWithCopy = ({ text }) => {
  const { t } = useTranslation('global');
  const [isCoppied, copy] = useCopy(text);
  const classes = useStyles();
  const tooltipText = isCoppied ? t('COPIED_TO_CLIPBOARD') : t('COPY');

  return (
    <span className={classes.flexWrapper}>
      {text}
      <Tooltip placement="top" title={tooltipText}>
        <Button onClick={copy} disabled={isCoppied} size="small" type="text" shape="circle" icon={isCoppied ? <CopyFilled /> : <CopyOutlined />} />
      </Tooltip>
    </span>
  );
};

TextWithCopy.propTypes = { text: PropTypes.string };

TextWithCopy.defaultProps = { text: '' };

export default TextWithCopy;
