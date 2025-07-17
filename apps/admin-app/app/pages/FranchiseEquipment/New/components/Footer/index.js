import { Button, Row, Popconfirm } from 'antd';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const Footer = ({ handleSubmit, isPending }) => {
  const { t } = useTranslation('warehouseSegmentPage');

  return (
    <Row justify="end">
      <Popconfirm
        key="submit"
        placement="topRight"
        title={t('CONFIRM.IS_DEFAULT_UNCHECKED')}
        onConfirm={handleSubmit}
      >
        <Button
          size="small"
          type="primary"
          htmlType="submit"
          loading={isPending}
        >
          {t('button:SAVE')}
        </Button>
      </Popconfirm>
    </Row>
  );
};

Footer.propTypes = {
  isPending: PropTypes.bool,
  handleSubmit: PropTypes.func,
};

export default Footer;
