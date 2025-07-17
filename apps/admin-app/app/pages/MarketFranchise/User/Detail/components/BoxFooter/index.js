import { Form, Row, Col, Button, Popconfirm } from 'antd';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import { usePermission } from '@shared/hooks';

const BoxFooter = ({
  isPending,
  isFormEditable,
  permKey,
  handleSubmit,
  handleCancelClick,
  setIsFormEditable,
}) => {
  const { t } = useTranslation('button');
  const { Can } = usePermission();

  const handleEditClick = () => {
    setIsFormEditable(true);
  };

  return (
    <Can permKey={permKey}>
      <Row justify="end" gutter={[4, 4]}>
        {isFormEditable ? (
          <>
            <Col>
              <Form.Item className="mb-0 mt-0">
                <Button size="small" onClick={handleCancelClick}>
                  {t('CANCEL')}
                </Button>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item className="mb-0 mt-0">
                <Popconfirm
                  key="submit"
                  placement="topRight"
                  title={t('COMMON_CONFIRM_TEXT')}
                  onConfirm={handleSubmit}
                >
                  <Button
                    size="small"
                    type="primary"
                    loading={isPending}
                  >
                    {t('SAVE')}
                  </Button>
                </Popconfirm>
              </Form.Item>
            </Col>
          </>
        ) : (
          <Col>
            <Form.Item className="mb-0 mt-0">
              <Button size="small" onClick={handleEditClick}>
                {t('EDIT')}
              </Button>
            </Form.Item>
          </Col>
        )}
      </Row>
    </Can>
  );
};

BoxFooter.defaultProps = {
  isPending: false,
  isFormEditable: false,
  permKey: '',
  handleSubmit: () => null,
  handleCancelClick: () => null,
  setIsFormEditable: () => null,
};

BoxFooter.propTypes = {
  isPending: PropTypes.bool,
  isFormEditable: PropTypes.bool,
  permKey: PropTypes.string,
  handleSubmit: PropTypes.func,
  handleCancelClick: PropTypes.func,
  setIsFormEditable: PropTypes.func,
};

export default BoxFooter;
