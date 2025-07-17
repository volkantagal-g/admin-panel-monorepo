import PropTypes from 'prop-types';
import { Tag } from 'antd';
import { useTranslation } from 'react-i18next';

import { GETIR_MARKET_TAG_COLORS } from '@shared/shared/constants';

function ListTag(props) {
  const {
    tagType,
    tagCode,
    key,
    namespace = 'global',
  } = props;
  const { t } = useTranslation();

  return (
    <Tag color={GETIR_MARKET_TAG_COLORS[tagType][tagCode]} key={key}>
      {t(`${namespace}:${tagType}:${tagCode}`)}
    </Tag>
  );
}

ListTag.propTypes = {
  tagType: PropTypes.string,
  tagCode: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  namespace: PropTypes.string,
};

export default ListTag;
