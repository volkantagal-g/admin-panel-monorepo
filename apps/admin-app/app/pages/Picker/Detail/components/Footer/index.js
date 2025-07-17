import { Space, Button } from 'antd';
import { useTranslation } from 'react-i18next';

import useStyles from './styles';

function Footer({
  disabled,
  disabledSaveButton,
  formButtonVisibilty,
  setFormButtonVisibilty,
  customButton,
  handleReset = () => {},
  handleSave = () => {},
  onlyCustomButtonVisible = false,
}) {
  const { t } = useTranslation('button');
  const classes = useStyles();

  const handleFormButtonVisibilty = () => {
    setFormButtonVisibilty(!formButtonVisibilty);
  };

  const handleFormResetButton = () => {
    handleFormButtonVisibilty();
    handleReset();
  };

  return (
    <Space align="end" className={classes.formButtonsWrapper}>
      {formButtonVisibilty ? (
        <>
          {customButton}
          {onlyCustomButtonVisible ? null : (
            <>
              <Button
                className={classes.cancelButton}
                danger
                htmlType="reset"
                onClick={handleFormResetButton}
              >
                {t('CANCEL')}
              </Button>
              <Button type="primary" htmlType="submit" onClick={handleSave} disabled={disabledSaveButton}>
                {t('SAVE')}
              </Button>
            </>
          )}
        </>
      ) : (
        <Button
          disabled={disabled}
          type="submit"
          htmlType="button"
          onClick={handleFormButtonVisibilty}
        >
          {t('EDIT')}
        </Button>
      )}
    </Space>
  );
}

export default Footer;
