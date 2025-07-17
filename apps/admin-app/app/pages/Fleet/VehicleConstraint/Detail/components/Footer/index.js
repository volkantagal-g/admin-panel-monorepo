import { Button, Row, Popconfirm, Col } from 'antd';
import { useTranslation } from 'react-i18next';

const Footer = ({ isEditable, setIsEditable, handleSubmit, isPending }) => {
  const { t } = useTranslation('button');

  return (
    <Row justify="end" gutter={[8]}>
      {isEditable ? (
        <>
          <Col>
            <Button
              danger
              htmlType="reset"
              loading={isPending}
              onClick={() => setIsEditable(false)}
            >
              {t('CANCEL')}
            </Button>
          </Col>
          <Col>
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
                {t('SAVE')}
              </Button>
            </Popconfirm>
          </Col>
        </>
      ) : (
        <Button
          loading={isPending}
          onClick={() => setIsEditable(true)}
        >
          {t('EDIT')}
        </Button>
      )}
    </Row>
  );
};

export default Footer;
