import { useTranslation } from 'react-i18next';
import { Input } from 'antd';
import PropTypes from 'prop-types';

import AntCard from '@shared/components/UI/AntCard';

const { TextArea } = Input;

const HomeAddress = ({ data }) => {
  const { t } = useTranslation('courierPage');

  return (
    <AntCard
      bordered={false}
      title={t('HOME_ADDRESS')}
    >
      <TextArea
        value={data?.description}
        placeholder={t('HOME_ADDRESS')}
        disabled
      />
    </AntCard>
  );
};

HomeAddress.defaultProps = { data: {} };

HomeAddress.propTypes = {
  data: PropTypes.shape({
    description: PropTypes.string,
    location: PropTypes.shape({
      type: PropTypes.string,
      coordinates: PropTypes.arrayOf(PropTypes.number),
    }),
  }),
};

export default HomeAddress;
