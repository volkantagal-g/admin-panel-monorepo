import { Button, Row, Popconfirm } from 'antd';
import { useTranslation } from 'react-i18next';

const Footer = ({ handleSubmit, isPending }) => {
  const { t } = useTranslation();

  return (
    <Row justify="end">
      <Popconfirm
        key="submit"
        placement="topRight"
        title={t('COMMON_CONFIRM_TEXT')}
        onConfirm={handleSubmit}
      >
        <Button
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

export default Footer;
