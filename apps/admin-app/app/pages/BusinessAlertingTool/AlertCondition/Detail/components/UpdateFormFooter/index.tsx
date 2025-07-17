import { useTranslation } from 'react-i18next';
import { Button, Form } from 'antd';

import useStyles from './styles';

type UpdateFormFooterProps = {
  canUserEdit: boolean;
  isFormEditable: boolean;
  setIsFormEditable: React.Dispatch<React.SetStateAction<boolean>>;
  handleCancelButtonOnClick: () => void;
}

function UpdateFormFooter({ canUserEdit, isFormEditable, setIsFormEditable, handleCancelButtonOnClick }: UpdateFormFooterProps) {
  const classes = useStyles();
  const { t } = useTranslation('bagConstraintsPage');

  if (!canUserEdit) {
    return null;
  }

  return (
    <footer className={classes.footer}>
      {(isFormEditable) ? (
        <div className={classes.submitSection}>
          <Form.Item noStyle>
            <Button
              type="primary"
              size="small"
              htmlType="submit"
            >
              {t('buttons:SAVE')}
            </Button>
          </Form.Item>
          <Button
            size="small"
            danger
            onClick={handleCancelButtonOnClick}
          >
            {t('buttons:CANCEL')}
          </Button>
        </div>
      ) : (
        <Button
          type="default"
          size="small"
          onClick={handleEditButtonClick}
        >
          {t('buttons:EDIT')}
        </Button>
      )}
    </footer>
  );

  function handleEditButtonClick() {
    if (!canUserEdit) return;
    setIsFormEditable(!isFormEditable);
  }
}

export default UpdateFormFooter;
