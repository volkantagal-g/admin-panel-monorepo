import { Space, Button } from 'antd';
import { useTranslation } from 'react-i18next';

import useStyles from './styles';

function Footer(props) {
  const {
    disabled,
    formButtonVisibilty,
    setFormButtonVisibilty,
    customButton,
    handleReset = () => { },
    handleSave = () => { },
    onlyCustomButtonVisible = false,
  } = props;
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
    <Space className={classes.formButtonsWrapper}>
      {formButtonVisibilty ? (
        <>
          {customButton}
          {onlyCustomButtonVisible ? null : (
            <>
              <Button
                danger
                htmlType="reset"
                onClick={handleFormResetButton}
              >
                {t('CANCEL')}
              </Button>
              <Button type="primary" htmlType="submit" onClick={handleSave}>
                {t('SAVE')}
              </Button>
            </>
          )}
        </>
      ) : (
        <Button
          disabled={disabled}
          name="update-warehouse-announcement"
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
