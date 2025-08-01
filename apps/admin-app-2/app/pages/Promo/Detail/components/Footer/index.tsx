import { Button, Col, Form, Row } from 'antd';
import { useTranslation } from 'react-i18next';

import { useState } from 'react';

import { usePermission } from '@shared/hooks';

interface FooterProps {
  open: boolean,
  setOpen: (open: boolean) => void,
  disabled?: boolean,
  loading?: boolean,
  permKey: string
  onCancel?: () => void,
  onSave?: () => void,
}

function FormItemWrapper({ children, hasForm }: { children: React.ReactNode, hasForm: boolean }) {
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return hasForm ? <Form.Item className="mb-0 mt-0">{children}</Form.Item> : <>{children}</>;
}

export function Footer({ open, setOpen, disabled, loading, permKey, onCancel, onSave }: FooterProps) {
  const { t } = useTranslation();
  const { canAccess } = usePermission();
  const canEdit = canAccess(permKey);

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    onCancel?.();
  };

  if (!canEdit) {
    return null;
  }

  return (
    <Row justify="end" gutter={[8, 0]}>
      {open ? (
        <>
          <Col>
            <FormItemWrapper hasForm={!onSave}>
              <Button size="small" onClick={onClose}>
                {t('button:CANCEL')}
              </Button>
            </FormItemWrapper>
          </Col>
          <Col>
            <FormItemWrapper hasForm={!onSave}>
              <Button
                size="small"
                type="primary"
                loading={loading}
                disabled={disabled}
                htmlType={onSave ? undefined : 'submit'}
                onClick={onSave}
              >
                {t('button:SAVE')}
              </Button>
            </FormItemWrapper>
          </Col>
        </>
      ) : (
        <Col>
          <FormItemWrapper hasForm={!onSave}>
            <Button size="small" onClick={onOpen}>
              {t('button:EDIT')}
            </Button>
          </FormItemWrapper>
        </Col>
      )}
    </Row>
  );
}

export function useFooter() {
  const [open, setOpen] = useState<boolean>(false);

  return {
    open,
    setOpen,
  };
}
