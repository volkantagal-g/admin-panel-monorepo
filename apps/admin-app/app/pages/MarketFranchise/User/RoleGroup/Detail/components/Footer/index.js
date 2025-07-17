import { Form, Row, Col, Button, Popconfirm } from 'antd';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';
import PropTypes from 'prop-types';

const Footer = ({ handleSubmit, handleCancelClick, handleEditClick, isFormEditable }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Row justify="end" gutter={[theme.spacing(2)]}>
      {isFormEditable ? (
        <>
          <Col>
            <Form.Item className="mb-0 mt-0">
              <Button size="small" onClick={handleCancelClick}>
                {t('button:CANCEL')}
              </Button>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item className="mb-0 mt-0">
              <Row justify="end">
                <Popconfirm key="submit" placement="topRight" title={t('COMMON_CONFIRM_TEXT')} onConfirm={handleSubmit}>
                  <Button size="small" type="primary" htmlType="submit">
                    {t('button:SAVE')}
                  </Button>
                </Popconfirm>
              </Row>
            </Form.Item>
          </Col>
        </>
      ) : (
        <Col>
          <Form.Item className="mb-0 mt-0">
            <Button size="small" onClick={handleEditClick}>
              {t('button:EDIT')}
            </Button>
          </Form.Item>
        </Col>
      )}
    </Row>
  );
};

Footer.propTypes = {
  handleSubmit: PropTypes.func,
  handleCancelClick: PropTypes.func,
  handleEditClick: PropTypes.func,
  isFormEditable: PropTypes.bool,
};

export default Footer;
