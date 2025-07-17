import PropTypes from 'prop-types';
import { Space, Button } from 'antd';
import { useTranslation } from 'react-i18next';

import useStyles from './styles';

function Footer({
  disabled = false,
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
    <Space direction="vertical" align="end" className={classes.formButtonsWrapper}>
      {
        formButtonVisibilty ? (
          <>
            {customButton}
            {
              onlyCustomButtonVisible ? null : (
                <>
                  <Button
                    className={classes.cancelButton}
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
              )
            }
          </>
        ) : (
          <Button disabled={disabled} type="default" htmlType="button" onClick={handleFormButtonVisibilty} data-testid="warehouse-edit-button">
            {t('EDIT')}
          </Button>
        )
      }
    </Space>
  );
}

Footer.propTypes = {
  formButtonVisibilty: PropTypes.bool.isRequired,
  setFormButtonVisibilty: PropTypes.func.isRequired,
};

export default Footer;
