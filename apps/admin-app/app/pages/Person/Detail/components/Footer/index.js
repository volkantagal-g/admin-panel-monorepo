import { useEffect, useCallback, useMemo } from 'react';
import { Form, Row, Col, Button, Popconfirm } from 'antd';
import { useTranslation } from 'react-i18next';

import { usePermission } from '@shared/hooks';
import { canSubmit } from '@shared/utils/formHelper';
import { DEFAULT_ROW_SPACING } from '../../constants';

const Footer = ({
  initialValues,
  values,
  setValues,
  resetForm,
  isFormEditable,
  setIsFormEditable,
  permKey,
  isPending,
  handleSubmit,
  isSuccessPersonUpdate,
  confirmTitle = '',
}) => {
  const { t } = useTranslation('button');
  const { Can } = usePermission();

  const canBeSubmittable = useMemo(() => canSubmit({ initialValues, values }), [initialValues, values]);

  const handleCancelClick = useCallback(
    () => {
      setValues(initialValues);
      setIsFormEditable(false);
      resetForm();
    },
    [setIsFormEditable, setValues, resetForm, initialValues],
  );

  const handleEditClick = () => {
    setIsFormEditable(true);
  };

  useEffect(() => {
    if (isSuccessPersonUpdate) {
      handleCancelClick();
    }
  }, [isSuccessPersonUpdate, handleCancelClick]);

  return (
    <Can permKey={permKey}>
      <Row justify="end" gutter={DEFAULT_ROW_SPACING}>
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
                  title={confirmTitle || t('COMMON_CONFIRM_TEXT')}
                  onConfirm={handleSubmit}
                  disabled={!canBeSubmittable}
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

export default Footer;
