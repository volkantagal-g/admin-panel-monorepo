import { Form, Row, Col, Button, Popconfirm } from 'antd';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import { usePermission } from '@shared/hooks';

const CardFooter = ({
  isPending,
  isFormEditable,
  permKey,
  handleSubmit,
  handleEditClick,
  handleCancelClick,
}) => {
  const { t } = useTranslation(['courierPage', 'button']);
  const { Can } = usePermission();

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
                    id="storeInformationSaveButton"
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
              <Button size="small" onClick={handleEditClick} loading={isPending}>
                {t('EDIT')}
              </Button>
            </Form.Item>
          </Col>
        )}
      </Row>
    </Can>
  );
};

CardFooter.defaultProps = {
  isPending: false,
  isFormEditable: false,
  permKey: '',
  handleSubmit: () => null,
  handleEditClick: () => null,
  handleCancelClick: () => null,
};

CardFooter.propTypes = {
  isPending: PropTypes.bool,
  isFormEditable: PropTypes.bool,
  permKey: PropTypes.string,
  handleSubmit: PropTypes.func,
  handleEditClick: PropTypes.func,
  handleCancelClick: PropTypes.func,
};

export default CardFooter;
