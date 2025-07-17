import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Button, Tooltip } from 'antd';
import { CopyOutlined, CopyFilled } from '@ant-design/icons';

import { useCopy } from '@shared/hooks';
import useStyles from '@app/pages/ArtisanOrder/Detail/components/cardSections/textWithCopy/styles';

const TextWithCopy = ({ text, buttonClass }) => {
  const { t } = useTranslation('global');
  const [isCoppied, copy] = useCopy(text);
  const classes = useStyles();
  const tooltipText = isCoppied ? t('COPIED_TO_CLIPBOARD') : t('COPY');

  return (
    <span className={classes.flexWrapper}>
      {text}
      <Tooltip placement="top" title={tooltipText}>
        <Button
          onClick={copy}
          disabled={isCoppied}
          className={buttonClass}
          size="small"
          type="text"
          shape="circle"
          icon={isCoppied ? <CopyFilled /> : <CopyOutlined />}
        />
      </Tooltip>
    </span>
  );
};

TextWithCopy.propTypes = { text: PropTypes.string, buttonClass: PropTypes.string };

TextWithCopy.defaultProps = { text: '', buttonClass: '' };

export default TextWithCopy;
